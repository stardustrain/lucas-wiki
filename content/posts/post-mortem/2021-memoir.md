---
title: 2021년 회고록
description: FE개발자로 2021년을 돌아보는 회고록.
url: https://wiki.lucashan.space/post-mortem/2021-memoir/
date: 2021-12-30
tags: [Post-mortem, '2021']
image: https://user-images.githubusercontent.com/9318449/147798373-198eb26a-cd81-465c-a62b-2ea8d65dc14d.jpeg
---

## 들어가며

2021년도 벌써 끝이 나버렸고, 늘 그렇듯 회고를 하며 올해를 돌아보았다.

특이하게도 올해는 기술적인 도전보다는 내적 갈등과 고민이 가득했던 것 같다. 상반기에 있었던 사건부터 회사를 옮긴 하반기에 겪었던 일들까지 스트레스를 한가득 받았다. 이 정도로 스트레스를 받았던 적이 있었나 싶을 정도로 너무 힘들었다.

하지만 그 스트레스들을 통해서 고민하고, 얻게 된 것들도 있었다. 평소에 깊이 생각해 보지 않은 것에 대한 근원적인 질문을 던져보게 되었고, 크게 신경 쓰지 않았던 부분들이 생각보다 많은 영향을 준다는 것을 깨닫게 되었다.

2021년 회고록의 내용은 그다지 즐겁지 않을 것 같고, 기술적인 성장보다는 내적인 고민과 성장이 더 컸던 한 해로 기록될 것 같다.

## 1. 애자일이란 무엇인가?

작년에 [동료와 함께 스크럼으로 일하면서](https://future-seller.dev/posts/scrum-experience) 막연하게 느껴졌던 **애자일**이라는 것의 개념이 어렴풋이 손에 잡히는 듯 보였다. 하지만 올해의 경험으로 신기루처럼 *그 어렴풋함*이 그대로 사라져 버렸다. 결국 _도대체 애자일이란 무엇일까?_ 라는 근본적인 질문을, 다시 스스로 해보게 되었다.

- ### 애자일은 반드시 좋은 것인가?

  애자일에 대한 정의를 하지 못했기 때문에 질문 자체가 성립하지 않을 수도 있지만, 몇 번이고 던져보았던 질문이다. "애자일하지 못한 팀"은 성과를 충분히 낼 수 없는 것일까? "애자일한 팀"은 반드시 성공하는 것인가? 애자일 프로세스를 따랐음에도 "애자일" 하다고 느끼지 못하는 이유는 무엇인가?

  왜 우리는 애자일하게 일해야 하는가?

- ### 문화인가?

  위에 쓰여 있는 *애자일 프로세스를 따랐음에도 "애자일" 하다고 느끼지 못하는 이유는 무엇인가?*에서 이어지는 고민이었다. 팀이 애자일 프랙티스에서 제시한 프로세스를 그대로 따랐음에도, 실제 제품의 출시가 늦어지고 개개인이 애자일하지 않다고 느낀다면 어떻게 바라봐야 할까. 이를 통해 애자일은 프로세스만 따른다고 달성할 수 있는 게 아니라고 느꼈다.

  그렇기 때문에, 일단 애자일은 프로세스가 아닌 조직의 문화 그 자체라고 결론을 내렸다. XP 등에서 제시하는 애자일 프랙티스는 결국 이러한 조직문화를 만들기 위한 하나의 방법이지 애자일의 목적이 될 수는 없다고 생각했다. 애자일 프랙티스를 100% 따르지 않더라도 충분히 애자일하게 일하는 팀이 있을 것이라 생각하기 때문이다. 아직 짧은 경험이지만, 무언가 다른 것을 깨닫게 될 때까지 애자일은 `문화`라고 말할 것 같다.

- ### 확실히 알게 된 것

  답이 없는 위의 질문들에 비해, 하반기의 경험으로 확실히 알게 된 것은 있다.

  1. 애자일 프로세스를 도와주는 툴을 사용한다고 해서 팀이 반드시 "애자일하게" 일할 수 있는 것은 아니다.
  2. 애자일 프랙티스에 있는 내용을 무작정 팀에 이식하는 것은 비효율적인 일이다.
  3. "애자일하게 일하는 것"에 대한 생각이 팀원들 모두가 일치해야 한다.
  4. **프로세스보다 결과에 집중** 해야 한다. 프로세스는 좋은 결과를 내기 위한 하나의 수단이지 목적이 아니다. 프로세스 그 자체에 매몰되면 안 된다.
  5. 프로세스를 이행하여 결과를 만들어 내는 것은 결국 **사람**이다.

## 2. 팀으로 일한다는 것

- ### 빈자리

  올 하반기에는 항상 블로그에 등장했던 [**그분2**](https://blog.roto.codes/)와 떨어져서 일하게 되었다. 회사를 옮기면서 같이 일하던 몇몇 동료들과 함께 지금의 회사로 왔는데, **그분2**는 다른 회사로의 이직을 결정했기 때문이다.

  같이 이직한 동료를 제외하고, 원래 계셨던 분들 중에 프런트엔드 개발을 주로 하신 분들이 없었다. 그러다 보니 주로 내가 프런트엔드 제품의 기술적인 결정을 해야만 했다. 그리고 제품마다 큰 방향을 정해놓고 나중의 시너지를 생각하여 전체적인 일정을 잡는 일도 하게 되었다. 이런 일을 하게 되었다고 해서 코드를 아예 쓰지 않았던 것도 아니다. 팀의 밀린 업무들이 꽤 존재하는 상황이었고 나중에는 새로운 제품을 만들었다.

  직전 회사에서 일할 때는 **그분2**의 결정에 대해 의견을 제시하거나 따라가는 일이 많았는데, 막상 여기 와서 내가 결정하고 책임지려고 하다 보니 쉬운 일이 아니라는 것을 알게 되었다. 특히 팀에 새롭게 도입하는 시스템에 대해 먼저 PoC를 진행하여 그 일을 진행하게 될 동료에게 아이디어를 전달하고, 실제 제품으로 이어지게 만드는 일이 생각보다 어려웠다. 하지 않았던 이런 일들을 직접 해보니 좋은 경험과 공부가 되었다. 물론, 알아서 제품을 챙겨주는 훌륭한 동료들 덕분에 죽을 만큼 힘들지는 않았다.

  이런 상황에서, 정말 힘들 때는 자연스레 **그분2**가 생각났다. 같이 일했을 때 짜증을 낸 적도 많았고 **그분2**의 결정에 대해 툴툴거린 적도 많았는데 얼마나 힘들었을까 싶다. 나는 다행히도 좋은 동료들 덕분에 스트레스보다는 얻은 경험이 더 많았다고 생각하는데, **그분2**에게 나는 좋은 동료였을까 싶다.

- ### 코드 리뷰는 생각보다 어렵다

  처음 합류했을 때 당황했던 것 중 하나는 팀의 코드 리뷰 문화였다. 그동안 겪어왔던 팀들과는 너무나 다른 분위기에서 리뷰가 진행되고 있었다. 코드 리뷰는 적당히 사무적이어야 하고 온전히 업무 공간이어야 한다고 생각하는 편인데, 많이 가벼운 분위기에서 진행되고 있었다. 이 상황에서 원래 하던 방식으로 리뷰를 진행하려고 하니, 너무 딱딱해 보이거나 화난 것처럼 보이지 않을까 걱정했다.

  진짜 어려웠던 점은 리뷰를 받는 동료의 방식이었다. Lint error를 무시하거나, 널리 알려진 anti pattern으로 로직을 작성하는 등 굳이 코드 리뷰에서 논의하지 않아도 되는 기본적인 부분들을 리뷰하다 보면 "어디까지 리뷰를 해야 하는 거지?"라는 생각이 들기 일쑤였다. 무엇보다 "바쁘니까 일단 이렇게 할게요"라는 comment와 함께 리뷰를 무시하고 merge 하는 일이 꽤 잦았다. 이런 일이 반복되다 보니 리뷰를 하는 입장에서는 힘이 빠질 수밖에 없었다. 그래서 결국 TF가 다르다는 핑계로 그 동료의 코드는 아예 리뷰하지 않게 되었다.

  솔직히 아직도 이런 경우에 동료에게 어떻게 해야 할지 판단이 서지 않는다. 개인의 개성을 어디까지 존중할 것이고, 어떤 룰을 만들어서 준수하게 할 것인지 결정하는 것은 항상 어려운 것 같다. 앞으로 똑같은 상황이 닥친다면 어떻게 해야 할지 매우 고민이다.

- ### 좋은 동료였을까?

  한 해를 마감하면서 반드시 회고하는 것 중 하나는, _나는 과연 좋은 동료였을까?_ 이다. 나는 어떠한 기술적 의사결정에 대해서 치열하게 토론을 벌이기도 하고, 어떠한 상황을 확실히 리드를 하거나 서포트를 하면서 일이 진행될 수 있게 만드는 인간적인 사람이 좋은 동료라고 생각한다. 내가 저런 동료들을 항상 갈구하듯 다른 한편으로 내가 그들에게 좋은 동료였을까? 아직 일을 같이한 동료에게 제대로 피드백을 받지 못해서 이 질문에는 결론을 내릴 수는 없을 것 같다. 이 질문에 대답하기 위해서 내년 초에 피드백을 한 번씩 수집을 해볼 생각이다.

  나는 올해도 좋은 동료들과 함께했을까? 언제나 그랬듯 내 능력 이상으로 좋은 동료들이 내 옆에 있었고, 그들과 많은 문제를 해결할 수 있었다. 이 글을 빌려 감사를 전하고 싶다.

## 3. 올해 진행했던 프로젝트들

- ### Ondemandlatino

  ODKMedia에서의 마지막 제품인 [ondemandlatino](https://www.ondemandlatino.com/en)를 올해 4월에 런칭했다. Next.js를 사용했으며, [ondemandchina](https://www.ondemandchina.com/zh-Hans)를 만들었을 때의 시행착오들에 대한 보완책이 고스란히 녹아있어 개인적으로 애착이 가는 제품이다.

- 논쟁

  이 제품을 만들 때 일정과 회사의 상황으로 스트레스를 많이 받았었고, 그것이 원인이었는지 프로젝트를 진행하던 도중 백엔드팀의 [애영](https://kimaeyeong.tumblr.com)님과도 불필요한 마찰이 있었다.

  API의 설계에 대한 논쟁이었는데, 이야기를 하다 보니 명확하게 합의하지 않고 대충 넘어간 부분이 문제였다. *백엔드팀에서 이야기하는 모델*과 *프런트엔드팀에서 이야기하는 모델*의 개념이 완전히 달랐다. 백엔드팀은 말 그대로 DB 모델 그 자체를 모델이라고 불렀고, 프런트엔드팀은 serializer를 통과해서 나온 response object를 모델이라고 부르고 있었다.

  이 상태에서 API에 대한 논의를 진행할 때 "모델은 바뀌지 않고 기존 API가 거의 복제될 것이다."라는 백엔드팀의 말을 우리식대로 "response가 바뀌지 않는다" 고 해석해 버렸고, 완전히 새로운 API가 나오자 약속과 다르지 않냐며 논쟁을 하게 된 것이다.

  결국 어느 쪽의 실수도 아닌 쌍방 과실로 결론이 났고, 밤늦게 애영님께 콜을 요청해서 묵힌 감정과 오해들을 풀어냈다. 백엔드팀에서는 빠듯하지만 프런트팀의 요청을 최대한 수용하기로 하였고, 프런트팀에서는 기존의 GraphQL 서버의 schema를 사용하지 않고 완전히 새로운 schema를 client side에서 사용하기로 합의하였다.

- 동상동몽

  좋은 동료를 잃을 뻔했던 이때의 경험이 아찔하기는 했지만, 당연히 이를 통해 배운 점도 있었다. 프로젝트를 본격적으로 진행하기 전 여러 단어(개념)를 맞춰보는 것이다. 이를테면 "모델"은 DB의 모델 그 자체이고, API response는 response schema라고 부르기로 하는 등, 서로 간의 오해를 최대한 없애기 위해 프로젝트를 진행하는 모든 사람을 모아서 개념을 일치시키는 시간을 먼저 갖는 것이다.

  다른 프로젝트인 LMS admin을 본격적으로 진행하기 전에 개발자들뿐만 아니라 디자이너와 실제로 admin을 사용하게 될 팀원 등 필요한 사람들에게 필요한 만큼 시간을 들였는데, 생각보다 효과가 좋았다. 참고로 우리 팀의 디자이너는 이를 `동상동몽`이라고 부르는데, 재미있으면서도 적절한 표현인 것 같다.

- ### LMS admin

  Learning Management System admin을 새롭게 만들었다. 원래 기존의 admin이 존재하는 상황이었지만 대외 서비스와 코드 베이스가 묶여있는 상태였고, 이를 따로 분리하면서 사용성을 개선하는 것을 목표로 삼았다. 내부에서 사용할 툴이었기 때문에 상대적으로 기술 결정에 대한 부담이 적었고, 덕분에 yarn berry를 적용하는 것은 물론 Relay-like 한 설계를 실험해 볼 수 있었다.

- Relay-like?

  `Relay-like`라고 한 이유는, 서버의 스펙이 Relay에 완벽하게 맞지 않아 client에서 Relay를 사용할 수 없어 해당 framework를 흉내내어 개발했기 때문이다.

  각 component에서는 필요한 데이터를 fragment로 선언하고, query loader 역할을 하는 component에 spread 하는 방식으로 처리하였다. Component에서 hooks를 사용할 때는 query loader 역할을 하는 component에서 useQuery를 통해 fetch하고, fragment로 선언한 부분을 각 component에 props로 전달하는 방식으로 구현했다.

<disclosure title="Example">

```tsx
// CardnewsListPage.tsx
export const query = gql`
  query CardnewsListPage_CardnewsList($pagination: PaginationInput) {
    cardNewsList(pagination: $pagination, order: { createdAt: DESC }) {
      nodes {
        ...Cardnews_CardnewsItem
      }
      totalCount
    }
  }
`

export default function CardnewsListPage() {
  const { data } = useCardnewsListPage_CardnewsListQuery({
    variables: {
      pagination: {
        page,
        perPage,
      },
    },
  })

  return (
    <ul>
      {data?.cardNewsList.nodes.map(node => (
        <li key={node.id}>
          <Cardnews cardnews={node} />
        </li>
      ))}
    </ul>
  )
}

// Cardnews.tsx
export const fragment = gql`
  fragment Cardnews_CardnewsItem on CardNews {
    id
    title
    description
  }
`

interface Props {
  cardnews: Cardnews_CardnewsItemFragment
}

export default function Cardnews({ cardnews }: Props) {
  return (
    <article>
      <h2>{cardnews.title}</h2>
      <p>{cardnews.description}</p>
    </article>
  )
}
```

</disclosure>

이는 Relay의 `usePreloadedQuery` - `useFragment`의 관계를 (완벽하지는 않지만) 따라 하려고 한 부분이다. Ondemandlatino를 개발했을 때처럼 GraphQL을 사용하기 위한 query, mutation을 한곳에 몰아넣지 않고 각 component와 같은 위치에 선언한 것이다.

덧붙여, operation name의 convention도 Relay와 동일하게 가져갔다. 이름이 길어져 codegen을 사용했을 때 hooks의 이름도 함께 길어지는 단점도 있었지만, 어느 component에서 어떤 데이터를 요청했는지 한 눈에 알 수 있어서 편하게 느껴지기도 했다.

다만 아쉬운 점은 실제로 제품을 운영하는 상태에서 유지보수를 하거나 새로운 기능을 추가해 볼 수 있는 기회가 없다는 것이다. 제품을 처음부터 개발할 떄는 분명 좋다고 느꼈지만, 유지보수에도 유용할 것인가는 미지수이기 때문에 반쪽짜리 실험이 되어버리고 말았다. 다음번에는 꼭 Relay를 이용해 개발한 제품을 운영하며 유지보수 해보고 싶다.

- Chakra

  **그분2**를 잠깐 도왔었던 [indistreet](https://indistreet.com/)에서 chakra ui를 처음 접했고, 이 프로젝트에서 제대로 사용해 보았는데 만족도가 아주 높았다. Component 추상화가 잘 되어있고 접근성 처리도 잘 되어있어서 사용하는데 편리함은 물론, 내부의 코드를 참고하며 많은 공부를 하였다. 아마 내부 툴을 만들 일이 또 생긴다면 그때도 이용하게 될 것 같다.

- ### Design system

  사실상 중단된 프로젝트이기 때문에 쓸 말이 크게 없다. 이번에는 잘 만들어 보고 싶었는데 역시나 쉽지 않은 일이었다. 디자이너와 협력부터 시작해 준비할 게 정말 많았고, 밑바닥부터 제대로 만드는 건 정말 어려운 일이라는 게 느껴졌다. 언젠가는 design system만을 만드는 팀에 합류해서 제대로 만들어 보고 싶다.

  다만 monorepo에서 `changesets`를 이용해 GitHub npm registry에 자동으로 배포하는 시스템을 만들어 본 것이 수확이라면 수확이었다. 배포 시스템을 구축한 과정은 [여기](/programming/setting-monorepo-for-github-npm-registry-1/)정리해 놓았다.

## 4. 그 밖의 일들

- ### 첫 오픈소스 기여

  올해 처음으로 오픈소스에 기여해 보았다! `graphqurl`이라는 라이브러리에 작은 부분을 기여했고 너무나 즐거웠던 나머지 [이곳](/essay/contribute-to-open-source/)에 경험담을 써놓았다. 이 경험에서 용기를 얻어 remix에도 시도해 보았지만, 안타깝게도 불발되고 말았다. 앞으로도 오픈소스에 대한 관심을 끝까지 놓지 않을 생각이다.

- ### 새로운 취미생활

  밖에서 할 수 있는 것이 없어 새로운 취미로 요리를 하기 시작했다. 생각보다 조리된 결과물이 맛도 있고 재미도 있어서 자주하고 있다. 특히 요리가 개발이랑 비슷하다는 생각을 최근 들어 자주하고 있는데, 언젠가 재미있게 글로 풀어낼 수만 있다면 좋을 것 같다.

- ### 읽었던 책들

  - Factfulness
  - Making Work Visible
  - 칸반과 스크럼
  - 개발 7년차, 매니저 1일차
  - 공정하다는 착각
  - OKR
  - 사용자를 생각하게 하지 마!
  - 데이터 분석가의 숫자 유감
  - 인클루시브 디자인 패턴
  - 초생산성
  - 철학의 위안
  - 클린 코더
  - 우리의 뇌는 어떻게 배우는가

## 5. 마치며

2021년은 많은 것을 느끼고, 고뇌했던 한 해였다. 기술적인 성장보다는 내적인 성장을 더 많이 할 수 있었으며, 이를 통해 내 안에 자리 잡고 있던 편견들의 일부를 깰 수 있었다. 개발자로서 기술적인 성장을 많이 하지 못했다는 것은 너무나 아쉽지만, 성장의 공간이 비어버린 만큼 내년에는 좀 더 공격적으로 그 공간을 채워 넣을 수 있으리라 기대하고 있다.

내년 초가 되면 현재 몸담은 곳을 떠나 새로운 곳에 합류하여 일하게 된다. 새로운 도전들과 새로운 동료들이 너무나 기대된다. 나 역시 새로운 곳에서 나의 성과를 증명하기 위해 치열하게 달릴 예정이고, 제품을 "만드는 것" 보다는 "잘 만드는 것"에 더 초점을 맞출 예정이다. 이제는 그런 노력을 함으로써 주변 동료들에게 건강한 영향을 주어야 한다고 생각한다.

덧붙여, 내년에는 next step에 대한 고민을 시작 해볼 생각이다. 나는 tech lead가 되어야 할까 manager가 되어야 할까?

---

<h2 class="reference-title">참고</h2>

- [if kakao 2021 - 지라 쓰는게 애자일 아니라고 했어 안했어?!](https://if.kakao.com/session/31)
- [왜 어떤 구글 개발자들은 애자일 개발이 무의미하다고 하는가](https://www.quora.com/Why-do-some-developers-at-strong-companies-like-Google-consider-Agile-development-to-be-nonsense/answer/David-Jeske?share=1)
- [Thinking in Relay](https://relay.dev/docs/principles-and-architecture/thinking-in-relay/)
