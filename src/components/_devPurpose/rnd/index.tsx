import Window from "@/components/Window";
import { DraggableData, Position, ResizableDelta } from "react-rnd";
import { useRef, useState } from "react";
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
import { RndWindowsType, RndWindowType } from "@/components/programs/types";
import { useWindowStackOrder } from "@/hooks/useWindowStackOrder";
// todo: functions.ts? 페이지에 종속시키는게 나을지?
// titlebar 펑션 넣기 - 포커스, 더블클릭

// todo: 창 닫기 시 minimize나 maximize 애니메이션이 한번 더 출력.

export type ResizeDirection =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topRight"
  | "bottomRight"
  | "bottomLeft"
  | "topLeft";

function handleRestUnfocus(entries: RndWindowsType) {
  return entries.map((e) => ({ ...e, focused: false }));
}

function handleSplice(entries: RndWindowsType, id: string) {
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
  // todo: 스타일 변수 css와 constants 두개로 저장하기.
  return { width: DEFAULT_GAME_WIDTH, height: DEFAULT_GAME_HEIGHT };
}

// todo: 핸들러 다른 파일로 빼기
const generateWindow = (length = 1): RndWindowType => {
  const { width, height } = determineDefaultWindowSize();
  const program = programs["Editor"];
  const x = (window.innerWidth - width) / 2;
  const y = (window.innerHeight - height) / 2;
  return {
    // rnd props
    x,
    y,
    width: width,
    height: height,
    // Window props
    minimized: false,
    maximized: false,
    allowResizing: program.allowResizing,
    focused: true,
    // Component Props
    name: program.name,
    id: `${program.name}-${length}`,
    Component: program.Component,
  };
};

const generateMineSweeper = (length = 1) => {
  const { width, height } = determineGamewindowSize();
  const x = (window.innerWidth - width) / 2;
  const y = (window.innerHeight - height) / 2;
  const program = programs.Minesweeper;
  return {
    // Rnd props
    x,
    y,
    width: width,
    height: height,
    // Window props
    minimized: false,
    maximized: false,
    focused: true,
    allowResizing: program.allowResizing,
    // Component props
    name: program.name,
    id: `${program.name}-${length}`,
    Component: program.Component,
  };
};

function RndTester() {
  // todo: Window 하나당 singleton을 위해 context 도입하기 및 useHook 만들기.
  const [entries, setEntries] = useState<RndWindowType[]>([]);
  const { order } = useWindowStackOrder(entries);
  const closing = useRef<boolean>(false);

  // zindex length
  function restoreFromMinimize(id: string) {
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? true : false,
        minimized: id === e.id ? !e.minimized : e.minimized,
      }))
    );
  }

  // todo: zindex 0
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

  // todo: zindex length
  function focus(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? true : false,
      }))
    );
  }

  // todo: zindex length
  function maximize(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        maximized: id === e.id ? !e.maximized : e.maximized,
      }))
    );
  }

  // zindex -1 for all, skip when zIndex === 0
  function close(id = "") {
    if (!id) return;
    setEntries((p) => handleSplice(p, id));
  }

  // todo: onClickCapture 필요할 수 있음. 포커스 -> 인터랙션일 경우, 클릭 이전 capture단계에서 포커스가 들어가야 함.

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
      {/* todo: 데이터 확정되면 여기 표시,  */}
      <>
        {entries.map((e) => {
          return (
            <div key={`coords-${e.id}`}>{`focused: ${
              e.focused ? "true" : "false"
            } x: ${e.x} y: ${e.y}`}</div>
          );
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
        // todo: 상태관리로 하나로 끝내기
        return (
          <RndWindow
            order={order}
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
              focus={focus}
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
