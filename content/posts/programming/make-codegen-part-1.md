---
title: Code generator 개발기 (Part 1)
description: Code generator를
keywords: []
url: https://wiki.lucashan.space/programming/make-codegen-part-1/
date: 2023-06-09
tags: [Programming, '2023']
image: https://pbs.twimg.com/profile_images/540333799557439489/-s9uoLIN_400x400.png
---

## 1. RESTFul API를 다시 마주하다.

- Interface, URL 관리, 요청 로직 등 수동 관리 포인트가 증가함
  - 이는 반드시 레거시가 됨

### 1-1. FE 개발자간의 문제?

- 수동관리를 해야한다는 것은 셀마다, 사람마다 관리 방법에 대한 생각과 방법이 상이할 수 있다는 것.
  - 이를 위해서는 좁게는 셀원끼리, 넓게는 팀원들끼리 합의가 필요한 상황
  - 논의 자체가 나쁜것은 아니지만, 소모적이고 정답이 없음.
  - 특히 자동화 도구가 있다면 불필요한 논의. -> 이에 대한 처리를 자동으로 할 수 있다면 더 높은 차원의 논의에 집중할 시간이 늘어남.

### 1-2. FE - BE 개발자간의 문제?

- Swagger가 있다고는 하지만, 결국 사람이 소통을 해야하는 만큼 구현과 문서의 차이가 발생할 수 밖에 없음

## 2. 모색했던 해결책

- gRpc
- GraphQL
- Client side GraphQL

## 3. 커뮤니티에서 힌트를 얻다.

- GraphQL 생태계의 code generator
- OpenAPI Specification에도 동일한 역할을 하는 라이브러리가 있다는 것을 알게 됨
  - 최초 해당 라이브러리 도입 시도

## 4. 바퀴를 다시 만들다.

- 개인적으로 바퀴를 재발명하는 것은 상당히 지양하는 편
- 하지만, OAS codegen을 사용했을때의 산출물이 썩 마음에 들지 않았음.
  - Verbose한 generation 결과
  - template을 관리해야하는 번거로움
  - 분명히 인프랩만의 요구사항이 등장할 것으로 예상함 -> 3rd party library이기 때문에 대응이 어려움
- 이전의 사용 경험이 좋았기 때문에, GraphQL code generator의 결과물과 동일한 형태가 좋을 것이라 생각.
  - 이에, 한번 만들어 보자는 생각을 하게 되었음.

## 5. 목표

- File 혹은 network 요청을 통해 OAS json을 직접 parsing하여 원하는 형태의 file로 만들 수 있어야 한다.
- FE 개발자가 BE API의 schema 변화에 최대한 번잡하지 않게 대응할 수 있어야 한다.
- FE 개발자가 원하는 API를 선택할 수 있어야 한다. -> 필터링 기능
- BE에서 선언한 response를 JSON validator를 통해 검증할 수 있는 typeguard가 자동으로 생성되어야 한다.
- BE 개발자는 FE의 번거로움을 생각하지 않고 API를 생산할 수 있어야 한다.
- BE 개발자가 선언한 Swagger 선언과 실제 API response의 형태가 일치하는지 integration test에서 검증할 수 있어야 한다.
  - Elixir의 doc test 개념 차용
