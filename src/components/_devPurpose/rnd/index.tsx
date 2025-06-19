import Window from "@/components/Window";
import { DraggableData, Position, Props, ResizableDelta } from "react-rnd";
import { JSX, useState } from "react";
import { DEFAULT_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
import { Button } from "@/components/ui/Button";
import RndWindow from "@/components/Window/RndWindow";
import { DraggableEvent } from "react-draggable";
import programs from "@/components/programs/programs";

import AppRenderer from "@/components/programs/AppRenderer";
import {
  DEFAULT_GAME_HEIGHT,
  DEFAULT_GAME_WIDTH,
} from "@/components/programs/games/minesweeper";
// todo: functions.ts? 페이지에 종속시키는게 나을지?
// titlebar 펑션 넣기 - 포커스, 더블클릭
type WindowType = {
  minimized: boolean;
  maximized: boolean;
  name: string;
  id: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
  // todo: temp solution
  focused: boolean;
};

export type ResizeDirection =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topRight"
  | "bottomRight"
  | "bottomLeft"
  | "topLeft";

// todo: not Default anymore chagne name
export type RndDefaultProps = NonNullable<Props["default"]> & WindowType;

function handleRestUnfocus(entries: RndDefaultProps[]) {
  return entries.map((e) => ({ ...e, focused: false }));
}

function handleSplice(entries: RndDefaultProps[], id: string) {
  return entries.filter((e) => e.id !== id);
}

function determineDefaultWindowSize() {
  // todo: Write isMobile hook
  if (window.innerWidth < DEFAULT_WINDOW_SIZE.width) {
    return {
      width: window.innerWidth,
      height: window.innerWidth - 100,
    };
  }
  return DEFAULT_WINDOW_SIZE;
}

function determineGamewindowSize() {
  return { width: DEFAULT_GAME_WIDTH, height: DEFAULT_GAME_HEIGHT };
}

const generateWindow = (length = 1) => {
  const { width, height } = determineDefaultWindowSize();
  const Program = programs["Editor"];
  const x = (window.innerWidth - width) / 2;
  const y = (window.innerHeight - height) / 2;

  return {
    x,
    y,
    width: width,
    height: height,
    minimized: false,
    maximized: false,
    name: "test-window",
    id: `test-${length}`,
    focused: true,
    Component: Program.Component,
  };
};

const generateMineSweeper = (length = 1) => {
  const { width, height } = determineGamewindowSize();

  const x = (window.innerWidth - width) / 2;
  const y = (window.innerHeight - height) / 2;
  const Program = programs.Minesweeper;
  return {
    x,
    y,
    width: width,
    height: height,
    minimized: false,
    maximized: false,
    name: "minesweeper",
    id: `game-${length}`,
    Component: Program.Component,
    focused: true,
  };
};

function RndTester() {
  const [entries, setEntries] = useState<RndDefaultProps[]>([
    generateWindow(1),
  ]);

  function restoreFromMinimize(id: string) {
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? true : false,
        minimized: id === e.id ? !e.minimized : e.minimized,
      }))
    );
  }

  function minimize(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: false,
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
        maximized: id === e.id ? !e.maximized : false,
      }))
    );
  }

  function focus(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? true : false,
      }))
    );
  }

  function close(id = "") {
    if (!id) return;
    setEntries((p) => handleSplice(p, id));
  }

  // todo:strutural: useRnd hook
  function onDragStop(_event: DraggableEvent, data: Partial<DraggableData>) {
    return function (id: string) {
      setEntries((p) =>
        p.map((e) => ({
          ...e,
          x: e.id === id && data.x ? data.x : e.x,
          y: e.id === id && data.y ? data.y : e.y,
        }))
      );
    };
  }

  const onResizeStop =
    (
      _e: MouseEvent | TouchEvent,
      _dir: ResizeDirection,
      _ref: HTMLElement,
      _delta: ResizableDelta,
      _position: Position
    ) =>
    (id: string) => {
      setEntries((p) =>
        p.map((e) => ({
          ...e,
          width: e.id === id ? _ref.offsetWidth : e.width,
          height: e.id === id ? _ref.offsetHeight : e.height,
          x: e.id === id ? _position.x : e.x,
          y: e.id === id ? _position.y : e.y,
        }))
      );
    };

  return (
    <div id="app">
      <h1 className="pb-4">This is Rnd testing window.</h1>
      {/* todo: debugging panal */}
      <>
        {entries.map((e) => {
          return <div key={`coords + ${e.id}`}>{`x: ${e.x} y: ${e.y}`}</div>;
        })}
        <div className="flex flex-col items-center">
          <Button
            onMouseDown={() =>
              setEntries((p) => [
                ...handleRestUnfocus(p),
                generateWindow(p.length + 1),
              ])
            }
            className="my-4 w-[300px]"
          >
            Add new window
          </Button>
          <Button
            onMouseDown={() =>
              setEntries((p) => [
                ...handleRestUnfocus(p),
                generateMineSweeper(p.length + 1),
              ])
            }
            className="my-4 w-[300px]"
          >
            Add new minesweeper
          </Button>
        </div>
      </>
      {entries.map((e, i) => {
        console.log(e);
        return (
          <RndWindow
            key={"window-" + i}
            entry={e}
            focus={focus}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
          >
            <Window
              entry={e}
              minimize={minimize}
              maximize={maximize}
              close={close}
              onClickFocusElement={focus}
            >
              <AppRenderer Component={e.Component} />
            </Window>
          </RndWindow>
        );
      })}
      <Taskbar
        entries={entries}
        restoreFromMinimize={restoreFromMinimize}
        focus={focus}
        maximize={maximize}
      />
    </div>
  );
}

export default RndTester;
