현재: 윈도우 기능 구현 + 컨텍스트 도입 from DaedalOS

2025/07/11

- 버전 컨트롤
- 실제 앱 기능 추가
- ideas: pdf reader, rich text editor, a windows game
- useIndexedDB for file system v1 -> browserfs v2
- 시작 메뉴
- 바탕화면 파일
- 바탕화면 월페이퍼
-

2025/06/21

- 기존 라우팅 제거 RndTester를 렌더링함.
- 모바일 이슈: 바텀 navigation bar 세이프에리어 해결 중. 설치했을 때 적용 안되는 이슈.
  https://webkit.org/blog/7929/designing-websites-for-iphone-x/
  에 따르면, 지금 app.css 안의 코드로 바텀 위치가 잡혀야 함. 만약 해결 안된다면, 억지로 기기를 잡아서 55px 패딩을 먹일 것.

2025/06/20

- Windows zindex 로직 구현 중.
- 새 윈도우 아이디 문제 해결필요

1.  Object.entries 식 렌더로 삭제시에도 이전 레퍼런스가 남아있다면 해결. // 현재 이 방식.
2.  Window 종합 wrapper 를 통해 Window를 한단계 감싸서 memo한다면 괜찮지 않을지? -> 언젠가 확인

2025/06/19

- 윈도우 래퍼, 컴포넌트 lazy load 구조.
- tailwinds 변수 및 constants 변수를 같이 못쓰는 경우 생각해야 함. Rnd 기반이라 tailwinds 변수를 css 파일 내부에서 인터셉트하는게 좋아보이지 않음... Styled-components를 쓰는게 나았을 수 있음.

2025/06/07

- PoC

  - Windows 95 themed interactive PWA
  - Window handling
    - RND
    - Task management - determine data management procedure.
  - Some functionalities...

- Todos:

  - 시작메뉴 바텀 패딩 추가로 인한 스타일 다시 잡기.
  - 아이콘들 AI로 만들어서 다 쓸수 있을듯?
  - Define user stories, Using Playwright would be good idea.
  - SEO
  - IndexedDB handler or not.
  - Design System + Library
  - Find Windows Header icons - minimize, maximize, close
  - Window size calculation - disable responsiveness
  - favicon? -> check all environments

- done:

  - Windows powershell icon generation error
  - icons - check docs
  - mobile - windows size limited by innerwidth\
  - mobile onClick

  - Get Taskbar Design & color
  - Remote control & shocase for dev mode: Can I not use router library?

- Settled(mostly regarding free resources):

  - ico set https://archive.org/details/windows-95-all-icons
  - Theme ui
    https://themesberg.com/product/ui-kit/windows-95-ui-kit

- Just record everything I pirated...

https://github.com/askides/clean-architecture-react
https://github.com/DustinBrett/daedalOS

- fixing vite path variable along with tsconfig.json
  https://stackoverflow.com/questions/77249074/how-do-i-use-typescript-path-aliases-in-vite

- sementic color convention
  https://designsystem.line.me/LDSM/foundation/color/line-semantic-colors-ex-en

- Windows95 codepen theme

https://codepen.io/gabriellewee/pen/MWqRZzp

- pseudo double border
  https://blog.logrocket.com/how-to-create-double-border-css/

- web windows95 emulator
  https://copy.sh/v86/?profile=windows95

- electron windows95
  https://github.com/felixrieseberg/windows95?tab=readme-ov-file

- mineSweeper
  https://codepen.io/kfalencik/pen/LYrpdPp

- React exhaustiveDeps
  https://www.reddit.com/r/reactjs/comments/1jsvggd/is_it_me_or_is_reacthooksexhaustivedeps/

  https://www.dhiwise.com/post/mastering-react-iterate-over-object-a-comprehensive-guide

- When to use useLayoutEffect - when dom need to be mutated before DOM measurements!
  https://kentcdodds.com/blog/useeffect-vs-uselayouteffect

- pdfjs-example
  https://mozilla.github.io/pdf.js/examples/

- pdfjs-react-exp
  https://codesandbox.io/p/sandbox/pdf-viewer-w7wpu?file=%2Fsrc%2FPdfUrlViewer.js

코드 구조:
Inspired by [Colocation by Kent C. Dodds](https://kentcdodds.com/blog/colocation)
