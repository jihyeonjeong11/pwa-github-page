import { Window, WindowHeader } from "@/components/ui/Window";
import { Button } from "../../ui/Button";
import { Minimize, Maximize, Close } from "@/components/ui/NavigationIcons";
import { Rnd, Props } from "react-rnd";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_WINDOW_SIZE, MIN_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useWindowTransition } from "@/components/WIndow.tsx/useWindowTransition";

type WindowType = {
  minimized: boolean;
  maximized: boolean;
  name: string;
  id: string;

  // name, id, icon?
};

export type RndDefaultProps = NonNullable<Props["default"]> & WindowType;

const windowVariants = {
  initial: {
    backgroundColor: "none",
    x: "calc(50vw - 50%)", // Center horizontally relative to viewport
    y: "calc(50vh - 50%)", // Center vertically relative to viewport
  },
  open: {},
  minimized: {},
  maximized: {
    backgroundColor: "green",
    x: 0, // Move to left edge (0 offset from original left)
    y: 0, // Move to top edge (0 offset from original top)
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const resizePoints = {
  right: true,
  left: true,
  top: true,
  bottom: true,
  topLeft: true,
  topRight: true,
  bottomLeft: true,
  bottomRight: true,
};

function RndTester() {
  const [state, setState] = useState<
    "open" | "minimized" | "maximized" | "restored"
  >("open");

  const generateWindow = useCallback(() => {
    const x = (window.innerWidth - DEFAULT_WINDOW_SIZE.width) / 2;
    const y = (window.innerHeight - DEFAULT_WINDOW_SIZE.height) / 2;

    return {
      x,
      y,
      width: DEFAULT_WINDOW_SIZE.width,
      height: DEFAULT_WINDOW_SIZE.height,
      minimized: false,
      maximized: false,
      name: "test-window",
      id: `test-${1}`,
    };
  }, []);

  const [entries, setEntries] = useState<RndDefaultProps[]>([generateWindow()]);
  const [scope, animate] = useAnimate();
  // todo: motion props return
  const windowTransition = useWindowTransition(entries[0]);

  useEffect(() => {}, [entries]);

  useEffect(() => {
    setEntries(() => [generateWindow()]);
  }, []);

  function minimize() {
    setEntries([
      {
        ...entries[0],
        minimized: !entries[0].minimized,
      },
    ]);
  }

  function maximize() {
    setEntries([
      {
        ...entries[0],
        maximized: !entries[0].maximized,
      },
    ]);
  }

  return (
    <div id="app">
      <h1 className="pb-4">This is Rnd testing window.</h1>
      {entries.map((e) => {
        return (
          // todo: add zIndex for multiple windows

          <Window
            key={"window"}
            ref={scope}
            {...windowTransition}
            // animate={e.minimized ? "minimize" : ""}
            // variants={{ minimize: { x: 500 } }}
            className="w-64 h-64"
          >
            <WindowHeader className="justify-between">
              <div className="grow min-w-0 overflow-hidden">
                {/* <p>This is showcase window with header buttons.</p> */}
                {e.maximized ? "max" : "min"}
              </div>
              <nav className="flex gap-1 shrink-0">
                <Button
                  onClick={minimize}
                  variant={"primary"}
                  className={"p-0 w-[22px] flex items-center justify-center"}
                >
                  <Minimize />
                </Button>
                <Button
                  onClick={maximize}
                  variant={"primary"}
                  className={"p-0 w-[22px] flex items-center justify-center"}
                >
                  <Maximize />
                </Button>
                <Button
                  //onClick={close}
                  variant={"primary"}
                  className={"p-0 w-[22px] flex items-center justify-center"}
                >
                  <Close />
                </Button>
              </nav>
            </WindowHeader>
          </Window>
        );
      })}
      <Taskbar entries={entries} />
    </div>
  );
}

export default RndTester;
