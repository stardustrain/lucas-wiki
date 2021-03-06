---
title: XP 실천방법 따라해 보기 - Pair programming과 TDD
description: XP 실천방법 따라해 보기 - 3일간 인생의 동반자와 TDD해본 이야기.
url: https://wiki.lucashan.space/essay/story-for-experienced-to-xp-with-wife/
date: 2020-05-08
tags: [Essay, '2020']
---

최근 [익스트림 프로그래밍](http://www.yes24.com/Product/Goods/2126201) 이라는 책을 읽고 있다. 꽤 재미있게 읽고 있는 만큼, HDD(Hype Driven Development; 설레발 주도 개발)로 연결되지 않을까 두려워 한편으로는 조심스럽게 접근하고 있다. 이 책을 **주의하여 읽지 않으면**, _XP가 모든 문제를 해결할 수 있다_ 라는 **착각**에 빠지기 쉽기 때문이다. 그런 착각에 빠지게 되면, 팀의 분위기나 문화는 그대로인데 적당한 프로세스만 도입한다거나 애자일 실천방법을 성과에 묶어버리는 이상한 상황이 발생한다. 본인이 실제로 겪어본 일이기도 하고.

최근에 내가 바뀐점이 있다면, 혼자 잘하는 방법보다는 팀이 잘하는 방법에 대해서도 생각하게 되었다는 것이다. 특히 팀원들이 그들의 개성만큼이나 다양한 조직경험, 일하는 방식을 가지고 있기 때문에 이러한 것들을 잘 조합하여 시너지를 발생시키면 좋을 것 같다고 생각하고 있다. 그러던 중에 이 책을 접하게 되었고, 몇몇 파트에 적혀있는 방법들을 실제로 증명해 보고 싶다는 생각이 들었다.

## 1. 이 모든 게 COVID-19 때문이다

황금 같은 5월 초 연휴 첫 날에, 문득 '연휴를 어떻게 보낼까'에 대한 생각을 하게 되었다. 원래 연초 계획대로라면 지금쯤 우리는 대만에 있었어야 했지만, 생각보다 COVID-19가 쉽게 사라지지 않아 모든 것을 취소한 상태였다. 날도 좋고 먼지도 깨끗한데, 가까운 곳이라도 여행을 갈 수가 없어 허탈했던 와중에 좋은 생각이 들었다.

Frontend 개발자로 일하는 와이프는 평소 backend를 직접 만들어 보는 것에 대해 관심이 있었다. 다만 한 번도 경험해 본 적이 없었기 때문에 쉽게 시작하지 못하는 상태였는데, 이 부분을 3일 동안 내가 도와주기로 하였다. 간단하게 RESTful API server를 만드는 것을 알려주는 대신, 내가 제시한 방법대로 개발을 진행하는 조건으로.

그렇게, COVID-19 덕분에 토이프로젝트를 빙자한 임상 시험을 시작하게 되었다.

## 2. 무엇을 했는가

우리는 `배포 가능한, 아주 작은 spec들이, 실제로 동작`하는 API server를 만들어 보기로 하였다. 길게 고민하지 않고 blog 관련 API를 생각해 냈는데, 그 이유는 다음과 같았다.

- 인증 process를 적당히 경험해 볼 수 있음(로그인하고 글쓰기, 내 글만 지우기 등).
- User - Post - Comment - Like 등 간단하지만, 유기적인 relation을 경험해 볼 수 있음.
- 최소한의 코드만으로 일단은 동작하는 API를 만들어 볼 수 있는 점(빠른 피드백).
- 와이프가 원래 blog를 만들어 보고 싶어 했음.

3일 동안 진행할 프로젝트로 적당하다고 생각했기 때문에, 둘 다 부담 없이 임할 수 있었다. 결론부터 말하자면, 소기의 성과를 냈고 아쉽게도 목표치 만큼 완성하지는 못했다. 그럼에도, 와이프가 여느 때와 다르게 굉장한 학습 의지와 지속적인 개발 의지를 보여 다행이라고 생각하고 있다. 코드는 [이 곳](https://github.com/StellaKim1230/myblog-backend)에 있다.

### 1. 우선 환경을 구성하고 목표를 잡았다.

일단 server language로 Frontend 개발자들에게 적합한 `typescript`를 선택했다. 더불어, server를 만들기 위한 framework로 `express.js`를 선택했다. 개인적인 생각으로는 all in one framework를 통해 어떤 식으로 동작하는지를 먼저 파악하면 좋을 것 같다는 생각을 하고 있지만, 그 자체를 익히는데 시간이 많이 소모되기 때문에 대상에서 제외하였다.

Database는 `mongodb`를 선택했다. 이유는 굉장히 단순한데, SQL을 작성하거나 ORM을 위한 설정을 하는 시간을 줄이기 위해서였다.

배포는 우리가 원하는 최소 스펙이 달성되었을 때 하자고 하였는데, 아직 최소 스펙에 도달하지 못해 배포 설정은 하지 않았다. 아마 하게 된다면 docker를 통해 aws ECS에 배포하는 것을 염두에 두고 있다(aws 비용을 대신 내주는 좋은 회사 ODKmedia로 오세요!). 다만, test를 위한 CI 연동은 github actions에 해놓았다. 정리하자면 다음과 같다.

- Typescript + express.js + mongoose
- jest + supertest
- mongodb
- Github actions

환경을 어떻게 구성할지 정하고 나서 다음과 같은 `최소한의 목표`를 정했다. 최소한의 목표는 `최소한으로 동작할 수 있는 정도`로 합의를 보았다.

- User: Signup, login, logout, 사용자의 글, 댓글 리스트 보여주기
- Post: 글의 목록, 각각의 글 조회하기, 글쓰기, 수정하기, 삭제하기
- Comment: 댓글 달기

### 2. 와이프는 TDD를 경험했다.

3일 동안 와이프는 신나게 TDD를 경험했다. 여태까지 테스트 코드를 많이 작성해보지 않고, 전부 처음 접하는 기술들이라 힘들었을 것 같다는 생각이 이제서야 든다. 중간중간 받았던 피드백에 의하면, 와이프를 힘들게 했던 것은 **왜 테스트 코드를 먼저 짜야 하는가?** 라는 생각이었다고 했다. 하지만 어쩌겠는가. 와이프는 계약조건에 따라 충실하게 TDD로 개발할 수밖에 없었다.

### 3. 나는 와이프를 대상으로 실험을 했다.

말 그대로 XP에 나온 실천방법 중 가장 실천하기 쉬운 두 가지 방법을 실험해 보았다. Pair programming과 TDD이다. 다만 pair programming은 내가 알고 있는 방법과 다른 방식으로 진행했다.

보통의 pair programming은 (잘못 알고 있는 것일 수도 있지만) navigator가 말만 하고, driver는 말을 하지 않고 코드만 작성하는 것으로 알고 있었다. 우리는 이렇게 하는 대신에 둘 다 쉴 새 없이 의견을 주고받고, 의문이 생기면 질문을 하는 등 계속해서 커뮤니케이션을 하기로 했다. 대신 코드는 오로지 와이프만 작성하는 것으로 룰을 정했다.

## 3. 어떻게 했는가

### 1. 일단은 개발환경

너무나 간단했다. 와이프가 늘 하던 것이었기 때문에 쉽게 project base가 세팅되었다. mongodb는 docker로 띄웠는데, 나중에 CI 세팅을 할 때 mongoDB Atlas에 cluster를 띄우고 보니 처음부터 mongodb Atlas를 사용했어도 괜찮았을 것 같다.

### 2. 테스트, 테스트, 테스트

일단 정석적인 방법대로 진행하였다. 먼저 합의한 최소한의 기능에 대응하는 endpoint를 설정하였다. Endpoint가 모두 결정되면 적당한 input과 output 등을 정한다. Input과 output이 결정되면, test case를 작성한다. 예를 들어, post에 대한 테스트는 다음과 같이 작성되었다.

1. 글의 목록, 각각의 글 조회하기, 글쓰기, 수정하기, 삭제하기에 대응하는 endpoint 만들기

   - `/posts`: GET | POST
   - `/posts/:id`: GET | PTACH | DELETE

2. Input과 output 정하고, test case 작성하기

```typescript
describe('PostService', () => {
  describe('GET /posts list(): Promise<Post[]>', () => {
    test('should return post list', async () => {
      // given
      // when
      const res = await request(app).get('/posts')
      // then
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual([])
    })
  })
  describe('POST /posts', () => {})
  describe('GET /posts/:id', () => {})
  describe('PATCH /posts/:id', () => {})
  describe('DELETE /posts/:id', () => {})
})
```

처음에는 모든 endpoint에 대한 case를 작성하고 구현에 들어갔는데, 테스트 결과에 생각보다 많은 noise가 발생했다. 그래서 나중에는 하나의 case를 작성하고, 그 case에 맞는 service code를 구현하는 식으로 진행하였다.

### 3. 테스트에 대한 테스트, 그리고 구현

테스트 코드를 작성하면 테스트 코드에 관한 토론도 잊지 않았다. 테스트 코드가 놓치고 있는 점은 무엇인지, 우리가 잘못 짜놓은 부분은 없는지, 테스트 자체가 잘못되지는 않았는지, 테스트가 endpoint에 대한 동작을 정확히 의도하고 있는지 등등. 보통 TDD를 하게 되면 미리 짜놓은 case가 통과할 때까지 코드를 작성하는 것이 일반적이기 때문에, 당연히 case가 잘못되면 잘못된 구현이 나온다. 그러므로, service code도 그렇지만 테스트 역시 꼼꼼하게 리뷰 했다.

서로가 case에 대해 합의를 하면 그때부터 구현을 시작했다. Case를 통과시키기만 하면 되었기 때문에 생각보다 어렵지 않았다. Service logic 중 분리가 가능한 부분들은 다시 TDD를 하는 방법으로 별도의 util로 나누었다. 특히 결과에 대한 검증은 case의 통과 여부에 맡기고 오로지 logic의 효율 자체에만 집중할 수 있어서 괜찮았다고 생각한다.

## 4. 무엇을 깨닫게 되었는가

이 항목은 철저하게 개인적인 경험과 감정이기 때문에 당연히 진리가 아니다. 그러므로, 아래의 내용이 이해가 가지 않을 수도 있고 공감하지 못할 수도 있을 것 같다. 대신 무언가 비슷한 경험을 한 사람이 있었다면, 혹은 비슷한 문제를 겪은 사람이 있었다면 좋은 참고가 될 수도 있다고 생각이 든다.

### 1. 지식 영역의 차이를 이해해야 한다.

최근의 개발이라는 영역은 점점 복잡해지고 세분되고 있기 때문에 한 사람이 모든 지식을 습득할 수는 없다. 이 때문에 서로가 알고 있는 지식의 영역이 완벽하게 같을 수는 없는 것 같다. Pair programming을 할 때 이 점을 특히 명심해야 하는 부분이라고 생각한다. 누군가는 처음 경험하는 영역일 수도 있고, 누군가는 알고 있다고 해도 정확하지 않을 수 있으며, 누군가는 자신의 지식을 바탕으로 현상을 이해하려고 할 것이다.

그러므로, 절대 남이 이해를 하지 못한다고 해서 부정적인 모습을 보이거나 피드백을 주면 절대로 함께 할 수 없다고 생각한다. 내가 남보다 더 많이 알고 있다고 해서 `가르치는`것이 아니라 **의견을 개진**하고 자연스러운 협업을 이끌어 내야 하기 때문이다. 반대로, 내가 모르는 영역에 대해서 다른 사람이 가이드를 한다고 `가르친다`라고 생각하면 안 될 것 같다. 물론 그 사람의 말투가 문제라면 어쩔 수 없지만, 그럼에도 불구하고 기본적으로 `의견을 말하고 있다`라고 생각해야 한다.

만약 서로 잘 아는 분야에 대해서 의견이 엇갈린다면? 더할 나위 없는 기회라고 생각한다. 치열하게 토론하고 열정적으로 의견을 내다 보면 정말 좋은 결과가 나온다. 와이프와의 pair programming 뿐만 아니라, 얼마 전 내가 팀원들과 직접 겪은 경험이기도 하다.

### 2. 특정 신호(signal)가 있으면 좋다.

Pair programming을 하다 보면 잠시 멈추어야 할 때가 온다. 생리현상을 해결하거나, 정리할 시간이 필요하거나 등등. 하지만 감정적으로 미묘해졌을 때에도 pair programming을 멈추어야 한다. 그 상태로 계속된다면 결국 감정이 터지게 될 테니까 말이다.

우리는 하나의 규칙을 정했는데, '잠깐 멈춰봐'라는 단어 대신 볼펜을 들어 올리는 것이다. 이게 개인적으로는 굉장히 효과가 있었는데, 내가 내 의견을 열정적으로 이야기하고 있을때, 와이프가 볼펜을 들어올리면 즉시 입을 다물게 되었다. 그럼에도 전혀 기분이 나쁘지 않았다. 만약에 '잠깐 쉬었다 하자'라고 했으면 약간 김이 빠졌을지도 모르겠지만, 이러한 신호는 나쁘지 않게 느껴졌다. 말 그대로 빨간불을 보고 멈춰선 느낌이었다.

이러한 신호를 통해 적당히 서로가 원하는 타이밍에 휴식을 취하거나 정리를 할 수 있었고, 덕분에 효율이 더 높았던 것 같다. 때로는 감정적으로 위험신호를 보내는 역할도 했고 말이다.

### 3. 피드백을 자주 교환하면 좋다.

3일간 진행하면서 정기적으로는 6번(식사 시간마다), 비정기적으로는 수시로 피드백을 주고받았다. 그때마다 서로의 커뮤니케이션 방식, 코드 작성 방식, 사소하게는 앉는 위치와 목소리 톤까지 조절했다. 정말 중요한 부분이라고 생각하는데, 결국 pair programming으로 부터 지속해서 효율성과 생산성을 얻어내려면 서로의 감정 상태가 중요하기 때문이다.

상대방이 말하는 방식이 공격적으로 느껴진다거나, 너무 가까이 앉아서 타이핑이 불편하다거나 한다면 pair programming 자체가 짜증 나게 느껴질 수도 있다. 그때부터 효율이 급격하게 떨어지기 시작하며, 지속된다면 pair programming에 대해 나쁜 경험과 감정만 남는 것 같다. 다만 나의 감정을 확실하게 상대에게 전하지 않는다면 상대는 끝까지 모를 것이기 때문에, 생산적인 관계를 위해서라도 피드백은 자주 주고받는 것이 좋다.

서로의 방식에 대해 칭찬해주는 것도 중요하다고 생각한다. 이번 3일간 칭찬을 동해 상대방이 자신감을 얻고 생산성이 더욱 향상되는 것을 경험하였다. 물론, 와이프가 칭찬에 약한 탓도 어느 정도는 있겠지만 말이다.

하나 기억해야 할 것은, 피드백을 주고받을 때 **솔직하게, 하지만 예의 있게** 해야 한다는 것이다. 너무나 당연한 말인데, *무례함을 솔직함이라고 생각하는 사람*이 생각보다 많은 것 같다. 절대로 무례함과 솔직함은 동치관계가 될 수 없다. 그러므로, 솔직하게 말하되 표현을 좀 더 부드럽게 하는 것이 도움이 된다.

### 4. 결국, 경험한 후의 느낌이 중요하다.

Pair programming을 했는데, 혼자 했을 때보다 결과물이 좋지 않다면? TDD로 개발했는데 실제로 내가 겪고 있는 문제를 해결하지 못했다면? 과연 그렇다면 지속적으로 pair programming과 TDD에 관심을 갖게 될까?

항상 그렇지만, 무언가를 시도하는 것은 현재 겪고 있는 문제를 해결하기 위해서여야 한다. 아무런 문제가 없다고 느끼는 사람에게 어느 날 갑자기 TDD로 개발해보자고 하면, 받아들이지 않을 것이 뻔하다. 그러므로 항상 `실천방법`들을 시도할 때에는 상대방이 이 방법으로 문제를 해결했다는 느낌이 들게 하는 것이 중요하다고 느꼈다.

그것과 더불어, 이러한 경험 자체의 느낌이 좋아야 하는 것은 당연하다. 불쾌한 것을 다시 겪고싶어 하는 사람은 없기 때문이다.

### 5. 할만한 상황에서의 TDD는 정말 효율적이다.

반신반의하고 있었지만, 할만한 상황에서의 TDD는 더는 의심하지 않기로 했다. TDD의 장점에 대해서는 구글에 많은 글이 있으니 구태여 설명하지 않겠지만, 옆에서 TDD의 효율성을 잘 느낄 수 있었다. 물론 모든 상황에서 TDD를 할 수는 없겠지만, 거꾸로 가능한 모든 상황에서는 앞으로 TDD를 할 것 같다.

## 5. Conclusion

연휴의 3일을 포기한 대가치고는 굉장히 만족스러웠다. 물론 목표한 모든 기능을 구현하지 못한 것은 아쉽지만, 느낀 점이 있었으니 다행이라고 생각한다.

무엇보다 와이프의 피드백이 괜찮았다. 원래 목표였던 RESTful API가 무엇인지 감을 잡을 수 있게 되었고, 더불어 테스트 코드를 작성하는 방법과 TDD라는 방법론을 알게 되어 기쁘다고 하였다. 회사에서 적극적으로 해볼 생각이라고 하는데, 두고 보면 알 수있을 것 같다. 나 역시 테스트 코드를 중요하게 생각하는 동지가 늘어나서 즐거운 경험이었다.

원래 목적도 충분히 달성한 것 같다. 나 스스로가 좋은 경험을 했으니, 조금씩 작은 변화를 일으켜 간다면 팀에도 좋은 영향을 줄 수있을 거라는 생각이 든다.

위에 쓰여있는 익스트림 프로그래밍이라는 책에 `아기 발걸음`이라는 개념이 설명되어있다. 변화는 조금씩 일으켜야 비용이 적게 발생한다는 뜻이다. 조금 성급한 결론이기는 하지만, 어느 정도의 효과가 증명되었으니 팀에 '아기 발걸음' 일으켜 볼까 생각 중이다.
