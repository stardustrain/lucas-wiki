---
title: GitHub npm registry를 위한 monorepo 설정하기 (1)
description: Monorepo를 설정하고 GitHub npm registry에 배포하기까지의 과정을 잊기전에 정리합니다.
url: https://wiki.lucashan.space/programming/setting-monorepo-for-github-npm-registry-1/
date: 2021-09-12
tags: [Programming, '2021']
---

## 1. 뜬금없이 monorepo

> 혹시 monorepo를 구축해본적이 있으신가요?

어느날 뜬금없이 팀원에게 메시지를 받았다. 사내 디자인 시스템을 monorepo 구조로 개발하고 싶은데 어디서부터 어떻게 해야할지 모르겠다며 도움을 요청한 것이다.

생각해보니 monorepo는 이전 회사에서 사용해본 경험은 있었지만, 팀장님이 미리 구성해 놓은 것을 사용했던 터라 정확히 어떻게 구축하는지는 알지 못했다. 그래서 이번에 monorepo를 처음부터 구축해 볼 좋은기회라는 생각이 들어 흔쾌히 수락하였다.

그렇게 사흘정도 틈틈이 테스트를 시도한 끝에 우리팀에서 필요로하는 부분을 잘 구현할 수 있었다. 우리팀에서 사용하게 될 monorepo의 구조가 당연히 완벽하지 않을수도 있지만 그 과정을 잊지않기 위해, 또 monorepo 도입이 필요할지도 모르는 사람들을 위해 약간의 도움이 되고자 기록을 남겨야겠다고 생각했다.

## 2. Monorepo는 왜 필요할까?

## 3. Monorepo를 구성하는데 도움이 되는 라이브러리

Monorepo를 구성하기 위해 기본적으로 `yarn workspace`를 이용했다. 물론 yarn을 사용하지 않는다면 lerna의 기본적인 패키지 관리 기능을 이용해도 무방하다.

이외에도 monorepo를 구축하는데 흔히 쓰이거나, 팀 내부의 논의에 따라 사용하게된 라이브러리들은 아래와 같다.

- [lerna](https://github.com/lerna/lerna)
  - npm scripts들을 실행하거나 의존성을 설치하고 관리한다.
- [changesets](https://github.com/atlassian/changesets)
  - 각 패키지들의 change log와 release를 관리한다.
- [tsdx](https://github.com/formium/tsdx)
  - TypeScript 패키지를 별다른 설정없이 개발, 배포할 수 있게 도와주는 라이브러리이다. 이전 회사에서 사용했던 경험이 괜찮았다는 의견이 있어 이번에도 사용하게 되었다. 내부적으로 rollup을 사용한다.
- [commitlint](https://commitlint.js.org/#/)
  - 직접적으로 monorepo를 구성하는데 도움을 주는 것이 아니지만, commit message에 대해 규칙 검사를 수행하여 일정한 형태의 commit message를 만드는데 도움을 준다. 우리팀의 디자인 시스템은 [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)을 적용하기로 하였다.
- [commitizen](https://github.com/commitizen/cz-cli)
  - 팀에서 지정한 commit lint 규칙에 맞게 commit message를 작성해야하는데 이 규칙을 (손에 익었다면 상관 없지만) 일일이 기억하며 작성하기란 생각보다 성가신 일이다. `commitizen`은 commit lint 규칙에 맞추어 문답형태로 commit message를 작성할 수 있게 도와주는 라이브러리이다.

## 4. Project 설정

이 글에서는 가벼운 util 패키지들을 만들어 보는 예시를 통해 monorepo를 구축했던 과정을 공유하고자 한다. 가벼운 마음으로 아래의 command를 실행한다.

```bash
$ mkdir test-utils && cd test-utils && yarn init
```

### 1. yarn workspace 설정하기

우선 project root에 `lerna`를 설치하고 project에 initialize한다.

```bash
$ yarn add lerna -W
$ yarn lerna init
```

모든 과정이 잘 끝나면 project root에 `lerna.json`이라는 설정 파일과 `packages`라는 directory가 생성된다.

그 다음 yarn workspace를 사용하기 위해 `package.json`에 아래의 설정을 추가한다. yarn workspace에 대한 것은 [이곳](https://classic.yarnpkg.com/en/docs/workspaces/)을 참고하면 된다.

```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

설정을 추가했다면 아래 명령어를 입력해본다.

```bash
$ yarn workspaces info
```

아래의 결과가 나왔다면 잘 설정된 것이다. 아직 packages 아래에 별다른 패키지들이 없기때문에 의미있는 결과를 보여주지는 않는다.

```bash
yarn workspaces v1.22.10
{}
✨  Done in 0.03s.
```

여기까지 확인했다면, lerna가 의존성을 관리할 때 관련 작업을 yarn workspace에게 위임하기 위한 설정을 `lerna.json`에 추가한다. 각 패키지들은 별도의 버전으로 관리할 것이기 때문에 `"version": "independent"` 역시 설정해 주어야 한다.

```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "independent"
}
```

### 2. TypeScript와 tsdx 설정하기

`TypeScript`와 `tsdx`는 모든 패키지들이 사용할 것이기 때문에 각각의 패키지에서 따로 설치할 필요가 없다. Project root에 두 라이브러리를 설치한다. 설치가 완료되었다면 `yarn tsc --init`을 통해 `tsconfig.json` file을 생성한다.

```bash
$ yarn add typescript tsdx -W
$ yarn tsc --init
```

`tsconfig.json`에 필요한 설정을 한다. 이 예시는 [tsdx에서 제공하는 예제의 설정](https://github.com/formium/tsdx/blob/master/templates/basic/tsconfig.json)을 참고했다. Project root의 tsconfig는 각 패키지들의 `tsconfig.json`에서 extends하여 사용할 공통의 설정이라고 생각해면 좋을 것 같다.

<details>
  <summary>tsconfig.json</summary>

```json
{
  "include": ["packages"],
  "exclude": ["node_modules", "dist"],
  "compilerOptions": {
    "module": "esnext",
    "lib": ["dom", "esnext"],
    "importHelpers": true,
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "moduleResolution": "node",
    "jsx": "react",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  }
}
```

</details>

### 3. date 패키지 추가하기

`packages` directory 밑에 `date`라는 이름의 패키지를 추가한다. 아래처럼 수동으로 해주어도 상관없고, [lerna create](https://github.com/lerna/lerna/tree/main/commands/create#readme) 명렁어를 사용해도 괜찮다.

```bash
$ mkdir packages/date && cd ./packages/date && yarn init
```

그런 다음, date directory에서 TypeScript 설정을 추가한다. 아까와 마찬가지로, `yarn tsc --init`을 한 다음 `tsconfig.json`파일에 설정을 추가한다. 이때, project root의 tsconfig.json을 extends 한다.

```bash
/packages/date$ yarn tsc --init
```

<details>
  <summary>packages/date/tsconfig.json</summary>

```json
{
  "extends": "../../tsconfig.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

</details>
<br/>

설정을 추가했다면 `src/index.ts` 파일을 추가하고 간단한 함수를 작성한다.

```ts
// packages/date/src/index.ts
export const firstFunction = () => 'hello world'
```

함수를 작성했다면 일단 빌드가 되는지 확인해야 한다. date 패키지의 `package.json`에 다음의 설정을 추가하고 command를 실행해 본다.

```json
{
  "main": "dist/index.js",
  "typings": "dist/index.d.ts",
  "module": "dist/date.esm.js",
  "scripts": {
    "build": "tsdx build --tsconfig ./tsconfig.json"
  }
}
```

빌드가 되는지 확인을 하는 것이 목적이기 때문에, command는 yarn workspace를 이용해도 상관없고, date 패키지에서 직접 실행해도 상관없다.

```bash
$ yarn workspace date build

# or

/packages/date$ yarn run build
```

date 패키지의 tsconfig에 설정한 `outDir`의 경로에 빌드된 결과물이 나왔다면, 일단은 성공적으로 패키지를 추가한 것이다.

### 4. qs 패키지 추가하기

위와 동일한 과정을 통해 `packages` directory 밑에 `qs`라는 패키지를 추가한다. 마찬가지로 간단한 함수를 작성한 다음 빌드가 되는지 테스트해본다.

```ts
// packages/qs/src/index.ts
export const secondFunction = () => 'secondFunction'
```

이상없이 잘 빌드가 된다면 `changeset`을 사용하기 위해 commit을 해야한다. Commit을 하기 전 지금까지 작업한 프로젝트의 구조를 확인하면 다음과 같다.

```
.
├── lerna.json
├── package.json
├── packages
│   ├── date
│   │   ├── package.json
│   │   ├── dist
│   │   │   └── 빌드된 파일들
│   │   ├── src
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   └── qs
│       ├── package.json
│       ├── dist
│       │   └── 빌드된 파일들
│       ├── src
│       │   └── index.ts
│       └── tsconfig.json
├── tsconfig.json
└── yarn.lock
```

## 5. Commitlint와 commitizen 설정하기

우리팀의 경우 conventional commit을 commit rule로 채택하고 있기 때문에 commitlint와 commitizen을 프로젝트마다 설정하고 있다. 그렇기 때문에 commit lint와 관련한 설정이 불필요하다면 이 부분은 건너뛰어도 아무 지장이 없다.

### 1. commitlint 설치하기

Project root에 commitlint를 설치한다. 그리고, `commitlint.config.js`에 conventional commit config를 설정한다.

```bash
$ yarn add -D @commitlint/cli @commitlint/config-conventional -W
$ echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

이제 commit을 할 때마다 commitlint가 실행되게끔 설정하면 된다. Git hooks를 직접 만들어도 괜찮고, [husky](https://github.com/typicode/husky)라는 라이브러리를 이용해도 괜찮다. husky는 Git hooks를 좀 더 쉽게 만들 수 있게 도와주는 역할을 한다. 여기서는 husky를 이용해 보도록 하겠다.

```bash
$ yarn add -D husky -W
$ yarn husky install
$ yarn husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

이렇게 설정을 하면 commit message를 저장하기 전에 commitlint를 실행하고, lint rule에 맞추어 작성되지 않았다면 lint error가 발생하면서 commit이 되지 않는다. 설정이 잘 되었는지 아래와 같은 방법으로 테스트해보면 된다.

```bash
$ git add -A
$ git commit -m "initialize commit"

⧗   input: initialize commit
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
husky - commit-msg hook exited with code 1 (error)
```

Conventional commit의 필수 요소인 subject와 type이 없다는 에러 메시지와 함께 commit을 실패하는 것을 볼 수 있다. 참고로 conventional commit message는 다음과 같은 구조를 갖는다.

```
<type>[optional scope]: <description(subject)>

[optional body]

[optional footer(s)]
```

그렇기 때문에 위의 구조에 맞추어 다음과 같이 commit message를 작성하면 잘 commit이 되는것을 확인할 수 있다.

```bash
$ git commit -m "feat: initialize commit"

✨  Done in 0.70s.
```

### 2. commitizen 이용하기

위에도 써있듯, conventional commit의 규칙이 손에 익었다면 이 라이브러리를 사용할 필요가 없다. 하지만 conventional commit에 익숙하지 않다거나 규칙을 외우는게 귀찮다면 commitizen을 이용해 문답 형태로 commit message를 작성할 수 있다.

```bash
$ yarn add -D commitizen cz-conventional-changelog -W
```

설치가 완료되었다면 project root의 `package.json`에 다음의 설정을 추가한다.

```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

이렇게 설정을 하면 commitizen이 `cz-conventional-changelog`라는 adapter와 함께 동작하게 되어 conventional commit message를 작성하는데 필요한 옵션들을 나열해주고 상황에 맞추어 선택하거나 작성하면 commit message를 잘 조립하여 준다. 아래와 같이 실행하면,

```bash
$ git add -A
$ yarn commit
```

이렇게 commit message를 작성할 수 있다.

<center>
  <figure>
    <img src="../../assets/commitizen.gif" width="100%" alt="commitizen 실행화면">
    <figcaption style="font-size: 14px;">
      - 물어봐줘서 고마워!
    </figcaption>
  </figure>
</center>

commitizen 사용하는 방법은 여러가지가 있으니 [commitizen repository](https://github.com/commitizen/cz-cli)를 참고해보면 좋을 것 같다. [Adapter](https://github.com/commitizen/cz-cli#adapters) 역시 다양하게 준비되어있기 때문에 상황에 맞는것을 골라서 사용하면 된다. 참고로 우리팀은 jira를 사용하고있기 때문에 cz-conventional-changelog-for-jira adapter를 사용하고 있다.

지금까지 작업한 부분을 모두 commit했다면 `changesets`를 사용할 준비가 모두 끝났다. 다음 글에서는 `changesets`을 설정하여 GitHub registry에 패키지를 배포해 보고자 한다.
