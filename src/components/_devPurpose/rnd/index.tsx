import Window from "@/components/Window";
import { Rnd, Props } from "react-rnd";
import { useState } from "react";
import { DEFAULT_WINDOW_SIZE, MIN_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
import { Button } from "@/components/ui/Button";
// todo: functions.ts? 페이지에 종속시키는게 나을지?
// todo: RND 부분 따로 빼기 SOC
// titlebar 펑션 넣기 - 포커스, 더블클릭
// 포커스 - 윈도우 하나 이상, z-index
type WindowType = {
  minimized: boolean;
  maximized: boolean;
  name: string;
  id: string;
  // todo: temp solution
  focused: boolean;
};

export type RndDefaultProps = NonNullable<Props["default"]> & WindowType;

export const RESIZING_DISABLED = {
  bottom: false,
  bottomLeft: false,
  bottomRight: false,
  left: false,
  right: false,
  top: false,
  topLeft: false,
  topRight: false,
};

export const RESIZING_ENABLED = {
  bottom: true,
  bottomLeft: true,
  bottomRight: true,
  left: true,
  right: true,
  top: true,
  topLeft: true,
  topRight: true,
};

function handleRestUnfocus(entries: RndDefaultProps[]) {
  return entries.map((e) => ({ ...e, focused: false }));
}

function handleSplice(entries: RndDefaultProps[], id: string) {
  return entries.filter((e) => e.id !== id);
}

const generateWindow = (length = 1) => {
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
    id: `test-${length}`,
    focused: true,
  };
};

function RndTester() {
  const [entries, setEntries] = useState<RndDefaultProps[]>([
    generateWindow(1),
  ]);

  function handleTaskbarAction(entry: RndDefaultProps) {
    if (entry.minimized) {
      setEntries((p) =>
        p.map((e) => {
          if (e.id === entry.id) {
            return {
              ...e,
              minimized: false,
            };
          } else {
            return e;
          }
        })
      );
    }
  }

  function minimize(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? false : e.focused,
        minimized: id === e.id ? !e.minimized : e.minimized,
      }))
    );
  }

  function maximize(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? true : false,
        maximized: id === e.id ? !e.maximized : e.maximized,
      }))
    );
  }

  function close(id = "") {
    if (!id) return;
    setEntries((p) => handleSplice(p, id));
  }

  function onClickFocusElement(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({ ...e, focused: id === e.id ? true : false }))
    );
  }

  return (
    <div id="app">
      <h1 className="pb-4">This is Rnd testing window.</h1>
      {/* todo: debugging panal */}
      {entries.map((e) => {
        return <div key="coords">{`x: ${e.x} y: ${e.y}`}</div>;
      })}
      <Button
        onClick={() =>
          setEntries((p) => [
            ...handleRestUnfocus(p),
            generateWindow(p.length + 1),
          ])
        }
        className="my-4"
      >
        Add new window
      </Button>
      {entries.map((e, i) => {
        return (
          // todo: add zIndex for multiple windows
          <Rnd
            style={{ zIndex: e.minimized ? -1 : e.focused ? 3 : 1 }}
            key={"window-" + i}
            position={{
              x: e.x,
              y: e.y,
            }}
            onDragStart={() => {
              // todo: focus
            }}
            onDragStop={(_event, { x, y }) => {
              // 위치 업데이트
              const updated = [...entries];
              updated[i] = { ...updated[i], x: x, y: y };
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
            zIndex={e.minimized ? 1 : e.focused ? 3 : 2}
            size={{ width: e.width, height: e.height }}
            minHeight={MIN_WINDOW_SIZE.height}
            minWidth={MIN_WINDOW_SIZE.width}
            enableResizing={
              e.minimized || e.maximized ? RESIZING_DISABLED : RESIZING_ENABLED
            }
            disableDragging={e.maximized || e.minimized}
          >
            <Window
              entry={e}
              minimize={minimize}
              maximize={maximize}
              close={close}
              onClickFocusElement={onClickFocusElement}
            />
          </Rnd>
        );
      })}
      <Taskbar entries={entries} handleTaskbarAction={handleTaskbarAction} />
    </div>
  );
}

export default RndTester;
