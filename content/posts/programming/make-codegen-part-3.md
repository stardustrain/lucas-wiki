---
title: Code generator 개발기 (Part 3)
description: Code generator를
keywords: []
url: https://wiki.lucashan.space/programming/make-codegen-part-3/
date: 2023-06-09
tags: [Programming, '2023']
image: https://pbs.twimg.com/profile_images/540333799557439489/-s9uoLIN_400x400.png
---

[록 피드백]

- 1, 2를 적당히 합칠것.
- 만들면서, 사용하면서 어려웠던 점 추가.

[홍시 피드백]

- part 2, 3을 합치면 어떨까.

[융디 피드백]

- 인트가 만든 자동 스키마 업데이트 PR 생성기를 소개하면 어떨까

## 1. 어떻게 만들었나?

- 사내 오픈소스 같은 느낌으로 만들었음.
- 모든 기능요청/논의는 github discussions + issue 사용.
  - issue 생성시 jira ticket 자동 생성
- 때로는 팀원들의 기여를 직접 받음.
- release-please를 이용해 배포, 태깅 자동화
- typedoc을 이용한 문서화
  - 사실 잘 안됨...

## 2. 어떻게 사용하게 만들었나?

- 처음에는 소속된 셀에서만 사용하며 문제점을 찾고, 기능을 추가함
- 어느 순간 다른 셀에서 사용하게 되었고, 해당 셀의 상황과 의견을 전달받고 기능 추가, 수정
- 큰 기능 추가, 흥미로운 업데이트가 있을 때 마다 매주 있는 기술 공유 자리에서 공유
- 사용하라고 강요하지 않고 호기심을 갖게 만들었으며, 꾸준히 유지보수 했음
  - 슬랙 채널을 이용한 릴리즈 공지
- 직접 기여를 유도하여 함께 만들고 있다는 생각이 들게끔 함

## 3. 일하는 방식이 어떻게 달라졌는가

- BE, FE가 인터페이스 합의
- BE가 controller에 해당 인터페이스를 Swagger로 선언, dev push
- FE는 code generator 실행, 만들어진 결과물로부터 msw mock file 생성
- BE, FE 병렬 개발

이렇게 했더니, API 완성 후 FE-BE 통합시 API 자체로 인해 발생하는 문제는 거의 발생하지 않음.

## 4. 얻은 것과 잃은 것

- 얻은 것
  - IoC의 개념, OOP, 디자인패턴 등 책에서 공부한것을 실제로 사용해 봄
  - 막연하게만 알고 있던 OAS와 JSON Schema에 대해 잘 알게 됨
  - 최초의 도전 목표 달성
  - Open source를 운영하는 듯한 경험
- 잃은 것
  - 저녁있는 삶
  - 수명

## 5. 결론

- 이야 좋다
