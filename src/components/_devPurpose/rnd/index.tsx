import Window from "@/components/Window";
import { DraggableData, Position, ResizableDelta } from "react-rnd";
import { useState } from "react";
import { DEFAULT_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
import { Button } from "@/components/ui/Button";
import { DraggableEvent } from "react-draggable";
import programs from "@/components/programs/programs";

import {
  ProgramType,
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

// todo: 핸들러 다른 파일로 빼기
const generateWindow = (program: ProgramType, newId: number): RndWindowType => {
  const { width, height } = determineDefaultWindowSize();
  const x = (window.innerWidth - width) / 2;
  const y = (window.innerHeight - height) / 2;
  return {
    // rnd props
    x,
    y,
    width: program.width ? program.width : width,
    height: program.height ? program.height : height,
    // Window props
    minimized: false,
    maximized: false,
    allowResizing: program.allowResizing,
    focused: false,
    // Component Props
    name: program.name,
    id: `${program.name}-${newId}`,
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
    if (!id && entryObjects[id].minimized) return;
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

  function addNewWindow(k: string) {
    const lastEntry = Object.entries(entryObjects).pop();
    const newId = lastEntry ? Number(lastEntry[1].id.split("-").pop()) + 1 : 1;
    const generated = generateWindow(programs[k], newId);
    setEntryObjects((p) => ({ ...p, [generated.id]: { ...generated } }));
    focus(generated.id);
  }

  // zindex length
  function restoreFromMinimize(id: string) {
    setEntryObjects((p) => {
      const newObj = Object.fromEntries(
        Object.entries(p).map(([key, value]) => [
          key,
          {
            ...value,
            minimized: key === id ? !value.minimized : value.minimized,
            focused: key === id,
          },
        ])
      );
      return newObj;
    });
  }

  function minimize(id: string) {
    setEntryObjects((p) => {
      const newObj = {
        ...p,
        [id]: { ...p[id], minimized: true, focused: false },
      };
      return newObj;
    });
  }

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
      <h1 className="pb-4">Rnd functionality testing page.</h1>
      <div className="flex flex-col items-center">
        {Object.entries(programs).map(([k, v]) => (
          <Button
            key={k + "button"}
            onClick={() => addNewWindow(k)}
            className="my-4 w-[300px]"
          >
            Add {v.name}
          </Button>
        ))}
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
