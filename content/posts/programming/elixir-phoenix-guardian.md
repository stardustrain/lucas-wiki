---
title: Elixir Phoenix + Guardian
description: Phoenix framework에 Guardian을 통해 인증처리 구현하기.
keywords:
  [
    elixir phoenix guardian,
    elixir phoenix guardian tutorial,
    elixir guardian,
    elixir guardian tutorial,
  ]
url: https://wiki.lucashan.space/programming/elixir-phoenix-guardian/
date: 2022-04-09
tags: [Programming, '2022']
image: https://pbs.twimg.com/profile_images/540333799557439489/-s9uoLIN_400x400.png
---

개인적인 사정으로 3개월 정도를 쉬면서 그동안 궁금했던 것들을 이것저것 공부해 보고 있는데, 그중 하나가 [Elixir](https://elixir-lang.org/)와 [Phoenix framework](https://www.phoenixframework.org/) 이다.

Elixir는 Erlang VM(BEAM) 상에서 동작하는 언어로 이미 성능이 어느 정도 검증되어있고, 국내에서 [달빛조각사](https://www.slideshare.net/ssuserc22b6a/mmorpg-154123892) 서버에 사용된 것으로 알려져 있다. 사실 무엇보다 마음에 들었던 것은 간결하고 유려하게 코드를 작성할 수 있고, [Elixir 커뮤니티](https://elixirforum.com/)가 잘 형성되어있어 필요한 것을 어렵지 않게 얻을 수 있다는 점이었다.

뜬금없이 Elixir에 대한 글을 쓰는 이유는, 1년에 새로운 언어 하나씩은 맛이라도 보고, 맛만 보면 지루하니 그 언어의 유명한 프레임워크나 라이브러리를 이용해 간단한 웹서비스를 하나씩 만들어보는 개인적인 목표가 있기 때문이다. 이번 글은 Phoenix framework로 간단한 REST API 서버를 만들면서 인증, 인가에 대한 처리를 Guardian과 함께 구현한 경험을 정리하려고 한다.

[[warning | 들어가기 전에]]
| - Elixir와 Phoenix framework의 기본적인 내용은 다루지 않습니다.
| - Elixir v1.13.1, Phoenix v1.6.5 을 사용하였습니다.
| - 이 글의 프로젝트는 [repository](https://github.com/stardustrain/my-elixir-app) 에 올려놓았으니 필요하다면 참고하시면 됩니다.
| - 오탈자, 버그는 해당 repository에 이슈로 남겨주시면 감사하겠습니다.

## 1. 필요한 의존성 설치하기


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

[guardian](https://hexdocs.pm/guardian/readme.html)은 token base의 인증 라이브러리로, JWT를 기본적으로 사용하지만 `Guardian.Token` behaviour를 구현하면 직접 만든 토큰 모듈을 사용할 수 있다.

`pbkdf2_elixir`는 Elixir에서 사용하는 password hashing 라이브러리이다. 물론 다른 라이브러리를 [선택할 수도 있다](https://github.com/riverrun/comeonin/wiki).

## 2. User schema 추가하기

처음 할 일은 User schema를 추가하는 것이다. `mix phx.gen.schema` 명령어를 이용해도 되고, 그냥 수동으로 만들어도 된다. 수동으로 만들 경우 `/lib/my_app` 하위에 `account`라는 directory를 추가하고, user 모듈을 만든다. 그리고 다음과 같이 schema를 정의한다.

<disclosure title="lib/my_app/account/user.ex">

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

</disclosure>

Schema를 정의했다면 `ecto.gen.migration` 명령어를 이용하여 migration을 생성한다. Migration이 생성되었다면 다음과 같이 내용을 추가한다.

<disclosure title="priv/repo/migrations/add_users.exs">

```elixir
# priv/repo/migrations/20220405090253_add_users.exs

defmodule MyApp.Repo.Migrations.AddUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :password_hash, :string
      add :is_admin, :boolean
      add :is_super_user, :boolean
      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
```

</disclosure>

그다음 `mix ecto.migrate` 명령을 실행해 migration을 진행한다. 이상 없이 끝났다면, 이제 API를 만들기 위해 Guardian 모듈을 구현할 차례이다.

## 3. Guardian 모듈 구현하기

Guardian을 이용하기 위해서는 먼저 Guardian의 기능과 토큰을 encode, decode 하는 코드를 포함하는 구현 모듈(implementation module)을 만들어야 한다. 구현 모듈 내부에는 `subject_for_token/2` 함수와 `resource_from_claims/1` 함수를 비즈니스 상황에 맞게 구현해야 한다.

### 1. Guardian behaviour 구현

`lib/my_app` 하위에 `Guardian` 모듈을 만들고 위의 함수를 간단히 구현한다.

<disclosure title="lib/my_app/guardian.ex">

```elixir
# lib/my_app/guardian.ex

defmodule MyApp.Guardian do
  use Guardian, otp_app: :my_app
  alias MyApp.Account

  def subject_for_token(%{id: id}, _claims) do
    sub = to_string(id)
    {:ok, sub}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(%{"sub" => id}) do
    resource = Account.get_user_by_id!(id)
    {:ok, resource}
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end
```

</disclosure>

`resource_from_claims/1` 함수를 보면 JWT에 담겨있는 id를 통해 DB의 유저를 조회하는 함수가 필요하다는 것을 알 수 있다. `Account.get_user_by_id!/1` 함수를 만들기 위해 우선 Account 모듈을 추가해야 한다.

### 2. Account 모듈 구현

`test/` 하위에 `my_app` directory를 추가하고 `AccountTest` 모듈을 만든다. 그러고 나서 유저에 대한 규칙을 검증하는 테스트 코드를 작성한다.

[[tip]]
| 테스트 환경에서 `pbkdf2_elixir`를 사용하게 될 경우 다음의 설정을 `config/test.exs`에 추가하는 게 도움이 될 수도 있다.
| ```elixir
| config :pbkdf2_elixir, rounds: 1 
| ```

#### 1. 유저 생성 함수 추가

유저 생성에 대해서 다음 두 가지 규칙만 정하고자 한다. 해당 규칙을 검증하는 테스트 케이스를 추가한다.

- 동일한 email로 가입 불가
- Password는 8자 이상

<disclosure title="test/my_app/account_test.exs">

```elixir
# test/my_app/account_test.exs

defmodule MyApp.AccountTest do
  use MyApp.DataCase

  alias MyApp.Account
  alias MyApp.Account.User

  test "create_user/1 creates a user with valid data" do
    valid_attrs = %{email: "test@test.com", password: "test1234"}
    {:ok, %User{} = user} = Account.create_user(valid_attrs)

    assert user.email === valid_attrs.email
    assert user.password_hash !== nil
  end

  test "create_user/1 returns error with invalid data" do
    assert {:error, %Ecto.Changeset{}} = Account.create_user()
    assert {:error, %Ecto.Changeset{}} = Account.create_user(%{email: "test@test.com", password: "짧은암호"})
  end
end
```

</disclosure>

테스트를 작성했다면, 테스트가 통과할 때 까지 Account 모듈을 작성하면 된다. 우선 Account 모듈을 추가하기 전에 해당 모듈에서 사용할 changeset 로직을 User 모듈에 추가한다.

<disclosure title="lib/my_app/account/user.ex">

```diff-elixir
  # lib/my_app/account/user.ex

  defmodule MyApp.Account.User do
    use Ecto.Schema
    import Ecto.Query, warn: false
+  import Ecto.Changeset

    @timestamps_opts [type: :utc_datetime]

-  @derive {Jason.Encoder, except: [:__meta__, :password_hash]}
+  @derive {Jason.Encoder, except: [:__meta__, :password_hash, :password, :password_confirmation]}
    schema "users" do
      field :email, :string
      field :password_hash, :string
      field :is_admin, :boolean, default: false
      field :is_super_user, :boolean, default: false

+    field :password, :string, virtual: true
+    field :password_confirmation, :string, virtual: true

      timestamps()
    end

+  def changeset(user, attrs) do
+    user
+    |> cast(attrs, [:email, :password, :is_admin, :is_super_user])
+    |> validate_required([:email, :password, :is_admin, :is_super_user])
+    |> unique_constraint(:email)
+    |> validate_length(:password, min: 8)
+    |> validate_confirmation(:password)
+  end
  end
```

</disclosure>

`/lib/my_app` 하위에 `Account` 모듈을 만들고 로직을 추가한다.

<disclosure title="lib/my_app/account.ex">

```elixir
# lib/my_app/account.ex

defmodule MyApp.Account do
  alias MyApp.Repo
  alias MyApp.Account.User

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert
  end
end
```

</disclosure>

이렇게 작성을 한 상태에서 테스트를 실행하면 assertion error가 발생하는데, `password_hash`에 대한 처리를 User 모듈에서 처리하지 않았기 때문이다. 해당 필드에는 hashing 된 값이 저장되어야 하기 때문에 테스트가 통과되기 위해서 다음과 같이 로직을 추가한다.

<disclosure title="lib/my_app/account/user.ex">

```diff-elixir
  # lib/my_app/account/user.ex

  defmodule MyApp.Account.User do
    # 코드 생략
+  import Pbkdf2, only: [hash_pwd_salt: 1]

    def changeset(user, attrs) do
      user
      |> cast(attrs, [:email, :password, :is_admin, :is_super_user])
      |> validate_required([:email, :password, :is_admin, :is_super_user])
      |> unique_constraint(:email)
      |> validate_length(:password, min: 8)
      |> validate_confirmation(:password)
+    |> put_password_hash
    end

+  defp put_password_hash(changeset) do
+    case changeset do
+     %Ecto.Changeset{valid?: true, changes: %{password: password}}
+       -> put_change(changeset, :password_hash, hash_pwd_salt(password))
+     _
+       -> changeset
+    end
+  end
  end
```

</disclosure>

이렇게 하면 테스트를 통과시킬 수 있다. 하지만 아직 테스트 케이스에 "동일한 email로 가입 불가" 규칙이 없어 이 부분도 추가되어야 한다. `create_user/1` 함수를 만들었으니 가상의 유저를 생성하는 fixture 함수를 만들 수 있게 되었고, 이 함수를 이용하는 테스트 케이스를 추가한다. `test/support/` 하위에 `fixtures` directory를 추가하고, `UserFixture` 모듈을 만든 다음, 테스트 케이스를 추가한다.

<disclosure title="테스트 케이스 추가하기">

```elixir
# test/support/fixtures/user_fixture.ex

defmodule MyApp.UserFixture do
  @moduledoc false

  def create_user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        email: "test@test.com",
        password: "test1234"
      })
      |> MyApp.Account.create_user

    user
  end
end
```

```elixir
# test/my_app/account_test.exs

defmodule MyApp.AccountTest do
  # 코드생략
  import MyApp.UserFixture

  test "create_user/1 returns error if using already registered email" do
    create_user_fixture()

    assert {:error, %Ecto.Changeset{}} = Account.create_user(%{email: "test@test.com", password: "test1234"})
  end
end
```

</disclosure>

#### 2. 유저 조회 함수 추가

이제 유저를 생성할 수 있게 되었으니 id로 유저를 조회할 수 있는 `get_user_by_id!/1` 함수를 Account 모듈에 추가한다. 역시 이번에도 테스트 케이스를 먼저 추가하도록 한다.

<disclosure title="테스트 케이스와 함수 추가하기">

```elixir
# test/my_app/account_test.exs

defmodule MyApp.AccountTest do
  # 코드생략
  test "get_user_by_id!/1 returns User strcut with valid id" do
    create_user_fixture(%{email: "test@test.com"})

    user = Account.get_user_by_id!(1)
    assert user.id === 1
    assert user.email === "test@test.com"
  end

  test "get_user_by_id!/1 throw error with invalid id" do
    assert_raise Ecto.NoResultsError, fn ->
      Account.get_user_by_id!(-1)
    end
  end
end
```

```elixir
# lib/my_app/account.ex

defmodule MyApp.Account do
  # 코드생략
  def get_user_by_id!(id) do
    User
    |> Repo.get!(id)
  end
end
```

</disclosure>

### 3. Guardian 설정

테스트가 모두 통과되었다면 `config/config.exs`에 Guardian 설정을 추가하면 사용 준비가 끝난다.

```elixir
# config/config.exs

config :my_app, MyApp.Guardian,
  issuer: "my_app",
  secret_key: "secret_key"
```

[[warning | Production secret key]]
| 여기서 잊으면 안 되는 것이 production의 경우 secret key를 공개하면 안 되기 때문에, `mix phx.gen.secret` 같은 명령어를 사용해 생성된 문자열을 환경변수로 넣어줘야 한다. 때문에 `config/prod.exs`는 다르게 설정해 주어야 한다.
|
| ```elixir
| config :my_app, MyApp.Guardian,
|   issuer: "my_app",
|   secret_key: System.get_env("SECRET_KEY")
| ```

## 4. 인증 관련 API 추가하기

Guardian 설정이 끝났으니, 기본적인 유저 인증 절차를 수행할 수 있게 되었다. 우선 기본적인 인증(authentication)에 관한 API를 추가해야 한다. 여기서는 가입, 로그인, 토큰을 통해 로그인한 유저의 정보를 확인할 수 있는 기능을 구현한다.

### 1. Signup API 구현

#### 1. 비즈니스 로직 작성

Endpoint를 설정하기에 앞서, 가입에 대한 비즈니스 로직을 먼저 작성한다. 크게 복잡할 것은 없고, 단순하게 email, password를 받아 유저의 password를 hashing 하여 저장하고, 토큰을 return 하게 만든다.

<disclosure title="테스트 케이스와 함수 추가하기">

```elixir
# test/my_app/account_test.exs

defmodule MyApp.AccountTest do
  # 코드생략
  test "sign_up/1 returns JWT token with valid attrs" do
    valid_attrs = %{email: "test@test.com", password: "test1234"}

    assert {:ok, token, _claims} = Account.sign_up(valid_attrs)
    assert token !== ""
  end

  test "sign_up/1 returns error with invalid attrs" do
    invalid_attrs = %{email: "test@test.com", password: ""}

    assert {:error, %Ecto.Changeset{}} = Account.sign_up(invalid_attrs)
  end
end
```

```elixir
# lib/my_app/account.ex

defmodule MyApp.Account do
  # 코드생략
  alias MyApp.Guardian

  def sign_up(attrs \\ %{}) do
    with {:ok, user} <- create_user(attrs) do
      Guardian.encode_and_sign(user)
    end
  end
end
```

</disclosure>

테스트가 문제없이 통과되었다면 signup API를 이용하기 위해 endpoint를 만들고 컨트롤러를 통해 비즈니스 로직과 뷰를 연결해야 한다.

#### 2. 컨트롤러, 뷰 작성

위와 마찬가지로 테스트 케이스부터 작성한다.

<disclosure title="test/my_app_web/controllers/user_controller_test.exs">

```elixir
# test/my_app_web/controllers/user_controller_test.exs

defmodule MyAppWeb.UserControllerTest do
  @moduledoc false

  use MyAppWeb.ConnCase

  import MyApp.UserFixture

  @user_attrs %{email: "test@test.com", password: "test1234"}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "user sign up" do
    test "should render jwt token with valid attrs", %{conn: conn} do
      conn = post(
        conn,
        Routes.user_path(conn, :signup),
        @user_attrs
      )

      assert %{"token" => token} = json_response(conn, 201)
      assert is_binary(token)
    end

    test "should render 400 with invalid attributes", %{conn: conn} do
      create_user(%{})

      conn = post(conn, Routes.user_path(conn, :signup), %{email: "", password: ""})
      assert json_response(conn, 400)["errors"] !== %{}

      conn = post(conn, Routes.user_path(conn, :signup), %{email: "other-mail@test.com", password: "짧은암호"})
      assert json_response(conn, 400)["errors"] !== %{}

      conn = post(conn, Routes.user_path(conn, :signup), @user_attrs)
      assert json_response(conn, 400)["errors"] !== %{}
    end
  end

  defp create_user(_) do
    user = create_user_fixture(@user_attrs)
    %{user: user}
  end
end
```

</disclosure>

테스트 케이스를 통과하려면 우선 endpoint가 필요하다. `lib/my_app_web/router.ex`에서 다음 코드를 추가한다.

<disclosure title="router.ex">

```elixir
# lib/my_app_web/router.ex

defmodule MyAppWeb.Router do
  # 코드 생략

  scope "/api", MyAppWeb do
    pipe_through :api

    post "/signup", UserController, :signup
  end

  # 코드 생략
end
```

</disclosure>

`mix phx.routes` 명령어를 통해 endpoint가 추가된 것과 path helper 함수를 통해 해당 endpoint로 접근할 수 있는 key가 각각 할당된 것을 확인할 수 있다.

```sh
$ mix phx.routes

Compiling 3 files (.ex)
  lib/my_app_web/router.ex:11: MyAppWeb.Router.__checks__/0

Generated my_app app
          user_path  POST  /api/signup  MyAppWeb.UserController :signup
```

확인되었다면 이제 UserController를 작성해야한다. `lib/my_app_web/controllers/` 하위에 `UserController` 모듈을 추가한다.

<disclosure title="user_controller.ex">

```elixir
# lib/my_app_web/controllers/user_controller.ex

defmodule MyAppWeb.UserController do
  use MyAppWeb, :controller

  alias MyApp.Account

  def signup(conn, %{"email" => email, "password" => password}) do
    with {:ok, token, _claims} <- Account.sign_up(%{email: email, password: password}) do
      conn
      |> put_status(:created)
      |> render("jwt.json", token: token)
    end
  end
end
```

</disclosure>

`signup/2` 함수에서 `jwt.json`을 통해 결과를 render 하라고 되어있기 때문에, `UserView`를 추가해서 정상적으로 토큰을 반환하도록 만들어야 한다. `lib/my_app_web/views/` 하위에 `UserView` 모듈을 추가한다.

<disclosure title="user_view.ex">

```elixir
# lib/my_app_web/views/user_view.ex

defmodule MyAppWeb.UserView do
  use MyAppWeb, :view

  def render("jwt.json", %{token: token}) do
    %{token: token}
  end
end
```

</disclosure>

이렇게 해도 여전히 테스트가 모두 통과하지 못할 것이다. 에러 상황을 검증하는 부분이 통과하지 못할 텐데 이는 [FallbackController로 error 상황 처리하기](#5-fallbackcontroller로-error-상황-처리하기)에서 다룰 예정이다.

여기서는 글의 흐름을 위해, 일단 테스트가 모두 통과하지 못하는 것을 무시하고 다음 과정을 진행해 보려고 한다. TDD의 원칙인 *테스트가 모두 성공할 때 까지 다른 기능 구현하지 않기*를 지키고 싶다면 FallbackController를 먼저 구현해도 좋을 것 같다.

### 2. Signin API 구현

Signup API를 한번 구현했기 때문에 signin API를 추가하는 것은 어렵지 않을 것이다.

#### 1. 비즈니스 로직 작성

먼저 email과 password를 받아서 유저를 검증한 다음, 올바르게 인증되었다면 token을 반환하는 `sign_in/2` 함수를 Account 모듈에 추가한다.

<disclosure title="테스트 케이스와 함수 추가하기">

```elixir
# test/my_app/account_test.exs

defmodule MyApp.AccountTest do
  # 코드생략
  alias MyApp.Guardian

  test "sign_in/2 returns user with valid email and password" do
    valid_attrs = %{email: "test@test.com", password: "test1234"}
    user = create_user_fixture(valid_attrs)

    {:ok, token, _} = Account.sign_in(valid_attrs.email, valid_attrs.password)
    {:ok, claims} = Guardian.decode_and_verify(token)

    assert claims["sub"] === user.id |> to_string
  end

  test "sign_in/2 returns error with invlid email and password" do
    valid_attrs = %{email: "test@test.com", password: "test1234"}
    create_user_fixture(valid_attrs)

    assert {:error, :unauthorized} = Account.sign_in("wrong email", valid_attrs.password)
    assert {:error, :unauthorized} = Account.sign_in(valid_attrs.email, "wrong password")
  end
end
```

```elixir
# lib/my_app/account.ex

defmodule MyApp.Account do
  # 코드생략
  import Pbkdf2, only: [check_pass: 2]

  defp get_user_by_email(email) do
    case User |> Repo.get_by(email: email) do
      nil -> {:error, :notfound}
      user -> {:ok, user}
    end
  end

  def sign_in(email, password) do
    with {:ok, user} <- get_user_by_email(email),
         {:ok, user} <- check_pass(user, password) do
      Guardian.encode_and_sign(user)
    else
      {:error, _reason} -> {:error, :unauthorized}
    end
  end
end
```

</disclosure>

[`check_pass/3`](https://hexdocs.pm/pbkdf2_elixir/Pbkdf2.html#check_pass/3)는 `verify_pass/2` 함수를 이용해 구조체 내부에 있는 hashed password를 찾아 두 번째 인자로 전달한 password와 비교하는 함수이다. Hashed password가 `:password_hash` 혹은 `:encrypted_password`라는 key로 저장되어있다면 함수가 알아서 해당 필드를 찾아 비교한다.

`sign_in/2` 함수는 인증과정에서 문제가 생기면 무조건 `{:error, :unauthorized}` 튜플을 반환하게 했다.

#### 2. 컨트롤러, 뷰 작성

Signup과 동일한 과정을 거쳐서 signin endpoint를 추가하면 된다.

<disclosure title="테스트 케이스와 함수 추가하기">

```elixir
# test/my_app_web/controllers/user_controller_test.exs

defmodule MyAppWeb.UserControllerTest do
  # 코드 생략
  alias MyApp.Guardian

  describe "user sign in" do
    setup [:create_user]

    test "should render jwt token with valid user", %{conn: conn, user: user} do
      conn = post(
        conn,
        Routes.user_path(conn, :signin),
        @user_attrs
      )

      %{"token" => token} = json_response(conn, 200)
      {:ok, claims} = Guardian.decode_and_verify(token)

      assert claims["sub"] === user.id |> to_string
    end

    test "should render 401 with invalid attributes", %{conn: conn} do
      invalid_attrs = %{email: "invalid@test.com", password: "test1234"}

      conn = post(
        conn,
        Routes.user_path(conn, :signin),
        invalid_attrs
      )

      assert json_response(conn, 401)["errors"]["detail"] === "Unauthorized"
    end
  end
end
```

```diff-elixir
  # lib/my_app_web/router.ex

  defmodule MyAppWeb.Router do
    # 코드 생략

    scope "/api", MyAppWeb do
      pipe_through :api

      post "/signup", UserController, :signup
+    post "/signin", UserController, :signin
    end

    # 코드 생략
  end
```

```elixir
# lib/my_app_web/controllers/user_controller.ex

defmodule MyAppWeb.UserController do
  # 코드 생략

  def signin(conn, %{"email" => email, "password" => password}) do
    with {:ok, token, _claims} <- Account.sign_in(email, password) do
      conn
      |> render("jwt.json", token: token)
    end
  end
end
```

</disclosure>

### 3. Profile API 구현

이제 header에 포함된 token만으로 user를 조회하는 API를 추가한다.

<disclosure title="test/my_app_web/controllers/user_controller_test.exs">

```elixir
# test/my_app_web/controllers/user_controller_test.exs

defmodule MyAppWeb.UserControllerTest do
  # 코드 생략
  describe "retrieve user" do
    setup [:create_user]

    test "should render user information with valid jwt token", %{conn: conn} do
      login_response = post(
        conn,
        Routes.user_path(conn, :signin),
        @user_attrs
      )

      %{"token" => token} = json_response(login_response, 200)

      conn = conn |> put_req_header("authorization", "Bearer #{token}")
      conn = get(
        conn,
        Routes.user_path(conn, :me)
      )

      assert json_response(conn, 200)
      keys = json_response(conn, 200) |> Map.keys

      assert keys
             |> Enum.all?(fn key -> Enum.member?(["id", "email", "inserted_at", "updated_at"], key)  end)
      refute keys
             |> Enum.all?(fn key -> Enum.member?(["is_admin", "is_super_user"], key)  end)
    end

    test "should render 401 with invalid jwt token", %{conn: conn} do
      conn = get(
        conn,
        Routes.user_path(conn, :me)
      )

      assert json_response(conn, 401)
    end
  end
end
```

</disclosure>

이번 테스트 케이스가 복잡하게 느껴질 수도 있지만, 자세히 보면 매우 간단한 로직이다. 먼저 login을 한 다음, 반환되는 token을 request header에 넣고 다시 유저 조회 API를 요청하는 방식이다. 조회한 결과에서 id, email와 같은 기본적인 정보는 보여주지만 다른 정보는 보여주지 않도록 한다. 이제 컨트롤러와 뷰를 작성하면 된다.

<disclosure title="컨트롤러와 뷰 추가하기">

```diff-elixir
  # lib/my_app_web/router.ex

  defmodule MyAppWeb.Router do
    # 코드 생략

    scope "/api", MyAppWeb do
      pipe_through :api

      post "/signup", UserController, :signup
      post "/signin", UserController, :signin
+    get "/me", UserController, :me
    end

    # 코드 생략
  end
```

```elixir
# lib/my_app_web/controllers/user_controller.ex

defmodule MyAppWeb.UserController do
  # 코드 생략

  alias MyApp.Guardian

  def me(conn, _) do
    token = conn
    |> get_req_header("authorization")
    |> List.first("")
    |> String.split
    |> List.last
    result = Guardian.resource_from_token(token)

    case result do
      {:ok, resource, _claims} -> conn |> render("me.json", user: resource)
      {:error, _reason} -> {:error, :unauthorized}
    end
  end
end
```

```elixir
# lib/my_app_web/views/user_view.ex

defmodule MyAppWeb.UserView do
  # 코드 생략

  def render("me.json", %{user: user}) do
    %{
      id: user.id,
      email: user.email,
      inserted_at: user.inserted_at,
      updated_at: user.updated_at
    }
  end
end
```

</disclosure>

에러 상황을 테스트하는 케이스를 제외한 모든 테스트가 통과되었다면, 이제 FallbackController를 만들어 에러를 적절히 처리해주면 된다.

## 5. FallbackController로 error 상황 처리하기

Action fallback을 이용하면 컨트롤러의 함수가 %Plug.Conn{} 구조체를 반환하지 못할 때 호출되는 오류 처리 코드를 하나로 집중해서 관리할 수 있다. 쉽게 말해, 컨트롤러의 함수마다 반복되는 에러 처리를 하나의 모듈에서 할 수 있다고 보면 된다. 자세한 것은 [이 문서](https://hexdocs.pm/phoenix/controllers.html#action-fallback)를 참고하면 된다.

우선 `lib/my_app_web/controllers/` 하위에 `FallbackController`를 추가한다.

<disclosure title="fallback_controller.ex">

```elixir
# lib/my_app_web/controllers/fallback_controller.ex

defmodule MyAppWeb.FallbackController do
  use Phoenix.Controller

  alias MyAppWeb.ErrorHelpers

  def call(conn, {:error, :unauthorized}) do
    call(conn, {:error, :unauthorized, "Unauthorized"})
  end

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    call(conn, {:error, :bad_request, changeset})
  end

  def call(conn, {:error, status_code, message}) when is_binary(message) do
    conn
    |> put_status(status_code)
    |> put_view(MyAppWeb.ErrorView)
    |> render("error.json", %{detail: message})
  end

  def call(conn, {:error, status_code, %Ecto.Changeset{} = changeset}) do
    detail = changeset
    |> Ecto.Changeset.traverse_errors(&ErrorHelpers.translate_error(&1))

    conn
    |> put_status(status_code)
    |> put_view(MyAppWeb.ErrorView)
    |> render("error.json", %{detail: detail})
  end
end
```

</disclosure>

이렇게 하면 각 call 함수에 패턴 매칭되어 fallback action이 호출된다. [Signin API](http://localhost:8000/programming/elixir-phoenix-guardian/#2-signin-api-%EA%B5%AC%ED%98%84)를 예로 들면, `MyApp.Account.sign_in/2` 함수에서 인증에 실패했을 경우 `{:error, :unauthorized}` 튜플이 반환되는데 `MyAppWeb.UserController.sign_in/2`에서 특별히 처리되는 부분이 없기 때문에 FallbackController로 제어권이 이동한다. 그리고 FallbackController의 가장 처음 `call/2` 함수에 패턴 매칭되어 처리된다.

FallbackController를 이용하려면 `ErrorView`에 render 함수를 구현하고 컨트롤러의 `action_fallback`으로 참조하면 된다.

<disclosure title="Action fallback 적용하기">

```elixir
# lib/my_app_web/views/error_view.ex

defmodule MyAppWeb.ErrorView do
  use MyAppWeb, :view

  def render("error.json", %{detail: detail}) do
    %{errors: %{detail: detail}}
  end
  # 코드 생략
end
```

```diff-elixir
  # lib/my_app_web/controllers/user_controller.ex

  defmodule MyAppWeb.UserController do
    use MyAppWeb, :controller

    alias MyApp.Account
    alias MyApp.Guardian

+  action_fallback MyAppWeb.FallbackController

    # 코드 생략
  end
```

</disclosure>

위의 코드를 추가하면 모든 테스트가 통과하게 된다.

## 6. Plug로 인증, 인가 pipeline 구현하기

Phoenix는 [plug](https://hexdocs.pm/phoenix/plug.html#content)를 통해서 모듈 혹은 route 별로 pipeline을 설정할 수 있다. Guardian에서 기본적으로 제공하는 plug를 이용하면 아주 기본적인 인증처리를 쉽게 진행할 수 있다. 이 글에서는 인증과 인가를 처리하는 두 개의 plug를 만들어 적용할 생각이다.

### 1. Authentication plug 적용하기

`lib/my_app/` 하위에 `plugs`라는 directory를 추가하고 `Authentication` 모듈을 만든다.

<disclosure title="lib/my_app/plugs/authentication.ex">

```elixir
# lib/my_app/plugs/authentication.ex

defmodule MyApp.Authentication do
  use Guardian.Plug.Pipeline,
    otp_app: :my_app,
    module: MyApp.Guardian,
    error_handler: MyApp.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}
  plug Guardian.Plug.LoadResource
  plug Guardian.Plug.EnsureAuthenticated
end
```

</disclosure>

각 plug의 경우 [문서](https://hexdocs.pm/guardian/Guardian.Plug.html#content)를 확인해보면 수행하는 일을 알 수 있다. 여기서 확인해야 할 것은 `error_handler` 옵션인데, 이 옵션에 할당하는 모듈로 Guardian plug에서 발생하는 에러를 처리할 수 있다. 이 모듈은 `auth_error/3` 함수를 구현해야 한다. `/lib/my_app/` 하위에 `AuthErrorHandler` 모듈을 추가한다.

<disclosure title="lib/my_app/auth_error_handler.ex">

```elixir
# lib/my_app/auth_error_handler.ex

defmodule MyApp.AuthErrorHandler do
  import Plug.Conn

  @behaviour Guardian.Plug.ErrorHandler

  @impl Guardian.Plug.ErrorHandler
  def auth_error(conn, {type, _reason}, _opts) do
    body = %{errors: %{detail: type}} |> Jason.encode!

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(:unauthorized, body)
  end
end
```

</disclosure>

추가했다면 이 plug를 router에서 pipeline으로 만들어 사용해야 한다. Plug는 [모듈 단위로도 적용](https://hexdocs.pm/phoenix/plug.html#controller-plugs)이 가능하니 필요한 경우 참고하면 좋을 것 같다. 일단 `router.ex`에 다음의 항목을 추가한다.

<disclosure title="lib/my_app_web/router.ex">

```diff-elixir
  # lib/my_app_web/router.ex

  defmodule MyAppWeb.Router do
    use MyAppWeb, :router

    pipeline :api do
      plug :accepts, ["json"]
    end

+  pipeline :authentication do
+    plug MyApp.Authentication
+  end

    scope "/api", MyAppWeb do
      pipe_through :api

      post "/signup", UserController, :signup
      post "/signin", UserController, :signin
-    get "/me", UserController, :me
    end

+  scope "/api", MyAppWeb do
+    pipe_through [:api, :authentication]
+
+    get "/me", UserController, :me
+  end

    # 코드 생략
  end
```

</disclosure>

테스트도 실패하지 않고 크게 달라지는 것은 없다. Plug를 테스트해보려면 `:authentication` pipeline이 실행되는 곳에 `:me` 말고 다른 endpoint를 추가하면 된다.

이제 `plug Guardian.Plug.LoadResource`가 실행되고 나서 `MyAppWeb.UserController.me/2`가 실행되기 때문에, 아래처럼 간결하게 refactoring 할 수 있다. 참고로 `plug Guardian.Plug.LoadResource`는 `MyApp.Guardian.resource_from_claims/1` 함수를 통해 유저를 조회하고 그 결과를 %Plug.Conn{} 구조체 내부에 추가한다.

<disclosure title="user_controller.ex">

```diff-elixir
  defmodule MyAppWeb.UserController do
    # 코드 생략

    def me(conn, _) do
-    token = conn
-    |> get_req_header("authorization")
-    |> List.first("")
-    |> String.split
-    |> List.last
-    result = Guardian.resource_from_token(token)
-
-    case result do
-      {:ok, resource, _claims} -> conn |> render("me.json", user: resource)
-      {:error, _reason} -> {:error, :unauthorized}
-    end
+    user = Guardian.Plug.current_resource(conn)
+
+    conn
+    |> render("me.json", user: user)
    end
  end
```

</disclosure>

### 2. Authorization plug 적용하기

이제 정상적인 토큰으로 요청을 보내는 유저가 admin인지 판단하기 위해 인가 로직을 간단하게 만들면 된다. `lib/my_app/plugs` 하위에 `Authorization` 모듈을 만든다. 그리고 %MyApp.User{} 내부의 `is_admin`이라는 값을 확인하는 로직을 넣고, 해당 값에 따라 적절한 처리를 해주면 된다. 이 글에서는, 만약 유저가 admin이 아니라면 403 error를 발생시키고, pipeline을 중단하는 처리를 하고자 한다.

<disclosure title="lib/my_app/plugs/authorization.ex">

```elixir
# lib/my_app/plugs/authorization.ex

defmodule MyApp.Authorization do
  import Plug.Conn
  alias MyAppWeb.ErrorView
  alias MyApp.Guardian

  def init(_) do
  end

  defp send_forbidden_error(conn) do
    body = ErrorView.template_not_found("403.json", %{}) |> Jason.encode!

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(:forbidden, body)
  end

  def call(conn, _) do
    with %MyApp.Account.User{} = user <- Guardian.Plug.current_resource(conn),
      {:ok, true} <- Map.fetch(user, :is_admin) do
        conn
    else
      _ -> conn |> send_forbidden_error |> halt
    end
  end
end
```

</disclosure>

`Plug.Conn.halt/1`을 호출하면, 이 plug에서 pipeline이 중지된다. 즉, router로 제어권이 넘어가지 않게 되는 것이다. 이제 admin만 호출할 수 있는 간단한 API를 만들어서 이 plug를 테스트해보면 된다.

### 3. 인증, 인가 pipeline 적용하기

우선 admin pipeline을 테스트하기 위한 케이스를 추가한다.

<disclosure title="test/my_app_web/controllers/user_controller_test.exs">

```elixir
# test/my_app_web/controllers/user_controller_test.exs

defmodule MyAppWeb.UserControllerTest do
  # 코드 생략

  describe "user authorization" do
    setup [:create_user, :create_admin_token]

    test "should render user information if admin", %{conn: conn, admin_token: token} do
      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      conn = get(
        conn,
        Routes.user_path(conn, :admin_only)
      )

      assert json_response(conn, 200)
    end

    test "should render 401 error with invalid jwt token", %{conn: conn} do
      conn = conn |> put_req_header("authorization", "Bearer INVALID_TOKEN")

      conn = get(
        conn,
        Routes.user_path(conn, :admin_only)
      )

      assert json_response(conn, 401)
    end

    test "should render 403 error if not a admin user token", %{conn: conn, user: user} do
      {:ok, token, _claims} = Guardian.encode_and_sign(user)
      conn = conn |> put_req_header("authorization", "Bearer #{token}")

      conn = get(
        conn,
        Routes.user_path(conn, :admin_only)
      )

      assert json_response(conn, 403)["errors"] === %{"detail" => "Forbidden"}
    end
  end

  defp create_admin_token(_) do
    admin = create_user_fixture(%{email: "admin@test.com", is_admin: true})
    {:ok, token, _claims} = Guardian.encode_and_sign(admin)
    %{admin_token: token}
  end
end
```

</disclosure>

그다음 router에 테스트용 endpoint를 하나 추가하고, UserController에 `admin_only/2` 함수를 추가한다.

<disclosure title="Pipeline과 함수 추가하기">

```diff-elixir
  # lib/my_app_web/router.ex

  defmodule MyAppWeb.Router do
    use MyAppWeb, :router

    pipeline :api do
      plug :accepts, ["json"]
    end

    pipeline :authentication do
      plug MyApp.Authentication
    end

+  pipeline :ensure_admin do
+    plug MyApp.Authentication
+    plug MyApp.Authorization
+  end

    scope "/api", MyAppWeb do
      pipe_through :api

      post "/signup", UserController, :signup
      post "/signin", UserController, :signin
    end

    scope "/api", MyAppWeb do
      pipe_through [:api, :authentication]

      get "/me", UserController, :me
    end

+  scope "/admin", MyAppWeb do
+    pipe_through [:api, :ensure_admin]
+
+    get "/admin-only", UserController, :admin_only
+  end

    # 코드 생략
  end
```

```elixir
# lib/my_app_web/controllers/user_controller.ex

defmodule MyAppWeb.UserController do
  # 코드 생략

  def admin_only(conn, _) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> render("me.json", user: user)
  end
end
```

</disclosure>

테스트를 실행하면, 테스트 케이스에 따라 잘못된 토큰일 경우 401 error, 잘못된 토큰이 아니지만 admin이 아닐 경우 403 error를 반환하는 것까지 확인해볼 수 있다.

## 7. Conclusion

Phoenix framework가 MVC 패턴을 따르다 보니 여기저기 파일을 생성할 일이 많았는데, 최종적인 모습은 아래와 같다. 이 글에서 만든 파일만 확인하기 위해 자동으로 생성되는 파일은 제외한 채로 표현하였다.

<disclosure title="프로젝트 구조">

```bash
.
├── config
│   ├── config.exs
│   ├── dev.exs
│   ├── prod.exs
│   └── test.exs
├── lib
│   ├── my_app
│   │   ├── account
│   │   │   └── user.ex
│   │   ├── account.ex
│   │   ├── auth_error_handler.ex
│   │   ├── guardian.ex
│   │   └── plugs
│   │       ├── authentication.ex
│   │       └── authorization.ex
│   └── my_app_web
│       ├── controllers
│       │   ├── fallback_controller.ex
│       │   └── user_controller.ex
│       ├── router.ex
│       └── views
│           ├── error_helpers.ex
│           ├── error_view.ex
│           └── user_view.ex
├── priv
│   └── repo
│       └── migrations
│           └── 20220405090253_add_users.exs
└── test
    ├── my_app
    │   └── account_test.exs
    ├── my_app_web
    │   └── controllers
    │       └── user_controller_test.exs
    └── support
        └── fixtures
            └── user_fixture.ex
```

</disclosure>

길었지만, Phoenix framework에 Guardian을 이용해 인증, 인가처리를 할 수 있게 되었다. 이 부분을 구현하면서 Elixir와 Phoenix framework에 대해 많이 공부할 수 있었는데, 간결한 문법과 좋은 표현력 덕분에 토이 프로젝트에서 많이 사용할 것 같다.

---

<h2 class="reference-title">참고</h2>

- [JWT Auth with an Elixir on Phoenix 1.4 API and React Native, Part I: Phoenix JWT API](https://njwest.medium.com/jwt-auth-with-an-elixir-on-phoenix-1-3-guardian-api-and-react-native-mobile-app-1bd00559ea51)
- [Implement token Authentication with Phoenix.Token](https://dev.to/onpointvn/implement-jwt-authentication-with-phoenix-token-n58)
- [Phoenix framework](https://www.phoenixframework.org/)
- [Guardian](https://hexdocs.pm/guardian/readme.html)
