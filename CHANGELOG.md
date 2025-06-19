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

  - Define user stories, Using Playwright would be good idea.
  - SEO
  - IndexedDB handler or not.
  - Design System + Library
  - Windows powershell icon generation error - consider using wls || docker
  - Find Windows Header icons - minimize, maximize, close
  - Window size calculation - disable responsiveness
  - favicon? -> check all environments

- done:

  - icons - check docs
  - mobile - windows size limited by innerwidth\
  - mobile onClick - use touchstart

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

코드 구조:
Inspired by [Colocation by Kent C. Dodds](https://kentcdodds.com/blog/colocation)
