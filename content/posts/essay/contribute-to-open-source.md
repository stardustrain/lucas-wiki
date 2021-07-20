---
title: 처음으로 오픈소스에 기여해 본 이야기
description: 처음으로 오픈소스 프로젝트에 기여해 본 경험을 공유합니다.
date: 2021-07-20
tags: [Essay, '2021']
---

정말 우연한 계기였다. 평소 막연하게 *오픈소스 해야지*라는 생각이 있었지만, 말 그대로 막연한 생각이라 실천에 옮기지 못하고 있었다.

오픈소스에 기여한 경험을 적어놓은 수많은 글을 보면, 보통 오탈자를 찾아 수정하기 혹은 쉬운 이슈부터 골라서 처리해보기 같은 방법들을 이야기하고 있다. 하지만 애초에 문서를 꼼꼼히 읽지 않고 훑어보는 습관~~Typoglycemia 만세!~~이 있어서 오탈자를 찾는 것이 쉽지도 않았고, 단지 오탈자를 찾기 위해 문서를 꼼꼼히 읽어보는 것도 이상하다는 생각이 들었다. 유명한 라이브러리들의 "쉬운 이슈" 역시 생각보다 경쟁자(?)들이 많아 괜한 시간을 쓰는 게 아닌가 하는 불안감이 들기도 했다.

여러 가지 핑계를 대기는 했지만 `내가 오픈소스에 기여해도 괜찮은 걸까?`라는 생각이 제일 크게 작용했던 것 같다. 많은 사람이 쓰게 될 코드가 될 테니 완벽해야 하고, 버그도 없어야 하며, 모든 사람의 문제를 해결해줄 거창한 수정이어야 할 것만 같았다. 특히 내 코드를 오픈소스에 병합한다는 상상 자체를 감히 하지 못했다고 말하는 게 더 정확할 것 같다. 하지만 이번 경험을 통해 그 생각이 틀렸다는 것을 깨닫게 되었다.

이 경험을 짧게나마 공유하여 지금 글을 쓰는 나 같은 평범한 개발자도 오픈소스에 기여할 수 있음을, 나아가 아직 망설이고 있는 개발자들이 있다면 기여하는 것이 그리 어렵지 않음을 말하고 싶다.

## 일부러 기여하려고 한 것은 아니었다

사실 처음부터 작정하고 기여하려고 한 것은 아니었다. 오히려 시작은 매우 사소했는데, 우연히 [graphqurl](https://github.com/hasura/graphqurl)이라는 CLI tool을 알게 되어 사용해본 것이 그 시작이었다. [Hasura](https://hasura.io/)에서 만든 `graphqurl`은 CLI에서 GraphQL query를 작성하고 요청할 수 있게 도와주는 도구로, introspection query를 통한 자동완성도 지원하고 query에 대한 결과도 확인할 수 있다(물론 같은 팀의 [동료](https://future-seller.dev/)는 굳이 GraphQL 요청을 CLI에서 할 필요가 있냐고 뼈를 때리긴 했지만).

<center>
  <figure>
    <img src="https://github.com/hasura/graphqurl/blob/main/assets/subscription.gif?raw=true" alt="using graphqurl gif">
    <figcaption style="font-size: 14px;">
      - 아주아주 재미있는 라이브러리이다. 출처: <a href="https://github.com/hasura/graphqurl" rel="noopener noreferrer" target="_blank">graphqurl GitHub</a>
    </figcaption>
  </figure>
</center>

이 도구를 토이 프로젝트로 만들고 있던 GraphQL 서버에 사용해보았는데 introspection query를 요청하는 과정에서 예상하지 못한 에러가 발생했다.

<center>
  <img src="https://user-images.githubusercontent.com/9318449/122355879-3adf8e80-cf8d-11eb-9acf-d2868c00ca5b.png" alt="graphqurl request fail" width="100%" >
</center>

혹시나 하여 GitHub API의 GraphQL endpoint로 요청을 보내보았는데, 이 요청은 정상적으로 매우 잘 처리되는 것이 아닌가? 이렇게 되니 당연하게도 내가 작성한 서버의 코드를 의심할 수밖에 없었다. 서버는 [fastify](https://www.fastify.io/)와 [mercurius](https://github.com/mercurius-js/mercurius)를 사용하고 있었는데 아무리 문서를 읽어보아도 딱히 잘못한 부분을 발견해내지 못했다.

사실 서버와 함께 만들고 있는 client에서의 요청은 graphqurl의 요청과는 다르게 정상적으로 처리되고 있었기 때문에 "에이 이상하네."하고 말았으면 끝났을 문제인 것은 확실했다. 하지만 마음 한편의 찜찜함이 가시지 않았고 결국 이 문제를 해결하기로 마음먹었다.

## 믿고 싶은 모든 것을 의심하라

처음에는 내가 작성한 서버의 코드를 면밀히 들여다보았다. 혹시 오류는 없는가, 잘못 설정한 부분은 없는가, 요청을 처리하는데 빠진 부분은 있는가. 하지만 위에도 쓰여있듯 함께 만들고 있는 client에서의 요청은 잘 처리되고 있으니 정말 답답한 노릇이었다. 그렇게 한 시간가량을 헤맸을 무렵 의외의 사실을 발견하였다. 바로 graphqurl에서 보내는 요청의 content-type이 `text/plain;chaset=UTF-8`로 설정되어 있는 것. 혹시나 하는 마음에 아래와 같은 ~~말도 안 되는~~ 코드를 넣어보았다.

```ts
fastify.addContentTypeParser('text/plain', { parseAs: 'string' }, function (req, body, done) {
  try {
    const json = JSON.parse(body)
    done(null, json)
  } catch (err) {
    err.statusCode = 400
    done(err, undefined)
  }
})
```

이 설정을 추가하자 graphqurl의 요청이 너무나 잘 처리되었다. 문제의 원인은, content-type이 `text/plain`으로 되어있어 body에 담겨있는 JSON string이 제대로 parsing되지 않았던 탓이었다. 더 정확히는, graphqurl이 요청을 보낼 때 content-type을 [특별히 헤더에 명시하고 있지 않은 것](https://github.com/hasura/graphqurl/blob/0ea787f9371a4f8f01b390d80a5fd522c8d9b381/src/client.js#L44)이 원인이었다.

이때 순간적으로 큰 혼란에 빠졌는데, 어느 쪽이 잘못 만들어진 것인지 분간이 되지 않았다. 일단 요청하는 리소스의 MIME type이 JSON이기 때문에 content-type 헤더가 `text/plain`인 것은 분명히 문제가 있어 보였다. 하지만 GitHub API는 이런 graphqurl의 요청을 문제없이 처리하고 있었기 때문에, 작성하고 있는 서버에 위와 같은 parsing logic을 추가해야 하는지 판단이 되지 않았다.

Apollo client와 Relay 같은 GraphQL client를 제공하는 다른 라이브러리들의 코드나 사용예시 등을 많이 찾아보았는데, Relay의 경우 content-type 헤더를 `application/json`으로 [명시하라는 예시](https://relay.dev/docs/getting-started/step-by-step-guide/#22-a-fetchgraphql-helper)가 있었고, Apollo client 역시 기본적으로 헤더의 content-type에 `application/json`을 [설정하는 것으로 보여](https://github.com/apollographql/apollo-client/blob/ae0df479dcaefba3966739e2efe9036936b6b670/src/link/http/selectHttpOptionsAndBody.ts#L87) graphqurl의 문제라고 생각하게 되었다.

**처음으로, 막연하게 완벽할 거라 생각했던 오픈소스를 의심하게 되었다.**

### 조심스레 한 발짝씩

일단 graphqurl의 문제라고 생각하게 되었지만, 여전히 고민은 이어졌다. 만약 나만 문제라고 생각하는 거라면? 혹시 maintainer의 생각과 다르다면? 하지만 이 고민은 그렇게 길어지지 않았는데, 가장 간단한 방법인 **물어보는** 방법을 선택했기 때문이다. graphqurl의 repository로 가서 [이슈를 통해 현재 상황을 설명하고 maintainer의 의견을 물어보았다](https://github.com/hasura/graphqurl/issues/97).

<center>
  <figure>
    <img src="https://user-images.githubusercontent.com/9318449/126066167-19853381-068b-41e9-b8a8-9c92ded63651.png" alt="Question for graphqurl" width="100%">
    <figcaption style="font-size: 14px">
      - 번역체처럼 느껴진다는건 번역이 되었다는 뜻입니다. 그것이 구글 번역기니까.
    </figcaption>
  </figure>
</center>

Maintainer에게 의견을 물어볼 때 무례하다고 느껴지지 않게끔 노력했다. 먼저 graphqurl을 만든 것에 대한 감사를 표시하고 현재 상황을 자세하게 설명한 다음, 만약 라이브러리의 문제가 맞지만, 우선순위가 높지 않다면 내가 해결해도 되겠냐고 물어보았다. 이슈를 생성하고 내일쯤 다시 확인해 보려고 했는데, 생각보다 빠르고 쿨하게 maintainer가 답을 해주었다.

![Reply from maintainer](https://user-images.githubusercontent.com/9318449/126068183-ffbf3ab3-5705-485e-8466-ba4a242a2126.png)

> 네 말대로 content-type 헤더를 추가하면 몇몇 서버에게는 유용할 수 있겠네?

사실 많이 긴장하고 있었는데 `Feel free` 하게 pull request를 만들어달라는 말에 용기를 얻었다 ~~솔직히 "-H flag를 사용해!"라고 할 줄 알았다~~. 이미 그 전에 repository를 fork 하여 어느 정도 코드를 파악하고 있었기 때문에 빠르게 코드를 수정하여 [pull request](https://github.com/hasura/graphqurl/pull/98)를 만들었다. 엄청난 변경은 아니고, 단지 헤더에 사용자가 지정한 content-type이 없다면 `appliction/json`을 추가하는 단순한 수정이었다.

### 기다림의 미학

이슈와는 다르게 pull request에는 바로 답이 달리지 않았다. 일주일 정도 지났을 때 "내 pull request는 확인한 거야?"라고 물어보고 싶었지만, [아웃사이더님의 발표](https://blog.outsider.ne.kr/1517)를 예전에 사내 세미나로 들었던 기억이 떠올라 참을성 있게 기다렸다. Maintainer도 결국 개발자고 사람이니까 바쁘거나 사정이 있을 수도 있겠다 싶어 귀찮게 만들지 않았다. 물론 그것과는 별개로 매일 pull request에 답변이 달렸나 체크하기는 했지만. 그리고 *언젠가는 확인하겠지*라는 생각에 더는 pull request를 체크하지 않게 되었을 무렵 maintainer가 pull request를 merge 했다는 알람을 받았다.

![Pull request merged](https://user-images.githubusercontent.com/9318449/126069018-5933f00d-b50b-48ee-a309-7d3488378463.png)

이렇게 개발을 시작한 지 4년 만에 처음으로 오픈소스에 기여할 수 있게 되었다. 남들에게는 평범한 일상일 수는 있지만, 나에게는 너무나 짜릿한 첫 경험이었다. 이날 기분이 너무 좋아서 SNS에도 공유했는데 생각보다 많은 분들이 축하해주셔서 기분이 더 좋았다 ~~혹시 흑역사로 남으려나~~.

## 혹시 아직 망설이고 있다면

평범한 개발자가 오픈소스에 기여한 대단할 것도 없는 이야기를 늘어놓아 보았다. 여기까지 읽어보았다면 눈치챘겠지만, **사실 그렇게 엄청나게 어려운 일이 아니다**. 아주 작은 기여였지만, 오픈소스를 만드는 개발자 역시 사람인지라 실수도하고 개발하는 도중에 생각하지 못한 부분이 있을 수도 있다는 생각이 들었고, 그렇게 maintainer가 빠트린 부분을 채우는 것이 `기여`라고 느꼈다. 그리고 `기여`의 형태는 오탈자 수정부터 아키텍처의 변경까지 maintainer가 *미처 챙기지 못했던 모든 부분*이라고 느꼈다.

마지막으로 이번에 작게나마 pull request를 만들면서 스스로 했던 생각들을 공유하면 좋을 것 같다.

### 무례하지 않게 maintainer 대하기

조금 지난 소식이지만, Babel 프로젝트가 자금난을 겪고 있다는 (내 입장에서는) [충격적인 소식](https://www.theregister.com/2021/05/12/babel_money_woes/)을 들은 적이 있다. Babel 프로젝트는 JavaScript 진영에서는 큰 편에 속하는 것으로 알고 있는데, 이 프로젝트가 자금난을 겪을 정도라면 큰 회사에서 후원을 받지 않는 다른 프로젝트들 역시 비슷한 상황일 거라는 생각이 들었다. [아웃사이더님의 발표](https://blog.outsider.ne.kr/1517)에서 들은 것처럼, 생각보다 오픈소스의 maintainer들이 큰 보수를 받는 것은 아니었다.

그렇기 때문에, 돈을 받고 하는 일도 아니고(물론 회사에서 돈을 받으며 오픈소스를 개발하는 것이라면 이야기가 다르지만) maintainer가 단지 좋아서 하는 일인데 무례하게 하거나 귀찮게 만들어서 그들의 짜증을 유발할 필요는 없다고 보았다. 그래서 나의 경우, 위에도 쓰여 있듯 maintainer에게 감사를 표시하고, 최대한 무례하지 않게 의견을 구했다. Pull request를 만들고 난 이후 약 20일 정도 응답이 없었지만, 확인 요청도 하지 않았다. 물론 꼭 이렇게 해야 한다는 말은 아니다.

최근 한 커뮤니티에서 [굉장한 논쟁을 불러일으켰던 글](https://kdy1.github.io/post/dev/oss/i-hate-i-love-oss/) 인데, 결론부터 말하자면 난 이분의 생각에 매우 동의한다(또한 이분은 정말 대단하다고 생각한다). 어쩌다가 이 글의 내용이 곡해되어 퍼져나갔는지는 모르겠지만 각설하고, 오픈소스 프로젝트에 기부하거나 코드에 기여하지 않더라도 적어도 maintainer가 힘이 빠질 만한 일은 하지 않는 게 좋다고 본다. 몇 번이고 반복하지만, 그들도 개발자이고 개발자이기 전에 사람이다.

### 굳이 기여하려고 애쓸 필요는 없는 것 같다

반드시 오픈소스에 기여해야만 좋은 개발자인 것도 아니고, 오픈소스에 기여하는 모든 개발자가 전부 좋은 개발자라는 생각도 하지 않는다. 언제부터인가 오픈소스에 기여한 경험이 마치 좋은 개발자의 필수조건인 것처럼 여겨지는데, 이것 때문에 쓸데없는 부담을 갖는 것을 주변에서 많이 보았다. 물론 내 주변만 그런 것일 수도 있겠지만. 아무튼 굳이 오픈소스에 기여하려고 애쓸 필요는 없다고 생각한다. 필요에 의해서, 자연스럽게 기여하는게 스스로에게 동기 부여도 되고 [Hacktoberfest spam PR 논란](https://www.theregister.com/2020/10/01/digitalocean_hacktoberfest_pull_request_spam/) 같은 일도 줄어들 것 같다.

### 그럼에도, 기회가 된다면 꼭 기여해보자

하지만 **기회가 된다면 꼭 기여**해보면 어떨까? 조금 거창하게 말하자면 스스로 발견한 오픈소스의 작은 버그를 수정함으로써, 누군가는 상당한 시간을 절약할 수 있을 것이고 또 누군가는 불필요한 디버깅과정을 겪지 않아도 될지 모른다.

겨우 작은 pull request 하나를 가지고 이렇게 생색을 내는 글을 쓰는 거냐고 생각할 수도 있을 것 같다. 하지만 그 작은 pull request가 merge 되었을 때의 짜릿한 감정을 공유하고 싶었고, 앞으로 기회가 될 때마다 오픈소스에 기여하겠다는 스스로의 다짐을 위해 글을 썼다고 생각해주시면 감사할 것 같다.

**기회가 된다면 오픈소스에 꼭 기여해 보는 게 어떨까?**

---

#### 참고

- [나는 어떻게 오픈소스 커뮤니티를 통해 성장했나](https://blog.cometkim.kr/posts/mattermost-contribution/how-i-grow-up-with-mattermost-community/)
- [오픈소스를 좋아한다는 말에 대한 생각](https://kdy1.github.io/post/dev/oss/i-hate-i-love-oss/)
- [오픈소스 뒤에 메인테이너 있어요](https://blog.outsider.ne.kr/1517)
