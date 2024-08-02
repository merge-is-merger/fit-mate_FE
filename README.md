## FITMATE_FE

## 기능

회원가입 및 로그인: 사용자는 아이디와 비밀번호를 통해 회원가입하고 로그인할 수 있습니다.
챌린지: 사용자는 다양한 피트니스 챌린지에 참여할 수 있습니다.
루틴 추적: 사용자는 자신만의 운동 루틴을 생성할 수 있습니다.

## Tooling

이 애플리케이션은 Blockly 팀이 Blockly 자체를 개발하는 데 사용하는 것과 많은 동일한 도구를 사용합니다. 다음은 간략한 개요이며, [개발자 사이트](https://developers.google.com/blockly/guides/contribute/get-started/development_tools)에서 이에 대해 더 읽을 수 있습니다.

## 프로젝트 구조

- `package.json` contains basic information about the app. This is where the scripts to run, build, etc. are listed.
- `package-lock.json` is used by npm to manage dependencies
- `webpack.config.js` is the configuration for webpack. This handles bundling the application and running our development server.
- `src/` contains the rest of the source code.
- `dist/` contains the packaged output (that you could host on a server, for example). This is ignored by git and will only appear after you run `npm run build` or `npm run start`.

## 파일 및 디렉터리 설명

- `blocks/`: 블록 관련 파일들이 포함된 디렉터리입니다.
- `generators/`: 제너레이터 관련 파일들이 포함된 디렉터리입니다.
- `images/`: 이미지 파일들이 포함된 디렉터리입니다.
- `challenge.css`: 챌린지 페이지의 스타일시트 파일입니다.
- `challenge.html`: 챌린지 페이지의 HTML 파일입니다.
- `challenge.js`: 챌린지 페이지의 JavaScript 파일입니다.
- `community.css`: 커뮤니티 페이지의 스타일시트 파일입니다.
- `community.html`: 커뮤니티 페이지의 HTML 파일입니다.
- `index.css`: 메인 페이지의 스타일시트 파일입니다.
- `index.html`: 메인 페이지의 HTML 파일입니다.
- `index.js`: 메인 페이지의 JavaScript 파일입니다.
- `login.css`: 로그인 페이지의 스타일시트 파일입니다.
- `login.html`: 로그인 페이지의 HTML 파일입니다.
- `profile.css`: 프로필 페이지의 스타일시트 파일입니다.
- `profile.html`: 프로필 페이지의 HTML 파일입니다.
- `routine.css`: 루틴 페이지의 스타일시트 파일입니다.
- `routine.html`: 루틴 페이지의 HTML 파일입니다.
- `routine.js`: 루틴 페이지의 JavaScript 파일입니다.
- `serialization.js`: 데이터 직렬화 관련 파일입니다.
- `server.js`: 서버 설정 및 라우팅 파일입니다.
- `signup.css`: 회원가입 페이지의 스타일시트 파일입니다.
- `signup.html`: 회원가입 페이지의 HTML 파일입니다.
- `toolbox.js`: 도구 관련 JavaScript 파일입니다.


