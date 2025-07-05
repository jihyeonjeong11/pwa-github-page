import { lazy } from "react";
import { BaseWindowType, ProgramsType } from "./types";
import {
  DEFAULT_GAME_HEIGHT,
  DEFAULT_GAME_WIDTH,
} from "@/components/programs/games/minesweeper";
import { DEFAULT_WINDOW_SIZE } from "@/constants";

const baseWindow: BaseWindowType = {
  allowResizing: true,
  minimized: false,
  maximized: false,
  focused: false,
};

// todo: dynamic import will not move module into another chunk. vite:reporter warning
const programs: ProgramsType = {
  Editor: {
    ...baseWindow,
    Component: lazy(() => import("@/components/programs/editor/index")),
    width: DEFAULT_WINDOW_SIZE.width,
    height: DEFAULT_WINDOW_SIZE.height,
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
