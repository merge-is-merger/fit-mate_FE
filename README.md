## FITMATE

## 기능

회원가입 및 로그인: 사용자는 이메일을 통해 회원가입하고 로그인할 수 있습니다.
챌린지: 사용자는 다양한 피트니스 챌린지에 참여할 수 있습니다.
루틴 추적: 사용자는 자신의 운동 루틴을 추적할 수 있습니다.
커뮤니티: 사용자는 다른 사용자와 소통하고 피드백을 나눌 수 있습니다

## 도구

이 애플리케이션은 Blockly 팀이 Blockly를 개발할 때 사용하는 많은 도구들을 사용합니다. 다음은 간단한 개요이며, 자세한 내용은 개발자 사이트에서 읽을 수 있습니다. 
(https://developers.google.com/blockly/guides/contribute/get-started/development_tools).

## 구조

- `package.json`에는 앱에 대한 기본 정보가 포함되어 있습니다. 실행, 빌드 등의 스크립트가 여기에 나열되어 있습니다.
- `package-lock.json`은 npm이 의존성을 관리하는 데 사용됩니다.
- `webpack.config.js`는 webpack의 구성 파일입니다. 이는 애플리케이션을 번들링하고 개발 서버를 실행하는 역할을 합니다.
- `src/`에는 나머지 소스 코드가 포함되어 있습니다.
- `dist/`에는 패키징된 출력물이 포함됩니다(예를 들어 서버에 호스팅할 수 있습니다). 이는 git에 의해 무시되며 `npm run build` 또는 `npm run start`를 실행한 후에만 나타납니다.

## 파일 및 디렉터리 설명

blocks/: 블록 관련 파일들이 포함된 디렉터리입니다.
generators/: 제너레이터 관련 파일들이 포함된 디렉터리입니다.
images/: 이미지 파일들이 포함된 디렉터리입니다.
challenge.css: 챌린지 페이지의 스타일시트 파일입니다.
challenge.html: 챌린지 페이지의 HTML 파일입니다.
challenge.js: 챌린지 페이지의 JavaScript 파일입니다.
community.css: 커뮤니티 페이지의 스타일시트 파일입니다.
community.html: 커뮤니티 페이지의 HTML 파일입니다.
index.css: 메인 페이지의 스타일시트 파일입니다.
index.html: 메인 페이지의 HTML 파일입니다.
index.js: 메인 페이지의 JavaScript 파일입니다.
login.css: 로그인 페이지의 스타일시트 파일입니다.
login.html: 로그인 페이지의 HTML 파일입니다.
profile.css: 프로필 페이지의 스타일시트 파일입니다.
profile.html: 프로필 페이지의 HTML 파일입니다.
routine.css: 루틴 페이지의 스타일시트 파일입니다.
routine.html: 루틴 페이지의 HTML 파일입니다.
routine.js: 루틴 페이지의 JavaScript 파일입니다.
serialization.js: 데이터 직렬화 관련 파일입니다.
server.js: 서버 설정 및 라우팅 파일입니다.
signup.css: 회원가입 페이지의 스타일시트 파일입니다.
signup.html: 회원가입 페이지의 HTML 파일입니다.
toolbox.js: 도구 관련 JavaScript 파일입니다.


