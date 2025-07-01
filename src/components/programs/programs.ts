import { lazy } from "react";
import { BaseWindowType, ProgramsType } from "./types";
import {
  DEFAULT_GAME_HEIGHT,
  DEFAULT_GAME_WIDTH,
} from "@/components/programs/games/minesweeper";

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
    width: DEFAULT_GAME_WIDTH,
    height: DEFAULT_GAME_HEIGHT,
    name: "test-minesweeper",
  },
  MemeGenerator: {
    ...baseWindow,
    Component: lazy(() => import("@/components/programs/memeGenerator/index")),
    name: "meme-generator",
  },
};

export default programs;
