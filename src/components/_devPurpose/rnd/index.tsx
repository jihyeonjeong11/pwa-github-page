import Window from "@/components/Window";
import { DraggableData, Position, ResizableDelta } from "react-rnd";
import { useState } from "react";
import { DEFAULT_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
import { Button } from "@/components/ui/Button";
import { DraggableEvent } from "react-draggable";
import programs from "@/components/programs/programs";
import {
  DEFAULT_GAME_HEIGHT,
  DEFAULT_GAME_WIDTH,
} from "@/components/programs/games/minesweeper";
import {
  ResizeDirection,
  RndWindowEntriesType,
  RndWindowType,
} from "@/components/programs/types";
import { useWindowStackOrder } from "@/hooks/useWindowStackOrder";
// todo: 창 닫기 시 minimize나 maximize 애니메이션이 한번 더 출력. CHANGELOG 참고.

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
    focused: false,
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
    focused: false,
    allowResizing: program.allowResizing,
    // Component props
    name: program.name,
    id: `${program.name}-${length}`,
    Component: program.Component,
  };
};

function RndTester() {
  // todo: Window 하나당 singleton을 위해 context 도입하기 및 useHook 만들기.
  const [entryObjects, setEntryObjects] = useState<RndWindowEntriesType>(
    {} as RndWindowEntriesType
  );
  const { order } = useWindowStackOrder(entryObjects);

  function focus(id = "") {
    if (!id) return;
    setEntryObjects((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([entryId, entry]) => [
          entryId,
          {
            ...entry,
            focused: entryId === id,
          },
        ])
      )
    );
  }

  function addNewWindow(isTextArea: boolean) {
    const lastEntry = Object.entries(entryObjects).pop();
    if (!lastEntry) {
      const generated = isTextArea ? generateWindow(1) : generateMineSweeper(1);
      setEntryObjects((p) => ({ ...p, [generated.id]: { ...generated } }));
    } else {
      // todo: 더 나은 방법이 있을지?
      const [id] = lastEntry;

      const number = Number(id.split("-").pop());

      const generated = isTextArea
        ? generateWindow(Number(number) + 1)
        : generateMineSweeper(Number(number) + 1);
      setEntryObjects((p) => ({ ...p, [generated.id]: { ...generated } }));
      focus(generated.id);
    }
  }

  // zindex length
  function restoreFromMinimize(id: string) {
    setEntryObjects((p) => {
      const newObj = {
        ...p,
        [id]: { ...p[id], minimized: !p[id].minimized, focused: true },
      };
      return newObj;
    });
  }

  // todo: zindex 0
  function minimize(id: string) {
    setEntryObjects((p) => {
      const newObj = {
        ...p,
        [id]: { ...p[id], minimized: true, focused: false },
      };
      return newObj;
    });
  }

  // todo: zindex length
  function maximize(id: string) {
    setEntryObjects((p) => {
      const newObj = {
        ...p,
        [id]: { ...p[id], maximized: !p[id].maximized },
      };
      return newObj;
    });
  }

  function close(id = "") {
    if (!id) return;
    setEntryObjects((p) =>
      Object.fromEntries(
        Object.entries(p).filter(([entryId]) => entryId !== id)
      )
    );
  }
  function onDragStop(_event: DraggableEvent, data: Partial<DraggableData>) {
    return function (id: string) {
      setEntryObjects((p) => {
        return {
          ...p,
          [id]: {
            ...p[id],
            x: data.x!,
            y: data.y!,
          },
        };
      });
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
      setEntryObjects((p) => {
        return {
          ...p,
          [id]: {
            ...p[id],
            width: _ref.offsetWidth,
            height: _ref.offsetHeight,
            x: _position.x,
            y: _position.y,
          },
        };
      });
    };

  return (
    <div id="app">
      <h1 className="pb-4">This is Rnd testing window.</h1>
      <>
        {/* 디버그 패널  */}
        {/* {entries.map((e) => {
          return (
            <div key={`coords-${e.id}`}>{`focused: ${
              e.focused ? "true" : "false"
            } x: ${e.x} y: ${e.y}`}</div>
          );
        })} */}
      </>
      <div className="flex flex-col items-center">
        <Button onClick={() => addNewWindow(true)} className="my-4 w-[300px]">
          Add new window
        </Button>
        <Button onClick={() => addNewWindow(false)} className="my-4 w-[300px]">
          Add new minesweeper
        </Button>
      </div>

      {Object.entries(entryObjects).map(([id, e]) => {
        // 진짜 작업시에는 컨텍스트 + 훅으로 처리할 예정.
        return (
          <Window
            order={order}
            key={"rnd" + id}
            entry={e}
            focus={focus}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            minimize={minimize}
            maximize={maximize}
            close={close}
          />
        );
      })}
      <Taskbar
        entries={entryObjects}
        restoreFromMinimize={restoreFromMinimize}
        focus={focus}
        maximize={maximize}
      />
    </div>
  );
}

export default RndTester;
