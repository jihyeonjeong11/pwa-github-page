import { lazy } from "react";
import { BaseWindowType, ProgramsType } from "./types";
import {
  DEFAULT_GAME_HEIGHT,
  DEFAULT_GAME_WIDTH,
} from "@/components/programs/games/minesweeper";
import { DEFAULT_WINDOW_SIZE } from "@/constants";
import { JsDos, PdfIcon, TipTap } from "@/images";

const baseWindow: BaseWindowType = {
  allowResizing: true,
  minimized: false,
  maximized: false,
  focused: false,
};

// todo: dynamic import will not move module into another chunk. vite:reporter warning
// todo: add icons
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
  PdfReader: {
    ...baseWindow,
    name: "pdf-reader",
    Component: lazy(() => import("@/components/programs/pdfReader/index")),
    width: DEFAULT_WINDOW_SIZE.width,
    height: DEFAULT_WINDOW_SIZE.height,
    icon: PdfIcon,
  },
  TipTap: {
    ...baseWindow,
    name: "tiptap",
    Component: lazy(() => import("@/components/programs/pdfReader/index")),
    width: DEFAULT_WINDOW_SIZE.width,
    height: DEFAULT_WINDOW_SIZE.height,
    icon: TipTap,
  },
  JSDOS: {
    ...baseWindow,
    name: "Js-dos",
    Component: lazy(() => import("@/components/programs/jsdos/index")),
    icon: JsDos,
    libs: [
      "src/Program Files/js-dos/js-dos.js",
      "src/Program Files/js-dos/js-dos-css.css",
      // "src/Program Files/js-dos/emulators-ui.js",
      "src/Program Files/js-dos/emulators.js",
      //"src/Program Files/js-dos/wdosbox.wasm",
    ],
  },
};

export default programs;
