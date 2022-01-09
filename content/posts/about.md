---
title: Introduce Keuntaek Lucas Han
description: 글을 작성하는 본인과 wiki에 대한 설명입니다.
url: https://wiki.lucashan.space/about/
disableDisqus: true
---

## Introduce

저는 `___` 을 고민하는 엔지니어입니다.

1. 단단한 코드를 쓰는 것
2. 자동화를 통해 생산성을 향상하는 것
3. 시스템, 업무 프로세스의 blocker를 적극적으로 찾고, 이를 개선하는 것
4. 동료들과 함께 주어진 목표를 달성하고, 함께 성장할 수 있는 방법을 찾는 것
5. 회사가 추구하는 가치와 목표에 정렬하여 기여하는 것

## Contact information

- Email. **lucas.han.public@gmail.com**
- Blog. [https://wiki.lucashan.space/](https://wiki.lucashan.space/)
- GitHub. [https://github.com/stardustrain](https://github.com/stardustrain)
- LinkedIn. [profile](https://www.linkedin.com/in/lucas-keun-taek-han-443b08120/)

## Work experience

### Watcha Inc.

_Frontend Engineer_

_2022.01 - 현재_

### Codestates

_Software Engineer_

_2021.07 - 2022.01_

- Learning Management System admin 개발
  - 기존의 legacy admin을 대체하는 새로운 admin 개발

### ODK Media

_Tech Lead_

_2021.01 - 2021.07_

- ODK(한국), ODC(중국), ODL(라틴)의 통합 플랫폼인 ODX의 frontend 관련 프로젝트 (ODX player, design system, ODX GraphQL) 관리
  - 일정 관리 및 제품 스펙 개발의 우선순위 정리
  - 다른 팀과의 커뮤니케이션 포인트 역할

_Frontend Engineer_

_2019.04 - 2021.07_

- [ondemandkorea](https://www.ondemandkorea.com/)
  - Django template과 Vue.js로 만들어져있는 기존의 legacy code를 Next.js로 개선 (진행 중)
- [ondemandchina](https://www.ondemandchina.com/en)
  - Wordpress로 되어있는 기존의 서비스를 React로 개선
  - 접근성과 semantic을 고려한 markup으로 lighthouse 기준 접근성, SEO의 평균 점수 향상 (48점 → 93점)
  - 프로젝트에 unit test를 도입 (Coverage 0% → 85%)
- [ondemandlatino](https://www.ondemandlatino.com/en)
  - Next.js와 vercel cloud를 이용해 SSG, ISR의 이점을 누릴 수 있는 형태로 개발
  - ondemandchina 대비 lighthouse 퍼포먼스 점수 향상 (47점 → 78점)
- 늘어나는 서비스에 대응함과 동시에, 유지보수가 불가능한 기존의 admin을 대체하는 새로운 admin 개발
  - PHP로 되어있는 기존의 admin을 React로 재개발
  - 각 서비스 (ODC, ODK, ODL, Video, Payment) admin에서 사용할 common component 작성
  - 각 운영팀에서 필요로 하는 기능 추가 및 사용성 개선
- Frontend팀에서 사용하기 위한 design system에 기여
  - W3C 가이드를 기준으로 접근성 개선
  - CSS bundling 문제를 최소화하기 위해 emotion 도입
  - 각 서비스 (ODC, ODL)에 적용하여 중복 코드를 줄이고 동일한 기능 제공 보장
- Declarative data fetching과 strict type checking, backend팀과의 명확한 의사소통을 위해 [GraphQL 도입](https://wiki.lucashan.space/programming/introduce-a-graphql-to-odc/)
  - Query를 통해 component에서 필요한 데이터를 명확히 선언하여 수동으로 관리하던 API 관련 type 선언 자동화
    - Query, mutation에 대한 type을 자동 생성할 수 있도록 변경
    - Component에서 필요한 props를 자동 생성된 type으로 강제하여 기존보다 향상된 strict type checking 제공
  - Client에서 API 호출 빈도, data를 handling 하는 로직 복잡도 감소
    - 기존의 REST API를 GraphQL server로 wrapping
    - 여러 API를 호출해서 하나의 data를 만드는 로직을 GraphQL server로 위임하고, 완성된 data를 caching 하여 client에 제공
  - Backend 팀과 정리된 schema를 기준으로 의사소통
    - [graphql-voyager](https://github.com/APIs-guru/graphql-voyager)를 통해 schema의 상관관계를 시각화
    - Client에서 실제로 API가 사용되는 형태를 backend팀에서 쉽게 확인할 수 있게 함
- TBD([Trunk Based Development](https://trunkbaseddevelopment.com/))를 위해 cypress 도입 (진행 중)
  - Cypress를 통해 e2e 테스트 시나리오 실행
  - CI/CD step에 e2e 테스트를 포함하여 pull request마다 자동으로 코드의 이상 유무를 파악할 수 있게 설정
  - GitHub Actions를 통해 주기적으로 e2e 테스트가 실행되도록 하고, 테스트 실패 시 slack 채널에 message를 보내도록 설정
- 새로 합류하는 팀원들을 위한 코드 컨벤션 가이드 및 협업 가이드(배포, 코드 리뷰, 온보딩) 작성

### Ground X

카카오의 블록체인 플랫폼인 Klaytn을 만들고 연구하는 회사.

_Frontend Engineer_

_2018.11 - 2019.03_

- [Klaytnscope](https://scope.klaytn.com/)
  - Klaytn node의 전반적인 상태 (block explore, transaction, contract verify)를 확인할 수 있는 모니터링 서비스 개발
    - React, redux, redux-saga를 이용해 프로젝트의 base code 작성
    - Frontend cell을 대상으로 Git branch 전략, 코드 컨벤션 가이드 작성 및 전파
  - CI/CD 구축
- 서비스 구축에 필요한 frontend boilerplate 작성

### Streami inc.

암호화폐 거래소인 GOPAX를 서비스하는 스타트업.

_Frontend Engineer_

_2017.02 - 2018.10_

- 암호화폐 거래소([GOPAX](https://www.gopax.co.kr/)) 및 암호화폐 커뮤니티(Cryptopic), 암호화폐 보관 서비스(DASK) frontend 개발
  - 거래소의 멤버쉽, 자산 관련 페이지를 주로 담당
  - 프로젝트에 unit test를 도입하여 프로젝트 안정성 향상 (Coverage 75%)
- TypeScript 도입
  - Component의 역할과 주고 받는 데이터의 형태를 정의하기 위해서 TypeScript 도입을 제안.
  - 새로운 프로젝트 (DASK)에 TypeScript 적용 후 팀내 전파.

### Kakaogames

_Information security_

_2016.05 - 2016.08_

- 인프라 보안
  - 간단한 AWS instance 점검 자동화 서비스 개발

### Wemade

_Information security_

_2015.04 - 2016.04_

- 관제 / 침해사고 대응 및 방화벽 운영
  - IDS, F/W, WAF의 rule set 설정
  - 네트워크 패킷 분석 및 침해사고 대응

---

## Skills

- Frontend
  - JavaScript, TypeScript, React, Next.js, HTML/CSS
- Backend
  - Node.js, python, Express.js, GraphQL, AWS

---

## Side project

### Indistreet

인디 뮤지션들의 공연, 정보, 발매한 앨범 정보를 볼 수 있는 서비스.

_Frontend Engineer_

_2021 - 현재_

- [https://indistreet.com](https://indistreet.com/en)
  - 4명이 한 팀이 되어 작업하고 있으며, 주로 frontend 개발을 통한 UI/UX 개선을 담당

---

## Etc

_2020 - 현재_

- [프론트엔드 개발을 위한 자바스크립트 온라인 스터디](https://programmers.co.kr/learn/courses/11938) - 코드 리뷰어로 참여

---

## Education

_2006 - 2014_

인하대학교 언론정보학과
