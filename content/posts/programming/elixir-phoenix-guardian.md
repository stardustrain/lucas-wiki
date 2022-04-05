---
title: Elixir Phoenix + Guardian
description: Phoenix framework에 guardian을 통해 인증처리를 구현한 과정을 공유합니다.
keywords:
  [
    elixir phoenix guardian,
    elixir phoenix guardian tutorial,
    elixir guardian,
    elixir guardian tutorial,
  ]
url: https://wiki.lucashan.space/programming/elixir-phoenix-guardian/
date: 2022-04-05
tags: [Programming, '2022']
---

개인적인 사정으로 3개월 정도를 쉬면서 그동안 궁금했던 것들을 이것저것 해보고있는데, 그중 하나가 [Elixir](https://elixir-lang.org/)와 [Phoenix framework](https://www.phoenixframework.org/)이다.

Elixir는 Erlang VM(BEAM) 상에서 동작하는 언어로 이미 성능이 어느정도 검증되어있고, 국내에서 [달빛조각사](https://www.slideshare.net/ssuserc22b6a/mmorpg-154123892) 서버에 사용된 것으로 알려져있다. 사실 무엇보다 마음에 들었던 것은 간결하고 유려하게 코드를 작성할수 있고, [Elixir 커뮤니티](https://elixirforum.com/)가 잘 형성되어있어 필요한 것을 어렵지 않게 얻을수 있다는 점이었다.

뜬금없이 Elixir에 대한 글을 쓰는 이유는, 1년에 새로운 언어 하나씩은 맛이라도 보고, 맛만 보면 지루하니 그 언어의 유명한 프레임워크나 라이브러리를 이용해 간단한 웹서비스를 하나씩 만들어보는 개인적인 목표가 있기 때문이다. 이번글은 Phoenix framework로 간단한 REST API 서버를 만들면서 인증, 인가에 대한 처리를 Guardian과 함께 구현한 경험을 정리하려고 한다.

## 1. 필요한 의존성 설치하기

[[warning]]
| Elixir와 Phoenix framework의 기본적인 내용은 다루지 않습니다.

`mix.exs` 파일을 열고, `deps` 함수 내부의 배열에 다음 의존성을 추가하여 설치한다. 의존성은 `mix deps.get` 명령어로 설치할 수 있다.

```elixir
defp deps do
  [
    ...
    {:guardian, "~> 2.0"},
    {:pbkdf2_elixir, "~> 2.0"}
  ]
end
```

[guardian](https://hexdocs.pm/guardian/readme.html)은 token base의 인증 라이브러리로, JWT를 기본적으로 사용하지만 `Guardian.Token` behaviour를 구현하면 직접 만든 token 모듈을 사용할 수 있다.

`pbkdf2_elixir`는 Elixir에서 사용하는 password hashing 라이브러리이다. 물론 다른 라이브러리를 [선택할수도 있다](https://github.com/riverrun/comeonin/wiki).

## 2. User schema 추가하기

그 다음엔 User schema를 추가한다. `mix phx.gen.schema` 명령어를 이용해도 되고, 그냥 수동으로 만들어도 된다. `/lib/my_app` 하위에 account라는 디렉토리를 추가하고, user 모듈을 만든다. 그리고 다음과 같이 schema를 정의한다.

<details>
  <summary>User schema</summary>

```elixir
# lib/my_app/account/user.ex

defmodule MyApp.Account.User do
  use Ecto.Schema
  import Ecto.Query, warn: false

  @timestamps_opts [type: :utc_datetime]

  @derive {Jason.Encoder, except: [:__meta__, :password_hash]}
  schema "users" do
    field :email, :string
    field :password_hash, :string
    field :is_admin, :boolean, default: false
    field :is_super_user, :boolean, default: false
    timestamps()
  end
end
```

</details>
<br/>
