---
title: Code generator 개발기 (Part 2)
description: Code generator를
keywords: []
url: https://wiki.lucashan.space/programming/make-codegen-part-2/
date: 2023-06-09
tags: [Programming, '2023']
image: https://pbs.twimg.com/profile_images/540333799557439489/-s9uoLIN_400x400.png
---

## 1. 목표와 필요한 기능

- File 혹은 network 요청을 통해 OAS json을 직접 parsing하여 원하는 형태의 file로 만들 수 있어야 한다.
- FE 개발자가 BE API의 schema 변화에 최대한 번잡하지 않게 대응할 수 있어야 한다.
- FE 개발자가 원하는 API를 선택할 수 있어야 한다. -> 필터링 기능
- BE에서 선언한 response를 JSON validator를 통해 검증할 수 있는 typeguard가 자동으로 생성되어야 한다.
- BE 개발자는 FE의 번거로움을 생각하지 않고 API를 생산할 수 있어야 한다.
- BE 개발자가 선언한 Swagger 선언과 실제 API response의 형태가 일치하는지 integration test에서 검증할 수 있어야 한다.
  - Elixir의 doc test 개념 차용

## 2. Code generator

## 3. Schema validator

## 4. Type guard

## 5. 결과물의 형태
