---
title: 리액트 테스트 괴담
description: 리액트 컴포넌트의 단위 테스트가 어려운 이유는 무엇일까?
url: https://wiki.lucashan.space/essay/mystery-of-testing-for-react/
date: 2023-09-15
tags: [essay, '2023']
featuredImage: ../../assets/posts/essay/unit-test-meme.jpeg
---

## 1. 리액트 컴포넌트의 테스트는 왜 어려울까?

리액트로 개발하다 보면 항상 테스트에 대해 고민하게 된다. 일반적인 유틸리티 함수야 당연히 쉽게 테스트를 작성할 수 있지만, 컴포넌트는 그렇지 않은 경우가 많기 때문이다.

솔직히 처음에는, 막연하게 컴포넌트는 원래 테스트하기 어려운 존재라고만 생각했다. 하지만 조금만 관점을 바꿔보니 _테스트하기 어렵게 컴포넌트를 작성하고 있는 것을 아닐까_ 라는 생각을 하게 되었다. 그래서 어떤 요소들이 테스트 코드 작성을 방해하고 있던 것인지 고민해 보았다. 이 글에서는 단위 테스트에 한정해 이야기해보려고 한다.

### 왜 단위 테스트인가?

흔히 테스트의 종류를 구분하면 크게 단위테스트, 통합테스트, e2e 테스트로 구분한다[^1].

<center>
  <figure>
    <img src="../../assets/posts/essay/testPyramid.png" width="100%" alt="테스트 피라미드">
    <figcaption style="font-size: 14px;">
      - 테스트 피라미드. 출처: <a href="https://martinfowler.com/articles/practical-test-pyramid.html" target="_blank" rel="noopener noreferrer">The Practical Test Pyramid</a>
    </figcaption>
  </figure>
</center>

당연한 이야기지만 피라미드의 위로 올라갈수록 테스트의 수행 시간과 작성, 관리 비용이 증가한다. 특히 "단위가 통합"될수록 의존관계가 점점 증식한다. 그렇다고 해서 맨 아래층에 있는 단위 테스트가 완전무결한 것은 아니다. 단위 테스트는 말 그대로 특정한 "단위"의 로직만을 검증하기 때문에 단위 간의 상호작용에서 발생할 만한 오류를 테스트할 수 없다.

그렇기 때문에, 시간과 작성/관리 비용 대비 테스트의 효과를 측정하여 상황에 맞는 테스트 방법을 선택해야 한다[^2]. 외부에 높은 의존성을 갖는 로직이라도 그 의존성이 잘 변하지 않는다면 통합 테스트를 작성하는 것도 적절한 선택이다. 또는 e2e 테스트를 작성한다면 관리가 어려울 수도 있겠으나, 너무나 중요한 시스템의 전체 동작을 테스트한다고 생각하면 노력을 들일 필요가 있을 것이다.

결국 테스트를 작성하는 것은 개인의 취향이나 상황, 제품의 성격 등 수많은 변인이 작용하기 때문에 절대적으로 정해진 방법은 없다.

개인적으로 단위 테스트를 선호하는 편이다. 윗 단계의 테스트에 비해 빠른 피드백을 얻을 수 있고 관리 비용이 적으며, [testing-library-react](https://testing-library.com/docs/react-testing-library/intro/) 같은 도구처럼 UI를 단위 테스트할 수 있는 수단이 있기 때문이다.

## 2. Side effect

일반적으로 함수는 내부에 side effect를 일으키는 로직이 없고, 동일한 값을 입력했을 때 동일한 값을 출력한다면 테스트하기 쉬워진다. 이런 함수를 보통 **순수 함수**라고 이야기 한다. 갑자기 순수 함수에 관해 이야기를 하는 이유는, 결국 리액트의 컴포넌트 역시 함수이기 때문이다. 즉, 리액트의 컴포넌트가 순수 함수에 가까워질수록 테스트하기 쉬워질 것이라는 결론을 도출할 수 있다.

### 1. 컴포넌트의 순수함을 저해하는 것은 무엇일까?

리액트에서의 side effect란 리액트로 제어할 수 없는 외부 요소라고 생각하면 편할 것 같다. 이를테면 API 호출, 브라우저와의 상호작용이 이에 해당한다.

리액트로 개발하다 보면 컴포넌트 내부에 side effect를 일으키는 로직을 작성하는 경우가 많다. 대표적인 경우가 API 요청을 하는 hooks를 작성하는 경우일 것이다. 보통 아래와 같이 컴포넌트를 작성하게 된다.

```tsx
// [{ id: 1, name: ’test’ }, …]
const getUsers = () => fetch(`${API_ENDPOINT}/users`)

const Users = () => {
  const { data, loading } = useQuery({
    // User 객체를 10개 반환함
    queryFn: getUsers,
  })

  return (
    <ul>
      <Loader data-testid="loader" visible={loading} />
      {data.map(user => (
        <li key={user.id} data-testid="user">
          {user.name}
        </li>
      ))}
    </ul>
  )
}
```

만약 이 컴포넌트를 테스트하려면 어떻게 해야 할까? 우선 간단한 테스트 코드를 작성한다면 다음과 같을 것이다.

```tsx
describe(('Users.tsx') => {
  it('컴포넌트가 렌더링 되면 10개의 유저 이름이 보여야 한다.', async () => {
    render(<Users />)
    await waitForElementToBeRemoved(screen.getByTestId('loader'))

    expect(screen.queryAllByTestId('user')).length(10)
  })
})
```

이렇게만 작성했을 경우, 별다른 처리를 하지 않았다면 테스트를 실행했을 때 `useQuery`에서 문제가 발생할 확률이 높으며, 보통 아래와 같은 상황에 직면할 것이다.

1. `API_ENDPOINT`라는 환경변수가 로컬에서 실행되고 있는 서버로 설정되어 있다면, 서버를 켜놓지 않거나 CI 환경에서 테스트가 동작하지 않을 수 있다.
2. `API_ENDPOINT`를 격리된 사내 인프라 내부의 개발 서버로 지정했다면, CI 환경에서 테스트가 동작하지 않을 수 있다. 보통의 경우 보안상의 문제로 개발 환경을 격리하는 경우가 많기 때문이다. 만약 사내 CI 인스턴스를 사용한다면 모르겠으나 GitHub Actions같이 외부에 존재하는 workflow tool을 사용할 경우 해당 인스턴스에서 사내 개발 환경으로 접근하지 못할 확률이 높다.
3. API를 직접 호출할 수 있게 되더라도, API 서버의 상태 혹은 인프라의 문제로 인해 테스트가 성공할 수도, 실패할 수도 있다. 즉, 테스트의 일관성이 보장되지 않는다.

결론적으로 `Users` 컴포넌트는 `getUsers`라는 side effect로 인해 순수한 컴포넌트라고 말할 수 없으며, side effect가 테스트 코드에까지 영향을 주는 상황이 되어버렸다. 이처럼 side effect가 존재하면 코드뿐만 아니라 테스트 코드 역시 외부에 의존하거나 영향을 주기 때문에 테스트의 독립성과 일관성이 떨어진다.

### 2. Side effect 배제하기

> 모든 단위 테스트는 섬이어야 한다.
>
> 출처: [실용주의 프로그래머를 위한 단위 테스트 with JUnit](http://www.yes24.com/24/goods/1428559?scode=032&OzSrank=6)

흔히 단위 테스트의 원칙에 대해 이야기하다 보면, 빠지지 않고 등장하는 것이 테스트 독립성에 대한 것이다. 단위 테스트는 독립적인 실행이 가능해야 하고 다른 테스트에 간섭받지 않아야 한다. 그렇다면 위의 테스트 코드를 독립적으로 만드는 방법은 무엇이 있을까? 보통 이런 문제에 직면한 경우 가장 빠르고 쉬운 해결책은 [mock object](https://wiki.lucashan.space/programming/TDD/02.test-double/#4-mock)를 사용하는 것이다.

```tsx
describe(‘Users.tsx’, () => {
  it('컴포넌트가 렌더링 되면 10개의 유저 이름이 보여야 한다.', async () => {
    jest.mock(’fetch’).mockResolvedValue([{
      // 유저 객체
      id: 1,
      name: ‘test’
    }, …]);

    render(<Users />)
    await waitForElementToBeRemoved(screen.getByTestId('loader'))

    expect(screen.queryAllByTestId('user')).length(10)
  })
})
```

이렇게 작성하면 독립적으로 테스트를 실행시킬 수 있다. `fetch`는 실제로 실행되지 않을 것이며, mockResolvedValue에 파라미터로 전달한 값을 반환할 것이다. `Users` 컴포넌트는 내부의 `useQuery`를 통해 정상적인 데이터를 전달받을 것이고, 테스트는 통과할 것이다.

### 3. Mocking은 조심스럽게 사용해야 한다.

> 테스트는 행위가 변경된 경우 깨져야 한다.
>
> 출처: [effective software testing](https://product.kyobobook.co.kr/detail/S000031923440) p.321

하지만 이렇게 mock object를 사용하는 경우 몇 가지 문제가 생긴다. 예를 들어, API response의 형태가 변했을 경우 컴포넌트에서 대응하지 않았다면 테스트는 실패해야 한다. 만약 User 객체의 배열을 바로 반환하던 API가 result라는 property의 값으로 전달되도록 바뀌었다면 어떻게 될까?

`Users` 컴포넌트의 경우 `getUsers`와 관련된 로직을 변경하지 않는다면 틀림없이 문제가 발생할 것이다.

```tsx
// { result: [{ id: 1, name: ’test’ }, …]}
const getUsers = () => fetch(`${API_ENDPOINT}/users`)

const Users = () => {
  const { data, loading } = useQuery({
    // User 객체 10개가 있는 배열이 result property로 전달됨
    queryFn: getUsers,
  })

  return (
    <ul>
      <Loader data-testid="loader" visible={loading} />
      {/* Object.prototype에 .map이 없어 에러 발생 */}
      {data.map(user => (
        <li key={user.id} data-testid="user">
          {user.name}
        </li>
      ))}
    </ul>
  )
}
```

위의 상황에서, `data.map` 부분을 수정하거나 `getUsers`의 반환 값을 수정하는 형태로 컴포넌트의 버그를 수정할 수 있다. 이는 _`getUsers` 함수의 행위가 바뀌었다_ 는 의미이고, 따라서 기존에 작성한 테스트가 실패해야 한다. 하지만 테스트는 실패하지 않는다. 왜냐하면 mock object에서는 여전히 기존과 똑같은 값을 반환하고 있기 때문이다.

그렇기 때문에 위의 경우 처럼 mock object를 사용할 경우 세 가지 문제가 발생할 수 있다.

1. Mocking 대상의 동작이 바뀌었지만, 테스트는 실패하지 않는 false-negative가 발생할 염려가 있다.
2. Mocking 대상의 동작이 바뀌면 mock object의 동작도 수정해야 하는 문제가 있다.
3. Mock object의 동작을 잘못 수정한 경우, 로직은 정상이지만 테스트가 실패하는 false-positive가 발생할 염려가 있다.

### 4. False-positive, false-negative, code coupling

먼저 false-negative, false-positive는 테스트에 대한 신뢰도와 연관이 있다[^3]. 코드에 문제가 있음에도 테스트 케이스에서 문제를 검출해 내지 못한다면, 당연히 신뢰도가 하락할 것이다. 반대로 코드에 문제가 없음에도 테스트가 실패한다면 마찬가지로 신뢰도가 하락할 것이다.

빈번한 mocking은 이러한 문제가 발생할 확률을 끌어 올린다. Mock object는 mocking 대상과 동작이 달라지면 문제가 발생하기 때문에, 세심하게 동작을 mocking 해야 하는 부담감이 생긴다.

이는 *테스트 코드가 테스트 대상 외에도 테스트 대상이 의존하는 로직에 대한 지식까지 갖춰야 한다*는 것을 의미한다. Mock object는 테스트 대상이 의존하는 로직을 세밀하게 구현해야 하며, 결과적으로 **로직과 테스트 코드 사이의 결합도가 증가**하게 된다.

이렇게 되면 구현된 로직이 아주 조금만 바뀌어도 테스트 코드 내부에 존재하는 mock object를 수정해야 하는 일이 발생한다. **깨지기 쉬운 테스트**가 되는 것이다.

## 3. 복잡한 비즈니스 로직

컴포넌트 내부에 복잡한 비즈니스 로직이 포함된 경우도 테스트를 어렵게 만든다. 물론 전술했듯 컴포넌트도 함수이기 때문에 입력과 출력만 테스트하면 되겠지만, 컴포넌트가 포함하고 있는 복잡한 비즈니스 로직에 대한 테스트 케이스를 따로 작성하는 경우 제품의 안정성을 한층 끌어올릴 수 있게 된다.

### 1. 비즈니스 로직과 컴포넌트의 관심사는 다르다.

개인적으로 비즈니스 로직과 컴포넌트의 관심사는 다르다고 생각하는 편이다. 비즈니스 로직은 말 그대로 서비스에 대한 도메인 로직을 의미하며, 대체로 잘 변하지 않는다. 반대로 컴포넌트는 조금 다르다. 컴포넌트는 상태를 통해 UI를 표현하는 역할을 하며, 대체로 자주 바뀌는 경향이 있다.

정산 기능을 예로 들어보면 좋을 것 같다. 정산 정책은 회사마다 다르지만, 쉽고 빠르게 변하지 않는다. 여러 부서 혹은 서비스 이용자의 이해관계가 복잡하게 얽혀있는 경우가 많아 생각보다 쉽게 바꿀 수 있지 않기 때문이다. 그렇기 때문에 정산에 관여하는 로직 그 자체(정산 비율, 정산 금액 계산, 정산 날짜 등등)는 많이 변하지 않을 것이다.

하지만 컴포넌트는 적어도 정산정책보다는 빈번하게 변경될 것이다. 사용자의 사용성을 위한 작은 수정이나, 전면적인 UI/UX 개편 등, 잘 바뀌지 않는 정책 보다는 아무래도 바뀔 이유가 많아 보인다.

그렇기 때문에 비즈니스 로직과 컴포넌트가 관심을 갖는 코드의 형태는 분명히 다를 것이다. 비즈니스 로직이라면 중요한 만큼 단단한 설계와 촘촘한 테스트 케이스가 필요할 것이고, 컴포넌트는 보다 유연한 설계와 정말 필요한 부분만 테스트할 수 있는 코드가 필요할 것이다.

### 2. 숨겨진 로직을 테스트하는 것은 어렵다.

여기서 문제의 핵심은 **비즈니스 로직이 컴포넌트 내부에 들어가 있다는 것**이다. 컴포넌트 내부에 작성된 비즈니스 로직은 촘촘한 테스트 케이스를 작성하는 데 어려움을 겪을확률이 크다.

일단 테스트 코드에서 해당 로직에 직접 접근하는것이 불가능한 것이 가장 큰 문제이다. 이 말은 꼼꼼한 테스트를 작성하지 못하고 검증하는 방법이 한계가 있다는 뜻이다.

예를 들어 어떤 로직의 동작 결과를 직접 검증하지 못한다면 DOM에 표시되거나 state에 저장된 값을 통해 간접적으로 검증하게 될 수도 있다. 이 상태에서 만약 DOM이 수정되거나 state에 저장하는 시점이 달라질 경우 위에서 이야기한 false-positive 문제가 발생한다. 이는 최악의 경우 DOM을 수정했을 뿐인데 비즈니스 로직의 테스트 코드까지 수정해야 한다는 이야기가 된다.

여기에 만약 `useEffect`같은 함수까지 비즈니스 로직에 관여하고 있다면 테스트를 작성하기 더 까다로워진다. 특히 useEffect의 dependency array에 많은 의존성이 걸려있다면 난이도는 더욱 올라갈 것이다.

### 3. 테스트에서의 문제

관심사가 다른 코드가 하나의 함수, 클래스에 섞여 있다면 관리도 어렵지만 테스트 코드 작성 역시 까다롭다. 하나의 모듈이 여러 관심사를 갖고 있다면 테스트 케이스 역시 장황해질 수밖에 없다. 여러 분산된 관심사의 테스트 케이스와 그에 따른 다양한 stub이 섞이면 도대체 어떤 목적을 지닌 테스트인지 이해하기 힘들게 된다.

컴포넌트를 예로 들자면 비즈니스 로직이 정상적으로 동작하였을 때 화면에 어떤 값이 어떻게 표시될 것인지부터, 어떤 버튼을 누르면 어떤 메뉴가 화면에 보이는지 등 비즈니스 로직과 UI에 관련된 로직이 하나의 테스트 스위트에 섞일 것이다. 이렇게 되면 장황한 테스트 코드로 인해 나중에 수정해야 할 곳을 찾는 데 어려움을 겪을 수도 있다.

## 4. 격리와 분리

정리해 보면 리액트에서 컴포넌트 테스트를 하기 어려운 이유는 흔히들 이야기하는 "좋은 함수"를 작성하는 일반적인 지침을 따르지 않았기 때문이라고 생각한다. Side effect를 최대한 배제하고, 단일 책임 원칙을 준수한다면 컴포넌트에 대한 테스트를 보다 더 쉽게 작성할 수 있을 거라 본다.

### 1. 격리

Side effect를 최대한 배제하자고 계속 이야기했지만, 사실 side effect 없이 의미 있는 어플리케이션을 만들기란 불가능에 가깝다. 그렇기 때문에 리액트로 만들어지는 웹 어플리케이션 역시 side effect를 완전히 배제할 수 없다. 대신 side effect를 최대한 한쪽에서 관리하고, 그 외의 컴포넌트에서는 제어할 수 있는 수준의 side effect만을 담당하는 형태라면 좋을 것 같다.

위의 예시 코드를 참고해 다시 작성해 보자면 다음과 같다.

```tsx
// Users.page.tsx
const UsersPage = () => {
  const { data, loading } = useQuery({
    queryFn: getUsers,
  })

  return (
    <>
      <Loader data-testid="loader" visible={loading} />
      <UserList users={data.users} />
    </>
  )
}

// UserList.tsx
const UserList = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} data-testid="user">
          {user.name}
        </li>
      ))}
    </ul>
  )
}
```

위와 같이 코드를 리팩터링 하면 데이터를 가져오는 로직이 격리되면서 테스트 작성이 한결 쉬워진다. 이를테면 `UserList` 컴포넌트는 props로 전달받은 user 객체 배열을 _어떻게 표현할 것인지만 테스트_ 하면 된다.

```tsx
describe(('UserList.tsx') => {
  it('전달받은 유저들의 이름이 보여야 한다.', async () => {
    const users = [{
      id: 1,
      name: 'test'
    }]
    render(<Users users={users} />)

    expect(screen.queryByText(/test/i)).toBeInTheDocument()
  })
})
```

만약 아까의 예시처럼 API의 응답 값이 바뀐다면 어떻게 하면 좋을까? 간단하게 `UsersPage` 컴포넌트만 수정하면 된다.

```tsx
const UsersPage = () => {
  const { data, loading } = useQuery({
    queryFn: getUsers,
  })

  return (
    <>
      <Loader data-testid="loader" visible={loading} />
      <UserList users={data.result.users} /> // 코드 수정
    </>
  )
}
```

더 이상 테스트 코드에서 mock object를 사용하지 않기 때문에 API의 변경이 테스트 코드에 영향을 주지 않는다.

### 2. 분리

위에서도 이야기했듯, 컴포넌트와 비즈니스 로직의 관심사는 다르다. 그렇기 때문에 컴포넌트 내부에 비즈니스 로직이 섞여 있는 것은 단일 책임 원칙을 지키지 않는 것으로 생각할 수 있다. 컴포넌트에서 비즈니스 로직을 따로 분리해 테스트 코드를 작성한다면 복잡한 비즈니스 로직을 세심하게 테스트할 수 있게 된다.

조금 억지스러운 예제이지만, 만약 아래와 같은 코드가 있다면 테스트를 어떻게 작성하면 좋을까? `userNameList`, `totalAge`를 계산하는 로직이 복잡한 구현이라고 생각하면서 고민해 보자.

```tsx
// UserList.tsx
const UserList = ({ users }) => {
  const userNameList = users.map(user => `-${user.name}`)
  const totalAge = sum(users.map(user => user.age))
  return (
    <>
      <p data-testid="totalAge">{totalAge}</p>
      <ul>
        {userNameList.map(userName => (
          <li key={userName}>{userName}</li>
        ))}
      </ul>
    </>
  )
}
```

당장 떠오르는 생각은 화면에 표시되는 값들이 의도에 맞게 만들어졌는지 확인하는 것이다.

```tsx
describe(('UserList.tsx') => {
  it('전달받은 유저들의 이름이 보여야 한다.', async () => {
    const users = [{
      id: 1,
      name: 'test',
      age: 10
    }]
    render(<Users users={users} />)

    expect(screen.queryByText(/-test/i)).toBeInTheDocument()
  })

  it('전달받은 유저들의 나이의 총 합이 보여야 한다.', async() => {
    const users = [{
      id: 1,
      name: 'test',
      age: 10
    }]
    render(<Users users={users} />)

    expect(screen.queryByTestId('totalAge')).toHaveValue(10)
  })
})
```

이렇게 테스트하면 당장은 통과하겠지만, 변경에 취약한 테스트가 될 가능성이 있다. 왜냐하면 값을 검증하는 로직을 전적으로 DOM에 의존하고 있기 때문이다. 만약 아래와 같이 코드를 수정한다면, 고작 UI의 변경으로 인해 비즈니스 로직의 테스트 코드를 수정해야 하는 일이 일어난다. 또한 컴포넌트가 추가됨에 따라 애매한 테스트 케이스를 어디에 위치시켜야 하는지 추가적인 고민을 해야 한다.

```tsx
// UserList.tsx
import { TotalAge } from './TotalAge'

const UserList = ({ users }) => {
  const userNameList = users.map(user => `-${user.name}`)
  const totalAge = sum(users.map(user => user.age))

  return (
    <>
      {/* 어떻게 할 것인가... */}
      <TotalAge totalAge={totalAge} />
      <ul>
        {userNameList.map(userName => (
          <li key={userName}>{userName}</li>
        ))}
      </ul>
    </>
  )
}
```

그렇기 때문에, user 객체를 이용해 필요한 값을 만들어 내는 로직을 컴포넌트 바깥으로 분리하는 게 좋다. 컴포넌트 밖으로 분리된 비즈니스 로직은 테스트하기도 쉽고, 컴포넌트의 변경에 영향을 받지도 않는다.

```tsx
// utils.ts
const padHypen = (name: string) => `-${name}`

export const generateUserInformation = (users: User[]) => {
  const userNameList = users.map(user => padHypen(user.name))
  const totalAge = sum(users.map(user => user.age))

  return {
    userNameList,
    totalAge,
  }
}

// UserList.tsx
import { TotalAge } from './TotalAge'
import { generateUserInformation } from './utils'

const UserList = ({ users }) => {
  const { userNameList, totalAge } = generateUserInformation(users)

  return (
    <>
      <TotalAge totalAge={totalAge} />
      <ul>
        {userNameList.map(userName => (
          <li key={userName}>{userName}</li>
        ))}
      </ul>
    </>
  )
}
```

이렇게 코드를 리팩터링 한다면 비즈니스 로직을 더욱 자연스럽게 테스트할 수 있다. 잘 분리된 순수함수를 단위 테스트하는 것은 크게 어렵지 않기 때문이다. 비즈니스 로직을 테스트하는 코드는 더 이상 DOM의 변경에도 영향을 받지 않고, 어디에 위치시켜야 하는지 고민하지 않아도 된다.

## 5. 의존성

> 인터페이스와 구현의 구분 원칙이 왜 중요한가? 그것은 소프트웨어는 항상 변경되기 때문이다.
>
> 출처: [객체지향의 사실과 오해](https://product.kyobobook.co.kr/detail/S000001628109) p.167

위의 예시 코드를 통해서 알 수 있는 사실은 어떤 한 컴포넌트에서 일어난 변경의 여파를 최대한 차단하는 것이 깨지지 않는 테스트를 만들어 내고, 나아가 유지보수하기 편한 코드가 된다는 것을 유추할 수 있다. 그러므로 항상 변경 여파의 전파 가능성을 염두에 두고 컴포넌트 간의 협력관계를 고민해야 한다.

한편으로, 협력관계가 염려된다고 하여 모든 코드를 하나의 컴포넌트에 작성할 수는 없다. 유연한 어플리케이션을 위해서는 각 컴포넌트가 적절한 역할과 책임을 갖고 협력하게끔 구현해야 한다. 결국 하나의 컴포넌트가 다른 컴포넌트에 의존하는 일은 필연적으로 발생하기 마련이다.

이렇게 컴포넌트 간의 의존관계가 발생하게 되면 _어떻게 의존성을 관리할 것인지_ 고민해야 한다. **의존성**은 변경 여파의 전파 가능성을 의미[^4]한다. 그 때문에 의존성을 적절하게 통제하고 관리하지 못하면 하나의 변경이 관련된 로직 전체에 영향을 줄 수 있다. 그렇게 되면 전파된 변경에 의해 영향을 받은 로직의 테스트 코드를 수정해야 할 가능성이 생긴다.

### 1. 인터페이스

그렇다면 변경의 여파를 어떻게 통제하면 좋을까? 그것은 세부 구현이 아닌 인터페이스에 의존하는 것이다. 인터페이스는 객체가 의사소통을 위해 외부에 공개하는 메시지의 집합[^5]으로, 객체지향이나 클래스에만 국한된 개념이 아니다. 함수라면 파라미터와 반환 값의 타입 시그니처 역시 인터페이스라고 부를 수 있다. 컴포넌트에서 비즈니스 로직을 분리할 때 인터페이스를 잘 설계해 두면 테스트 코드 작성뿐만 아니라 이후의 유지보수도 쉬워진다.

그러므로 코드를 분리할 때 가장 중요한 것은 **인터페이스를 설계하는 것** 이다. 이때 유념해야 할 것은 인터페이스는 클래스나 함수의 상태가 아닌, 행위를 기준으로 설계해야 한다는 것이다. 상태는 행위를 위한 도구일 뿐이고, 행위가 컴포넌트 간의 협력에 참여할 수 있는 유일한 수단이 된다[^6]. 만약 상태(데이터)를 중심으로 컴포넌트나 비즈니스 로직을 구현할 경우 그만큼 세부 구현이 드러나게 되고, 자연스럽게 변경의 여파가 커지게 된다.

인터페이스는 일종의 차단막 역할을 한다. 의존하는 측에서는 인터페이스의 세부 구현에 상관할 필요 없이 인터페이스의 시그니처에 맞추어 코드를 작성하면 된다. 반대로 인터페이스를 구현하는 측에서는 의존하고 있는 대상을 신경 쓰지 않고 시그니처에 맞추어 코드를 얼마든지 변경할 수 있다.

### 2. 인터페이스와 의존성 주입

인터페이스에 의존할 때 가장 큰 장점은, 인터페이스 뒤에 숨어있는 세부 구현에 신경 쓰지 않고 로직을 작성할 수 있다는 것이다. 예를 들어 아래와 같은 코드는 테스트 코드 작성이 까다롭다.

```ts
const useQueryString = () => {
  const [queryObject, setQueryObject] = useState(parseQuery(window.location.search))

  // queryObject 변경
  const setQuery = nextQueryObject => {
    if (canUpdateQuery(queryObject, nextQueryObject)) {
      setQueryObject(mergeQueryObject(queryObject, nextQueryObject))
    }
  }

  useEffect(() => {
    // queryObject가 변경되면 실행
    window.history.push(stringifyQuery(queryObject))
  }, [queryObject])

  return {
    query: queryObject,
    queryString: stringifyQuery(queryObject),
    setQuery,
  }
}
```

왜냐하면 window 객체의 내부 프로퍼티에 직접 의존하고 있기 때문이다. 이 상황에서는 window.location 객체나 window.history 객체를 mocking 해야 할 수도 있고, 그렇지 않다면 jsdom 등을 통해서 window 객체에 직접 접근해서 검증해야 한다.

하지만 의존하는 대상을 외부에서 주입받는다면 테스트를 작성하기 한결 수월해진다. 해당 함수가 주입 받을 대상은 window 객체 내부 프로퍼티들이 아닌 의존하는 로직의 행위에 대한 시그니처, 즉 인터페이스를 만족하는 무언가다.

```ts
type UseQueryStringParams = {
  locationSearch: string
  navigate: (queryString: string) => void
}

export const useQueryString = ({ locationSearch, navigate }: UseQueryStringParams) => {
  const [queryObject, setQueryObject] = useState(parseQuery(locationSearch))

  const setQuery = nextQueryObject => {
    if (canUpdateQuery(queryObject, nextQueryObject)) {
      setQueryObject(mergeQueryObject(queryObject, nextQueryObject))
    }
  }

  useEffect(() => {
    navigate(stringifyQuery(queryObject))
  }, [queryObject])

  return {
    query: queryObject,
    queryString: stringifyQuery(queryObject),
    setQuery,
  }
}
```

이렇게 코드를 리팩터링하게 되면 테스트 작성이 쉬워짐은 물론 실제 구현에서도 조금 더 유연하게 사용할 수 있다. 특히 테스트 코드에서는 행위보다 상태를 테스트할 수 있게 되면서 의존 대상의 구현 세부 사항에서 조금 더 멀어질 수 있다[^7].

```ts
class FakeUpdateQuery {
  qs: string;

  constructor() {
    this.qs = '';
  }

  updateQuery = (qs: string) => {
    this.qs = qs;
  };
}

describe(‘useQueryString’, () => {
  context(‘setQuery함수를 호출하면,‘, () => {
    it(‘조합된 query string으로 업데이트 한다.’, () => {
      const locationSearch = '?foo=bar';
      const fakeUpdateQuery = new FakeUpdateQuery();

      // 함수의 인터페이스를 만족하는 의존성 주입
      const { result } = renderHook(() =>
        useQueryString({ location: locationSearch, navigate: fakeUpdateQuery.updateQuery })
      );

      act(() => {
        result.current.setQuery({ foo: 'baz' });
      });

      expect(result.current.query).toEqual({ foo: 'baz' });
      // 상태 검증
      expect(fakeUpdateQuery.qs).toBe('foo=baz');
    })
  })
})
```

이렇듯 행위를 기준으로 인터페이스를 설계하고 코드를 분리한다면 유연한 설계와 더욱 손쉬운 테스트 작성이라는 두 마리 토끼를 잡을 수 있다.

## 7. 결론

1. Side effect를 완전히 분리하기 어렵다면 특정 계층에 격리한다.
2. Component에서 비즈니스 로직을 최대한 분리한다.
3. 추상화된 인터페이스(잘 바뀌지 않는 것)에 의존한다.
4. 인터페이스는 상태가 아닌 행위를 기반으로 정한다.
5. 만약 component 간의 상호 작용 혹은 전체 프로세스를 검증하고 싶다면 통합테스트를 작성한다.
   - 다만 통합테스트는 비용이 크기 때문에 신중하게 결정한다.

[^1]: https://martinfowler.com/articles/practical-test-pyramid.html
[^2]: [구글 엔지니어는 이렇게 일한다](https://product.kyobobook.co.kr/detail/S000061352347) 에서는 단위 테스트가 80%, 통합 테스트가 15%, e2e 테스트는 5% 정도가 되도록 관리한다고 한다 (p.296).
[^3]: [구글 엔지니어는 이렇게 일한다](https://product.kyobobook.co.kr/detail/S000061352347) 에서는 false-positive가 테스트 수정에 대한 의욕을 더 떨어뜨린다고 한다 (p.538). 두 오류의 관계는 항상 trade-off 관계인데, 개인적으로는 false-negative를 조금 더 경계하는 편이다.
[^4]: [오브젝트](https://product.kyobobook.co.kr/detail/S000001766367) p.255
[^5]: [오브젝트](https://product.kyobobook.co.kr/detail/S000001766367) p.179
[^6]: [오브젝트](https://product.kyobobook.co.kr/detail/S000001766367) p.85
[^7]: 행위검증과 상태검증의 차이는 [이 글](https://joont92.github.io/tdd/상태검증과-행위검증-stub과-mock-차이/)을 참고.
