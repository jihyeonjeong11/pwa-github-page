import { lazy } from "react";
import { BaseWindowType, ProgramsType } from "./types";

const baseWindow: BaseWindowType = {
  allowResizing: true,
  minimized: false,
  maximized: false,
  focused: false,
};

const programs: ProgramsType = {
  Editor: {
    ...baseWindow,
    Component: lazy(() => import("@/components/programs/editor/index")),
    name: "test-editor",
  },
  Minesweeper: {
    ...baseWindow,
    allowResizing: false,
    Component: lazy(() => import("@/components/programs/games/minesweeper")),
    name: "test-minesweeper",
  },
};

export default programs;
