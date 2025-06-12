import Window from "@/components/Window";
import { Rnd, Props } from "react-rnd";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_WINDOW_SIZE, MIN_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
// todo: functions.ts? 페이지에 종속시키는게 나을지?
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
    x: "calc(50vw - 50%)",
    y: "calc(50vh - 50%)",
  },
  open: {},
  minimized: {},
  maximized: {
    backgroundColor: "green",
    x: 0,
    y: 0,
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
  // todo: motion props return, seperate it for singleton multiple window instances
  const windowTransition = useWindowTransition(entries);

  useEffect(() => {}, [entries]);

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
      {/* todo: debugging panal */}
      {entries.map((e) => {
        return <div key="coords">{`x: ${e.x} y: ${e.y}`}</div>;
      })}
      {entries.map((e, i) => {
        return (
          // todo: add zIndex for multiple windows
          <Rnd
            key={"window-" + i}
            position={{
              x: e.x,
              y: e.y,
            }}
            onDragStop={(_event, { x, y }) => {
              // 위치 업데이트
              const updated = [...entries];
              updated[i] = { ...updated[i], x: x, y: y };
              setEntries(updated);
            }}
            onResizeStop={(e, dir, ref, delta, position) => {
              // 사이즈 업데이트
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
            <Window entry={e} minimize={minimize} maximize={maximize} />
          </Rnd>
        );
      })}
      <Taskbar entries={entries} />
    </div>
  );
}

export default RndTester;
