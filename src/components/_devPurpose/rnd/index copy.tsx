import { Window, WindowHeader } from "@/components/ui/Window";
import { Button } from "../../ui/Button";
import { Minimize, Maximize, Close } from "@/components/ui/NavigationIcons";
import { Rnd, Props } from "react-rnd";
import { useEffect, useState } from "react";
import { DEFAULT_WINDOW_SIZE, MIN_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
import { AnimatePresence, motion, useAnimate } from "motion/react";

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
    // handle miximized -> go back to original size and position
  },
  open: {},
  minimized: {},
  maximized: {
    x: 0,
    y: 0,
    width: "100vw",
    height: "100vh",
    scale: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
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

  const [entries, setEntries] = useState<RndDefaultProps[]>([]);
  const [scope, animate] = useAnimate();

  function generateWindow() {
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
      id: `test-${entries.length}`,
    };
  }

  useEffect(() => {}, [entries]);

  useEffect(() => {
    setEntries(() => [generateWindow()]);
  }, []);

  function minimize() {
    setEntries((prev) => {
      return prev.map((p) => {
        return {
          ...p,
          width: 0,
          height: 0,
          minimized: true,
        };
      });
    });
  }

  function maximize() {
    setEntries((prev) => {
      return prev.map((p) => {
        if (p.maximized) {
          return generateWindow();
        } else {
          return {
            ...p,
            // x: 0,
            // y: 0,
            // width: window.innerWidth,
            // height: window.innerHeight,
            maximized: true,
          };
        }
      });
    });
  }
  function close() {
    setEntries([]);
  }

  return (
    <div id="app">
      <h1 className="pb-4">This is Rnd testing window.</h1>

      {entries.map((e, i) => (
        // todo: add zIndex for multiple windows
        <Rnd
          className={e.minimized ? "opacity-0" : ""}
          id={"window-" + i}
          position={{
            x: e.x,
            y: e.y,
          }}
          onDragStop={(e, d) => {
            const updated = [...entries];
            updated[i] = { ...updated[i], x: d.x, y: d.y };
            setEntries(updated);
          }}
          onResizeStop={(e, dir, ref, delta, position) => {
            const updated = [...entries];
            updated[i] = {
              ...updated[i],
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              ...position,
            };
            setEntries(updated);
          }}
          disableDragging={e.maximized}
          size={{ width: e.width, height: e.height }}
          minHeight={MIN_WINDOW_SIZE.height}
          minWidth={MIN_WINDOW_SIZE.width}
          enableResizing={resizePoints}
        >
          <AnimatePresence>
            <Window
              initial={false}
              animate={e.maximized ? "maximized" : "minimized"}
              ref={scope}
              variants={windowVariants}
            >
              <WindowHeader className="justify-between">
                <div className="grow min-w-0 overflow-hidden">
                  {/* <p>This is showcase window with header buttons.</p> */}
                  {e.maximized ? "max" : "min"}
                </div>
                <nav className="flex gap-1 shrink-0">
                  <Button
                    //onClick={minimize}
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
              <motion.div className="flex h-full justify-center items-center">
                {/* todo: ref size listener  */}
                <textarea
                  placeholder="put any texteditor in here"
                  className="bg-white w-[calc(100%-30px)] h-[400px]"
                />
              </motion.div>
            </Window>
          </AnimatePresence>
        </Rnd>
      ))}
      <Taskbar entries={entries} />
    </div>
  );
}

export default RndTester;
