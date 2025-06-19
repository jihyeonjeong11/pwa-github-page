// todo: 윈도우 관련 모든 값 여기서 컨트롤 해야 함.
import { lazy } from "react";

const programs = {
  Editor: {
    allowResizing: true,
    Component: lazy(() => import("@/components/programs/editor/index")),
  },
  Minesweeper: {
    allowResizing: false,
    Component: lazy(() => import("@/components/programs/games/minesweeper")),
  },
};

export default programs;
