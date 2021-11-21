---
title: 잊기 전에 정리한 유령 타입
description: 유령 타입을 이해하기까지의 짧은 여정을 공유합니다.
url: https://wiki.lucashan.space/programming/phantom-type/
date: 2021-11-21
tags: [Programming, '2021']
image: https://user-images.githubusercontent.com/9318449/142751511-bc6e5b89-55f7-4ead-bbfc-669f0d5d8993.png
---

한참전에 [유령 타입에 대한 글](https://overcurried.com/%EC%9C%A0%EB%A0%B9%20%ED%83%80%EC%9E%85/)을 읽고나서 [팀 동료](https://future-seller.dev/)와 함께 코드와 그 쓰임새를 논의했던 적이 있었다. 그때 했었던 논의들과 유령 타입을 이해하기 위해 간단히 작성했던 예제들을 잊기 전에 공유하려고 한다. 개인적으로 유용하다고 생각하는 컨셉이고 앞으로 기회가 생긴다면 적극적으로 사용해 볼 생각이다.

## 1. 유령 타입?

우선 유령 타입이 무엇인지 알기위해 무작정 google에 검색을 하면 찾아보면 다음과 같은 정의가 나온다.

> A phantom type is a parameterised type whose parameters do not all appear on the right-hand side of its definition
>
> \- Haskell wiki

유령 타입은 parameter의 정의에 표현되지 않은 parameter화된 타입이라고 하는데, 솔직히 무슨말을 하는지 이해할 수가 없었다.

조금 더 찾아보니 [[Swift3]Phantom Type](https://minsone.github.io/programming/swift-phantom-type)라는 글에 조금 더 직관적인 설명이 있었고, Swift의 코드는 잘 모르지만 다음의 예제를 보니 빠르게 이해할 수 있었다.

```swift
protocol Distance {}

enum Kilometres : Distance {}
enum Miles : Distance {}

struct Unit<U: Distance> {
	let length: Double
}

let km = Unit<Kilometres>(length: 10)
let mile = Unit<Miles>(length: 10)
```

해당 블로그에 설명된 글을 발췌하면 아래와 같다.

1. Phantom Type은 저장 공간을 가지고 있지 않은 숨겨진 제네릭 매개 변수가 포함된 매개 변수화된 데이터로, 이 용어는 하스켈에서 확인할 수 있다.
2. Distance 프로토콜은 Kilometres와 Miles 타입에 아무런 기여를 하지 않지만 Distance 프로토콜을 따르므로, 존재하지만 실체는 없는 이 Distance 프로토콜을 Phantom Type이라고 한다.
3. km과 mile는 같은 integer 타입으로 취급될 것 같지만, Phantom Type으로 인해 다른 타입으로 취급되므로 Kilometres에서 Miles로 변경을 하기 위해선 convert 라는 외부 함수가 필요하다.

정리하자면, **_실제 값에는 영향을 주지 않지만 타입에는 영향을 주는 타입_**을 유령 타입이라고 이해했다.

## 2. TypeScript로 이해하기

[[warning | Notice]]
| 앞으로 나올 예제 코드들은 [타입스크립트에서 객체를 "더 안전하게" 순회하는 방법 (feat: 무공변성)](https://younho9.dev/how-to-iterate-object-more-safely?fbclid=IwAR0vYYCwMrQrzeY8KOyGVmPGn2fCZ4omRoYSp7yb4rPXmbI8F8pdbrW579I)과 [유령 타입](https://overcurried.com/%EC%9C%A0%EB%A0%B9%20%ED%83%80%EC%9E%85/), 그리고 [ts-opaque-units](https://www.npmjs.com/package/ts-opaque-units)을 참고했음.

### 1. 똑같아 보이는 값

아래와 같은 간단한 코드가 있다.

```typescript
let min = 1
let hour = 2
```

`min`과 `hour`는 똑같은 `number` 타입이기 때문에 다음과 같은 연산이 가능하다.

```typescript
const second = 3
min = second

const add = (min: number, hour: number) => min + hour
```

타입으로 보았을때 문제가 있는 연산은 아니지만 의도로 보았을때 문제가 생길수도 있는 연산이다. 같은 `number`타입이지만 second, min, hour는 서로 다른 단위를 나타내고 있으며 서로간의 연산에 제약이 있어야할 것 같다. 일단 일차원적으로 떠오르는 해결책은 아래와 같이 코드를 작성하는 것이다.

```typescript
const enum Unit {
  MIN,
  HOUR,
}

let min = {
  type: Unit.MIN as const,
  value: 1,
}
let hour = {
  type: Unit.HOUR as const,
  value: 2,
}

min = hour // type error!

const add = <T extends UnitWithValue>(a: T, b: T) => {
  if (a.type !== b.type) {
    throw new Error()
  }

  return {
    type: a.type,
    value: a.value + b.value,
  }
}

add(min, hour) // type error!
```

`min = hour` 연산은 서로의 구조체 내부에 있는 type이라는 flag가 다르기 때문에 에러가 발생한다. `add`라는 함수 역시 마찬가지이다. 이렇게만 보면 의도를 달성한 것 같지만 불편한 지점이 몇몇 보인다.

우선, 구조체를 만들어 값과 타입을 따로 관리하는 것이 번거로워 보인다. 특히 `add` 함수를 보면 단순한 합연산을 위한 로직치고는 하는 일이 많다는 것을 알 수 있다. 구현에 따라 달라질 수도 있지만 일단 `add` 함수를 사용하는 쪽에서의 예외처리도 필요해 보인다.

`type`이라는 property에 type assertion을 빠뜨리면 type property가 *서로 같은 `Unit` 타입으로 처리*되어 의도대로 동작하지 않을 가능성도 발생한다.

```typescript
let min = {
  type: Unit.MIN,
  value: 1,
}
let hour = {
  type: Unit.HOUR,
  value: 2,
}

min = hour // 문제 없음!
```

이런일이 일어나는 이유는, TypeScript는 구조가 똑같다면 똑같은 타입으로 추론되는 [Structual Type System](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system)이기 때문이다. 이렇게 보면 어쩐지 Unit enum을 선언한 것이 무의미해 보이기까지 한다.

하지만 무엇보다 제일 불필요하다고 느껴지는 점은 단순히 **unit을 구분하기 위해 'type'이라는 타입 체크용 property가 runtime에 포함된다는 점**이다.

### 2. 헬퍼 타입을 만들어 보자

위에도 설명했듯 TypeScript는 구조적 타입 시스템(Structual Type System)이기 때문에 타입의 구조에 영향을 주지 않는 타입은 아무런 영향력도 갖지 못한다. 그렇기 때문에 TypeScript에서 유령 타입을 사용하려면 **_변수의 타입을 구분하기 위한 property가 타입 구조에 영향을 끼치지만 실질적인 값과는 무관한 상태_**가 되어야한다.

[[tip]]
| 유령 타입을 위한 도구를 만드는 방법은 `유틸리티 타입`을 만드는 방법과 `abstract class`를 이용하는 방법이 있다. 이 글에서는 조금 더 직관적이라고 생각되는 유틸리티 타입을 만드는 방법을 소개할 것이며, abstract class를 이용하는 방법이 궁금하다면 [이 글](https://overcurried.com/%EC%9C%A0%EB%A0%B9%20%ED%83%80%EC%9E%85/)을 참고하면 된다.

맨 처음 할 일은, 타입을 체크하기 위한 property가 하나 선언되어 있는 타입을 만드는 것이다. 해당 property로 코드에서 접근할 일도, 접근하여 변경할 일도 없기 때문에 readonly unique symbol로 선언한다. `unique symbol`은 에 대한 설명은 [이 곳](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#unique-symbol)을 참고하면 된다. 지금은 단지 컴파일 타임에 사라질, 완전히 unique한 값이 필요했기 때문에 사용했다고 보면 된다.

```typescript
declare const tag: unique symbol
type InvariantSignature<Type> = {
  readonly [tag]: Type
}
```

그 다음 위에서 선언한 일종의 `꼬리표`인 `InvariantSignature<Type>`를 원래의 타입에 intersection 해주는 유틸리티 타입과 factory 함수를 추가한다.

```typescript
type InvariantOf<Type> = Type & InvariantSignature<Type>
const createInvariantValue = <T extends unknown>(val: T) => {
  return val as InvariantOf<T>
}
```

위 함수를 이용해 다음과 같이 사용할 수 있다.

```typescript
let min1 = createInvariantValue<Unit.MIN>(1)
let min2 = createInvariantValue<Unit.MIN>(2)
const hour = createInvariantValue<Unit.HOUR>(3)

min1 = min2
min1 = hour // type error!
```

앞서 선언했던 `add` 함수도 간단하게 바꿀 수 있다.

```typescript
const add = <T extends Unit>(a: T, b: T) => a + b

const a = add(min1, min2)
const b = add(min1, hour) // type error!
```

이제 별도의 타입 체크용 property를 실제 값에 포함하지 않고도 타입을 구분할 수 있게 되었다.

### 3. Invariant

[[tip]]
| TypeScript의 공변성에 관한 이야기가 나오기때문에, 공변성에 대해 [이 글](https://seob.dev/posts/%EA%B3%B5%EB%B3%80%EC%84%B1%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80/)을 먼저 읽어보는 것을 추천한다.

이제 구조가 아닌 *선언한 타입에 의해 타입이 추론*되기 때문에, union된 타입도 서로의 관계를 무시하고 완전히 다른 타입으로 처리되어야 한다. 예를들면 다음과 같다.

```typescript
let minOrHour = createInvariantValue<Unit.MIN | Unit.HOUR>(1)
let minOnly = createInvariantValue<Unit.MIN>(2)

minOrHour = minOnly
minOnly = minOrHour // type error!
```

minOrHour는 MIN 혹은 HOUR 타입이기 때문에 MIN 타입인 minOnly를 할당하는 것이 가능하지만, 그 반대는 불가능하다. 하지만 위에도 말했듯 *선언한 타입에 의해 타입이 추론*되게끔 만들어야 하기때문에 4번째 줄의 연산 역시 타입 에러가 발생하게 바꿔야한다. 이는 생각보다 간단한데, `InvariantSignature`를 다음과 같이 수정하면 된다.

```diff-ts
  const enum Unit {
    MIN,
    HOUR,
  }

  declare const tag: unique symbol
  type InvariantSignature<Type> = {
-   readonly [tag]: Type
+   readonly [tag]: (_: Type) => Type
  }
  type InvariantOf<Type> = Type & InvariantSignature<Type>

  const createInvariantValue = <T extends unknown>(val: T) => {
    return val as InvariantOf<T>
  }

  let minOrHour = createInvariantValue<Unit.MIN | Unit.HOUR>(1)
  let minOnly = createInvariantValue<Unit.MIN>(2)

  minOrHour = minOnly // type error!
  minOnly = minOrHour // type error!
```

위와 같이 수정하면 공변(Covariant)과 반공변(Contravariant)을 모두 만족시키지 못하게 되어 무공변(Invariant)한 타입으로 추론이 된다. 그렇기 때문에 minOrHour와 minOnly는 uinon된 서로의 관계에 상관없이 완전히 다른 타입으로 취급된다.

### 4. 런타임에 포함될 값을 확인해보자

이렇게 변수의 타입을 구분하기 위한 property가 타입 구조에 영향을 주게 만들었으니 **실질적인 값과는 무관한 상태**인지 확인해 보아야한다. 간단히 TypeScript playground에 아래의 코드를 copy - paste하여 build된 결과물을 확인하면 된다.

```javascript
'use strict'
const createInvariantValue = val => {
  return val
}
let minOrHour = createInvariantValue(1)
let minOnly = createInvariantValue(2)
minOrHour = minOnly
minOnly = minOrHour
```

타입 에러가 발생하는 상태이기 때문에 에러 메시지와 함께 위의 코드를 확인할 수 있다. 실질적인 값을 제외하고 타입을 체크하기 위해 선언해 놓았던 모든 값들이 사라졌다.

## 3. Conclusion

물론 위의 예시는 유령 타입을 사용하지 않더라도 변수명을 정확히 쓰거나, 코드 리뷰를 통해 해결이 가능한 문제라고 생각한다.

다만 코드를 쓰는 사람이나 리뷰를 하는 사람이 놓칠수도 있고, 코드를 작성한 context가 사라지면 코드만으로 의도를 파악해야하기 때문에 더 확실한 방법이라고 본다.

```typescript
// before
let min = 1
const hour = 2
min = hour // jhon, doe가 합의한 사항임

// after
let min = createInvariantValue<Unit.MIN>(1)
const hour = createInvariantValue<Unit.HOUR>(1)
min = convert<Unit.MIN>(hour)
```

위 코드의 4번째 줄을 살펴보면 (물론 극단적일수는 있지만) jhon과 doe의 합의 사항이 무엇인지 파악하는데 시간이 소모되고, 어쩌면 파악할 수 없을지도 모른다. 설상가상 저 주석마저 없다면 개발자의 실수인지 의도된 로직인지 판단하기 힘들다.

하지만 9번째 줄 처럼 명확하게 convert 함수를 통해 명시된 타입을 변경하고 있다면 적어도 의도적인 로직이라는 것을 유추하는데 큰 도움이 된다.

유령 타입이라는 개념 자체가 굉장히 생소했고 TypeScript가 타입을 다루는 방법에 대해 정확히 알아야 했기 때문에 처음에는 이해가 쉽지 않았다. 하지만 이해하고 보니 실제 제품 레벨에서도 쓸 수있는 컨셉이라는 생각이 들었다. 코드에 있어서 만큼은 사람을 100% 신뢰하지 않고 컴파일 타임에 실수를 최대한 방지해야한다고 생각하는 편이다 보니, 맨 처음에도 말했듯 앞으로 사용할 기회가 생기면 사용해보려고 한다.

---

<h2 class="reference-title">참고</h2>

- [유령 타입](https://overcurried.com/%EC%9C%A0%EB%A0%B9%20%ED%83%80%EC%9E%85/)
- [타입스크립트에서 객체를 "더 안전하게" 순회하는 방법 (feat: 무공변성)](https://younho9.dev/how-to-iterate-object-more-safely?fbclid=IwAR0vYYCwMrQrzeY8KOyGVmPGn2fCZ4omRoYSp7yb4rPXmbI8F8pdbrW579I)
- [[Swift3]Phantom Type](https://minsone.github.io/programming/swift-phantom-type)
- [ts-opaque-units](https://www.npmjs.com/package/ts-opaque-units)
- [Opaque Types](https://blog.beraliv.dev/2021-05-07-opaque-type-in-typescript#choose-the-solution)
- [공변성이란 무엇인가](https://seob.dev/posts/%EA%B3%B5%EB%B3%80%EC%84%B1%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80/)
