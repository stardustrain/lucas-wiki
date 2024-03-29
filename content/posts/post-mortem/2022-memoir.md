---
title: 2022년 회고록
description: FE개발자로 2022년을 돌아보는 회고록.
url: https://wiki.lucashan.space/post-mortem/2022-memoir/
date: 2022-12-23
tags: [Post-mortem, '2022']
featuredImage: ../../assets/posts/post-mortem/nietzsche.jpg
---

## 들어가며

> 시간의 걸음에는 세 가지가 있다. 미래는 주저하면서 다가오고, 현재는 화살처럼 날아가고, 과거는 영원히 정지하고 있다.
>
> \- 프리드리히 실러

올해도 늘 그렇듯 정신없고 다사다난한 한 해를 보냈다. 익숙한 것에서 멀어져 새로운 도전을 선택했고, 그 과정에서 스스로를 많이 돌아볼 수 있었다.

다행인 것은 작년과는 다르게 기술적으로 배우게 된 부분도 있었다는 점이다. 우선 팀 동료들 덕분에 멀게만 느껴졌던 `OOP`라는 개념과 친해질 수 있었다. 그뿐만 아니라 혼자서 상상해 보던 기술과 프로세스를 실제로 팀에 적용해보면서 문제들을 직접 마주할 수 있었고 그것을 해결하며 많은 것들을 배울 수 있었다.

그 전과는 다르게 결정을 따르기보다 주로 결정하는 입장이 되어볼 수 있었고, 결정에 대한 책임과 무게 역시 잘 느낄 수 있었다. 그리고 그 결정을 팀에 적용하기 위해 천천히 신뢰를 얻는 방법도 배울 수 있었다. 올해는 여러모로 *나에게 너무나 중요한 한 해*였다고 생각한다.

## 1. 의미 있는 휴식을 한 상반기

올해 초 이직한 지 얼마 안 되어 퇴사를 결정하면서 무엇보다 삶의 동반자에게 큰 고마움을 느꼈다. 사실 다른 사람이 보면 엄살로 느껴질 수도 있는 상황이었지만, 내 생각을 지지해주고 응원해주어 과감한 결정을 할 수 있었다. 그렇게 푹 쉬면서 여유롭게 재충전도 하고, Elixir라는 언어도 새로 공부하고, 그동안 막연히 생각하던 개발 프로세스와 라이브러리를 실험해 보기도 했다.

하지만 무엇보다 큰 수확은 책장에 고이 잠자고 있던 책들을 읽었던 것이었다.

### 에릭 에반스의 도메인 주도 설계

특히 에릭 에반스가 쓴 [도메인 주도 설계](https://product.kyobobook.co.kr/detail/S000001514402)라는 책을 읽은 것이 기억에 많이 남는다. 처음부터 이 책을 읽었다면 굉장히 어려웠을 것 같은데, 이 책을 읽기 전에 [도메인 주도 설계 철저 입문](https://product.kyobobook.co.kr/detail/S000001766446)을 읽은 것이 아주 큰 도움이 되었다.

이 책 덕분에 인프랩에 합류하고 나서는 우리 팀의 [아키텍처에 관심이 많은 동료](https://medium.com/@shinbaek89)와 대화할 때 많은 도움이 되었다. 인프콘에서도 [인상적인 세션](https://www.inflearn.com/course/infcon2022/unit/126516)을 준비한 동료로, 코드 리뷰를 통해 많이 배우고 있다. 이 동료에게 코드 리뷰를 받으며 배운 개념들을 통해, 그동안 막연히 '나쁜 코드'라고 _느끼고 있던_ 코드들이 **왜 나쁜지 잘 설명할 수 있게 되었다.** 이렇게 배운 개념들은 자연스럽게 다른 동료들과 더 좋은 토론을 끌어낼 수 있는 촉매로 작용하였다.

그동안 아키텍처, 설계라는 추상적인 단어를 접할 때마다 정확하게 무엇을 의미하는 것인지 알지 못해 답답한 부분이 있었다. 하지만 이 책과 동료들을 통해 추상적으로 알고 있던 개념들을 어느 정도 구체적으로 알게 되었다. 특히 다른 사람들이 `설계`라는 것을 통해 얻고자 하는 것이 무엇인지 조금은 깨닫게 되었다. 설계라는 추상적인 개념에 대해 내가 스스로 내린 결론은, *변경 사항을 빠르게 반영하고, 그 변경의 여파를 잘 제어하기 위해 고민하는 여러 행위*이다.

### Elixir

매년 새로운 언어로 무언가 만들어 보는 것이 개인적인 목표 중 하나인데, 올해는 Elixir로 [간단한 API 서버를 만들어 보았다](/programming/elixir-phoenix-guardian/). 언어를 깊게 써보지 못했기 때문에 심오한 결론을 내리지는 못했지만 일단 굉장히 만족했다. 표현이 간결하여 코드가 눈에 잘 들어오는 것이 마음에 들었고 서비스를 개발하기 위한 이런저런 라이브러리들이 이미 잘 갖춰진 것들이 많아서 개발할 때 큰 어려움이 없었다. 특히 [elixir forum](https://elixirforum.com/)라는 커뮤니티 사이트가 있어서 모르는 것이 있을 때 많은 도움을 받았다.

코드를 작성할 때 좋았던 부분은 역시나 패턴 매칭과 간결한 파이프 문법, 그리고 문서화에 대한 기능이다. 함수의 이름과 파라미터로 패턴 매칭이 가능해 overloading을 자연스럽게 구현할 수 있는점이나 `|>`연산자로 pipe 연산을 자연스럽게 작성할 수 있는 점이 인상적이었다. `!` 혹은 `?`를 함수명에 포함할 수 있어 조금 더 읽기 편한 코드를 쓸 수 있는 작은 이점도 있다.

```elixir
def zero?(0), do: true
def zero?(x) when is_integer(x), do: false
```

별도의 라이브러리를 설치하지 않더라도 주석을 통해 문서가 자동으로 만들어지는 점도 좋았지만, 특히 *문서를 테스트*할 수 있는 [doctests](https://elixir-lang.org/getting-started/mix-otp/docs-tests-and-with.html#doctests)를 지원하는 게 인상적이었다. 최근 파트/셀의 문서 자동화 부분을 기여하고 있는데 여기서 얻은 영감을 TypeScript 환경에 맞게 만들어 보려고 노력 중이다. 만약 의도한 대로 동작한다면 블로그에 정리하려고 한다.

아, 참고로 내년은 Kotlin + spring을 공부해 볼 생각이다.

## 2. 정신없던 인프랩에서의 하반기

[[tip | Tip]]
| 자세한 내용은 [수습 회고 - Inflab에서의 3개월](/post-mortem/3-months-in-inflab/)에서 보실 수 있습니다.

6월 14일 인프랩에 합류한 기억이 엊그제 같은데 벌써 연말 회고를 작성하고 있다는 것이 믿기지 않는다. 좋은 동료들과 짧은 기간 동안 많은 것을 겪으며 다시 한번 인복이 많다는 것을 느꼈다. 동료들 덕분에 배운 것이 너무 많은데 그만큼 돌려준 것이 없어서 미안하기도 한 6개월을 돌아보려고 한다.

### 목표에 대한 회고

[수습 회고](/post-mortem/3-months-in-inflab/#here-i-go)에 쓰여 있듯 인프랩에 합류하면서 세운 세 가지 목표가 있었다. 잘 달성했다고 생각하는 부분도 있고 그렇지 않은 부분도 있어 아쉬운 마음이 큰 것 같다.

1. 지인이 없는 팀에서 신뢰 자본을 쌓는 연습

   처음 합류했을 때 조급해하지 않고 일하는 방식, 코드, 배포 방식 등을 지켜보기만 했다. 당연히 이해가 안 가는 부분도 많았고 잘못된 부분도 보였지만, 이런 것에 대해서 처음부터 이야기하지 않았다. 그렇게 할 수밖에 없던 이유를 찾으려고 애썼고, 표현을 부드럽게 하기 위해 고민도 많이 했다.

   특히 신뢰를 얻었다는 생각이 들기 전까지 팀에 강하게 의견을 주장하지 않고 주로 상황에 관해 묻거나 특정 기술 도입 전 PoC를 진행하는 형태로 조심스럽게 내 생각을 표현했다.

   한편으로는 팀원들이 일하면서 불편했던 점을 물어보고 그 점을 해결하거나, 꼭 필요하지만 시간이 없거나 귀찮아서 쌓인 일들을 주로 처리했다. 문제가 발생하면 내 일이 아니더라도 같이 들여다보고 해결책을 함께 고민하기도 했다.

   내가 했던 행동들에 대한 확신이 없었지만, 수습 기간이 끝났을 때 받은 동료 피드백에서 긍정적인 답변이 많았기 때문에 어느 정도는 성공했다고 생각했다. 만약 처음부터 강하게 내 주장만 하려고 했다면 이 정도의 신뢰를 얻을 수 없었을거로 생각한다. 하지만 아직 완전한 신뢰를 얻었다고 생각하지는 않기 때문에 내년에도 신뢰 자본을 더 쌓기 위해 노력해볼 생각이다.

2. 팀 구성원과 경험을 나누며, 내가 생각했던 것들을 실현해 보기

   우리 팀이 React를 도입한 지 1년 정도밖에 되지 않았기 때문에 어쩌다 보니 내가 React를 가장 오래 한 사람이 되어버렸다. 그뿐만 아니라 프런트엔드 이외의 것을 경험해 본 팀원도 얼마 없었기 때문에, 내가 노력하지 않았는데도 자연스럽게 경험을 나누게 되는 상황이 많았다. 생각해보니 올해는 (프런트엔드 개발자 주제에) 화면에 보이지 않는 일만 골라서 주로 했던 것 같다. 거꾸로 생각해보면 5년 동안 압축 경험을 했다는 뜻도 될 수 있어, 그동안 나와 일했던 모든 사람에게 감사함을 느끼는 계기가 되었다.

   다른 한편으로는, 그동안 '이렇게 해보면 좋지 않을까?'라고 상상만 했던 프로세스나 기술들을 하나씩 도입해 보면서 경험을 쌓고 있다. Monorepo를 적극 이용하는 것이나 각종 자동화 도구를 도입하면서 운영하는 등 평소가 향로가 이야기했던 *도입 후 운영하는 경험*을 하고 있다. 그러면서 자연스럽게 그동안 등한시했던 모니터링, 에러 추적 같은 부분들도 배울 수 있었다.

   아직 완전히는 아니지만 이런 기회를 준 향로나 팀원들에게 고마움을 느끼고 있다. 6개월이라는 짧은 시간 동안 이런 경험을 하고 있는 것은 좋은 팀원들을 만났기 때문이 아닐까 생각한다. 다시 한번 팀원들에게 감사를 표하고 싶다.

   덧붙여, 내년에는 조금 더 넓은 범위에 공격적으로 적용해 볼 것들이 많아 더욱 기대된다.

3. 레거시를 개선하기

   정말 제대로 하고 있다. 자체 framework인 ant-man을 개선하거나 React로 분리하는 작업을 하면서 정말 원 없이 하고 있다. 위에도 쓰여 있듯 이해가 안 가는 부분도 많고 복잡한 부분도 많지만, 평소 하지 않던 고민을 하게 되어 얻는 부분들도 있다. 향로의 말마따나 확실히 달리는 자동차의 바퀴를 갈아 끼우는 것은 큰 고통을 수반하는 일임을 확실히 느꼈다. 하지만 니체가 말한 것처럼 나를 죽이지 못하는 고통은 나를 성장시키는 것 같다는 느낌도 동시에 받을 수 있었다. 물론 그 고통이 거의 죽기 직전까지 만들어 놓기는 했지만.

   ant-man을 아직 완전히 개선한 것도 아니고 그렇게 오랫동안 붙잡고 사투를 벌인 것도 아니지만, 금방 깨닫게 된 것은 하나 있다. 확실한 것은 앞으로 절대 _무엇을 만들든 dynamic type language는 사용하지 않을 것_ 같다(그런 점에서 Elixir가 아쉽다).

### 올해 진행했던 프로젝트

1. 대시보드 분리

   셀에 소속되고 첫 과제로 [인프런 대시보드](https://www.inflearn.com/account/dashboard) 분리 작업을 진행했다. ant-man의 페이지 하나를 React application으로 분리하고 각종 기능을 추가했다. 그동안 해왔던 방식으로 application을 배포하는 것도 아니었고, shadowDOM을 사용하는 등 새로운 시도가 많았다. GDG에서 요약해서 발표도 한 만큼, 나중에 분리 과정을 정리한 다음 블로그에 포스팅해 볼 생각이다 ~~사실 향로가 회사 기술 블로그에 글을 쓰라고 압박하고 있는데 애써 외면하고 있다.~~ ~~물론 그러면 안 된다는 것도 잘 알고 있다~~.

2. 디자인 시스템 구축

   사내 디자인 시스템을 구축했다. [같은 셀에 소속된 동료](https://emewjin.github.io/)가 원래부터 주도하던 프로젝트였기 때문에 자연스럽게 옆에서 서포트할 기회를 얻었다. 외부 라이브러리인 mantine을 한번 감싸는 형태로 제작되고 있는 모습을 보고 아차 싶었다. 조금 더 빨리 입사해서 말려볼걸. 하지만 디자인 시스템을 전담할 인력도 없고, 구축해본 경험이 전무한 상태에서는 좋은 선택이었을 거라 애써 생각하며 ~~이제와서 말하지만~~울며 겨자 먹기로 만들었다.

   처음에는 monorepo인 inflearn-frontend 내부에 있었지만 다른 repository에서도 사용해야 하는 이슈가 생겨 GitHub registry에 배포하는 형태로 전환되었다. 이 과정에서 SemVer에 대한 공감대를 얻기 위해 노력했고, 배포와 버전관리까지 개발자가 일일이 신경 쓸 필요가 없다는 점을 계속 이야기했다. 팀원들에게 지속적으로 이야기했던 자동화는 changesets으로 해결하는 데 성공했다. 이전 팀에서 구축까지만 해보고 거의 운영해보지 못해 아쉬웠던 경험을 해소할 수 있어 개인적으로 후련함을 느꼈다.

   내년에는 디자이너의 요구사항을 더 유연하게 수용하면서 mantine에 대한 의존성을 없애기 위해 자체적으로 v2를 구축할 계획이다.

3. Codegen 릴리즈

   인프랩은 공식적으로 GraphQL을 채택하고 있지 않다. 이전 팀에서 GraphQL을 사용하면서 각종 자동화를 통한 혜택을 누리고 있었는데 다시 RESTful로 개발하려니 아득해지는 느낌이었다. 이전 팀에서 비슷한 문제를 고민할 때 open API spec을 이용하려고 했었던 기억이 떠올라 관련 라이브러리들을 찾아봤지만, 마음에 드는 것이 없었다. 만들어진 결과물을 써보자고 해 봤자 아무도 안 쓸 것만 같은 예상이 옆자리 동료를 통해 확신으로 변하는 순간 **그냥 만들어야 겠다**고 생각했다.

   GraphQL codegen과 비슷한 컨셉으로 swagger에서 제공하는 open API JSON을 통해 각종 타입과 react-query를 이용한 hooks, typeguard까지 자동으로 만들어 주게끔 개발했다. 동시에 백엔드의 테스트 코드에서 사용해 볼 수 있게끔 open API JSON을 이용해 JSON validator도 자동으로 만들어지게 했다. JSON validator를 통해 백엔드에서는 개발자가 선언한 swagger 문서대로 API response를 보내는지 쉽게 테스트해 볼 수 있게 되었다. 이렇게 한 것은 [위에서 이야기한 Elixir의 doctests 개념](#elixir)을 차용해 본 것이다. 이야기를 들은 향로도 괜찮은 생각이라고 했고, 쓰고 있는 사람들도 만족하고 있어 개인적으로 뿌듯한 결과물 중 하나이다.

   개인적으로는 codegen을 만들면서 오픈소스를 운영하는 것 같은 재미도 있었고, discussion을 이용해 팀 내 토론을 활성화 한 부분도 정말 좋은 성과였다고 생각한다. 내년에는 확실히 안정화된 v1을 릴리즈하는 게 목표다.

### 무엇을 배웠나

- 결정하고, 그 결정에 대해 책임지는 법을 배웠다.
- OOM 이슈를 해결하고 디자인 시스템을 구축하며 그동안 겉으로만 알고 있었던 번들링, SemVer, 모듈에 대한 지식을 조금 더 자세히 배울 수 있었다.
- Codegen을 개발하며 받은 코드 리뷰로 OOP에 대한 추상적인 개념을 몸으로 익힐 수 있었다.
- [옆자리 동료](https://emewjin.github.io/)와 일을 하며 위임하는 법과 주변 사람을 성장시킨다는 게 어떤 것인지 어렴풋이 알게 되었다.
- 프런트엔드 파트 동료들의 생각을 통해 내가 놓치고 있었던 많은 부분을 채울 수 있었다.
- 셀 동료들과 밀접하게 일을 하며 프로덕트를 어떻게 대해야 하는지 다시 한번 느낄 수 있었다.

## 3. 성장통

### 팀에서의 내 역할은 무엇인가?

처음 합류할 당시 대표님과 향로는 내가 경험을 나눠주고 주변 사람을 성장시키기를 원한다고 하셨다. 하지만 그동안 누군가를 성장시킨다는 경험이나 고민조차도 제대로 해보지 않았기 때문에 생각보다 부담되었다.

그랬기 때문에 팀원들을 더욱 조심스럽게 대했고, 기회가 있을 때마다 적극적으로 지식을 나누기 위해 노력했다. 작은 세미나를 열기도 했고 페어 프로그래밍을 적극적으로 하거나 일주일마다 한 번씩 있는 프런트엔드 테크 리뷰 시간에 많은 의견을 냈다. 무언가를 도입하고, 실험한 것에 대해서는 문서를 남겨서 팀에 공유했고 일하는 방법을 알리기 위해 노력했다. _위임하고 기다리기_ 역시 쉽지 않았지만, 인내심을 가지고 실천했다.

하지만 이런 행동을 하면서 계속 고민되었던 부분은 나의 애매한 위치였다. 단순한 작업자 1인 상황에서 '내가 팀원들에게 이런 이야기를 해도 될까?'라는 생각이 계속 들었기 때문이다. 한번은 단순히 jira에 대한 의견을 냈을 뿐인데 팀원들이 갑자기 jira 스터디를 만들고 '루카스가 말한 것처럼 jira를 써보자'라는 말을 들었을 때 굉장히 당황하기도 했다.

이 문제는 사실 어떻게 해결해야 할지 결론을 내리지 못했다. 다만 내년에 팀원들과 조금 더 많이 소통하면서 내 위치와 역할, 나에 대한 기대를 조절해 나갈 수 있을 것이라는 막연한 기대를 해본다.

### 성장하고 있는가?

매년 회고마다 스스로 묻는 말이다. 확실히 연차가 쌓일수록 성장이라는 게 무엇인지, 나는 잘 성장하고 있는지 고민의 깊이가 점점 깊어지는 것 같다. 개발자가 된 이후로 한 번도 내 하드 스킬의 성장에 대해서는 만족을 한 적이 없었고, 올해도 역시 마찬가지다. 도처에 있는 괴수 같은 개발자들을 볼 때마다 나는 한참 멀었다는 것이 느껴진다. 내년 2월이면 벌써 6년 경력의 개발자가 되는데 쌓인 경력만큼 잘하고 있는지도 의문이다. 분명히 부족한 부분은 잘 보이는데, 잘하는 부분이 좀처럼 보이지 않아 연차가 쌓일수록 걱정이다. 나는 어떤 길을 걸어가야 하는 것일까?

## 4. 그 밖의 일들

### 멘토링

로토의 소개로 멘토링을 하게 되었다. [로토가 활동하는 밴드의 리더](https://www.bullwoostar.dev/)로 타 직군에서 개발 직군으로 직무 전환을 원하시는 분이었다. '내가 해도 괜찮을까?'라는 고민이 있었지만, 멘토링을 통해 서로 얻는 것이 분명히 있을 것이라는 로토의 말에 수락하게 되었다. 그렇게 알게된 멘티는 굉장히 열심히 하는 전형적인 노력파였고, 오죽하면 건강이 걱정되어 멘토링을 할 때마다 조금씩 쉬어가면서 하셔도 괜찮다는 말씀을 드렸었다.

올해 3월부터 9개월간 개인적으로 멘토링을 해드렸고, 내가 도움이 되었는지는 잘 모르겠지만 내가 얻게 된 것이 많았다. 아예 모르는 개념을 쉽게 설명하는 방법, 코드 리뷰를 통해 좋은 코드를 쓰도록 유도하는 방법, 학습 방향에 대해 가이드하는 방법 등 회사에서도 쓸 수 있는 소프트 스킬들을 많이 익힌 것 같다. 그동안 경력직인 동료들하고만 일을 했기 때문에 얻을 수 없었던 소중한 경험이었다.

한편 멘티가 취업할 무렵 경제 상황이 안 좋아 지면서 면접 기회조차 얻지 못해 너무나 힘들어하셨는데, 다행히도 지금은 원하는 회사에 취업하셔서 즐겁게 일하고 계시다. 정말 열심히 하시는 모습을 보았기 때문에 마땅한 결과라고 생각한다.

### 사이드 프로젝트 - 메가 향로

두 번째 스프린트를 마쳤을 무렵, QA를 진행할 때 유저의 권한별로 테스트하거나 특정한 상황을 만들어 놓고 테스트하는 게 굉장히 번거로웠다. 그래서 막연하게 이 부분을 해소하기 위한 QA back office를 만들어야겠다는 생각만 했었다. 더 이상 미룰 수 없다고 느꼈을 때, 혹시나 하는 마음에 주변 사람들에게 의사를 물어보니 참여 의사를 밝힌 사람이 꽤 많아 본격적으로 시작하게 되었다.

평소 사용하는 RESTful 방식의 API가 아닌 GraphQL을 선택하여 서비스를 만들고 있는데, GraphQL에 관심은 있지만 써보지 못했던 팀원들의 경험을 위해서였다. 이 프로젝트는 내년 초쯤 beta release할 수 있을거 같다.

### GDG 발표

항상 적절한 순간에 적절하게 나타나 적절한 제안을 하는데 도가 튼 [제프리](https://www.brightparagon.me/) 덕분에 GDG에서 발표할 기회를 얻게 되었다. 엄청나게 큰 규모는 아니었지만, 경력 5년 안에 기술 관련 발표를 하겠다는 개인적인 목표를 달성할 수 있었다.

인프랩에서 경험한 6개월 치의 기술적 도전에 대해 발표했는데 주제 선정이 어려울 정도로 많은 부분을 추려내느라 애를 먹었다. 발표 주제는 항상 고민이지만, 인프랩에 합류한 덕분에 아주 쉽게 주제를 정할 수 있어 감사함을 느끼고 있다.

### 지인들의 결혼

정말 좋은 친구이자 동료인 [에디](https://future-seller.dev/)와 [로토](https://blog.roto.codes/)가 결혼을 했다. 이 두 사람이 결혼할 때 결혼식 사회를 봤는데, 둘 모두의 연애를 시작부터 보았는지라 정말 의미 있었다. 다만, 결혼식 사회를 몇 번 보기는 했지만 할 때마다 긴장되는 건 어쩔 수 없는 것 같다. 그렇기 때문에 당분간 결혼식은 하객으로만 다닐 생각이다. 아무튼 두 커플의 앞날에 무한한 축복이 있기를 진심으로 바란다.

### 요리

작년부터 꾸준히 하는 취미활동이다. 알면 알수록 정말 심오한 세계라고 생각이 들고, 예술이라기보다는 과학에 가깝다는 생각이 드는 건 기술자로서 어쩔 수 없는 부분인가 싶기도 하다. 이제는 처가에서 음식을 하면 장모님도 별말씀이 없으셔서 내심 뿌듯함을 느끼고 있다.

[작년 회고](/post-mortem/2021-memoir/#%EC%83%88%EB%A1%9C%EC%9A%B4-%EC%B7%A8%EB%AF%B8%EC%83%9D%ED%99%9C)에서도 말했듯 요리는 개발과 비슷한 점이 있는 것 같다. 예를 들면 멸치 다시다를 쓰는 것과 직접 국물을 내는 것의 차이는 잘 만들어진 라이브러리를 쓰는 것과 직접 밑바닥부터 개발하는 것의 차이와 비슷하고, 물을 끓이면서 재료를 다듬고 계량을 하는 내 모습이 '동시성'에 가깝다는 생각이 든다 ~~혹시 직업병인가~~. 하지만 역시 기초를 탄탄히 했을 때 정해진 정답이 아닌 상황에 맞는 해답을 찾을 수 있다는 점은 두 분야가 완벽히 똑같은 것 같다.

아무튼, 정말 즐겁게 취미생활을 이어가고 있다.

### 읽었던 책들

- 이펙티브 타입스크립트
- 상자 밖에 있는 사람
- 숫자는 어떻게 진실을 말하는가
- 일의 격
- 도메인 주도 설계 철저 입문
- 개발 함정을 탈출하라
- 명상록
- 도메인 주도 설계
- 프로그래머의 뇌
- 린 스타트업
- 실용주의 사고와 학습
- 어떤 개발자가 살아남는가
- 이펙티브 엔지니어
- 하우 투 제텔카스텐
- 엘레강트 오브젝트
- 구글 엔지니어는 이렇게 일한다

## 5. 마치며

2023년의 회고를 쓸 때는 재미있고 즐거운 에피소드가 가득하기를 소망한다. 그러기 위해서 하드 스킬과 소프트 스킬 모두 갈고 닦아야겠다는 생각이 든다. 그동안 등한시했던 모니터링, error tracking을 통한 문제를 해결하기 위해 프로덕트를 운영하는 기술을 좀 더 익혀야겠다. 본업인 프런트엔드의 실력 향상은 물론이고, 팀원들의 즐거운 개발을 위해 CI/CD 개선 등 팀의 DX 개선을 위한 기술도 공부해야겠다.

프로덕트 팀뿐만 아니라 실제로 제품을 운영하는 운영팀에도 관심을 가질 생각이다. 자세히 파악은 하지 못했지만, 수동으로 처리하는 일이 많은 것으로 알고 있는데, 자동화할 수 있는 부분은 최대한 지원해 드릴 생각이다. 운영 파트 업무 자동화 지원은 새로운 언어 혹은 새로운 프레임워크를 익히는 기회로 삼아 보려고 한다.

더 이상 미루지 않고 내년에는 리딩하는 연습에 조금 더 적극적으로 나설 생각이다. 팀원들의 생각을 물어보고 모두가 동의한다면, 아무도 시킨 사람은 없지만 천천히 _리드처럼 생각하고 행동해 보려고 한다_.

개발을 잘하는 개발자라는 이야기를 들어도 좋겠지만, 내가 처음 이 길을 걷기 시작했을 때 보았던 멋있는 선배들처럼 팀원들이 나를 그렇게 생각해 준다면 내년은 성공한 한 해가 되지 않을까 예상해본다.
