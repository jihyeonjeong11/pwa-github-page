import Window from "@/components/Window";
import { DraggableData, Position, ResizableDelta } from "react-rnd";
import { useContext, useState } from "react";
import Taskbar from "@/components/taskbar";
import { Button } from "@/components/ui/Button";
import { DraggableEvent } from "react-draggable";
import programs from "@/components/programs/programs";

import {
  ResizeDirection,
  RndWindowEntriesType,
} from "@/components/programs/types";
import { useWindowStackOrder } from "@/hooks/useWindowStackOrder";
import { ProcessContext } from "@/contexts/ProcessProvider";

const showWallpaper = false; // todo: use hook
// function determineDefaultWindowSize() {
//   // todo: Write isMobile hook
//   if (window.innerWidth < DEFAULT_WINDOW_SIZE.width) {
//     return {
//       width: window.innerWidth,
//       height: window.innerWidth - 100,
//     };
//   }
//   return DEFAULT_WINDOW_SIZE;
// }

function RndTester() {
  // todo: Window 하나당 singleton을 위해 context 도입하기 및 useHook 만들기.
  const [entryObjects, setEntryObjects] = useState<RndWindowEntriesType>(
    {} as RndWindowEntriesType
  );
  const { order } = useWindowStackOrder(entryObjects);
  const { processes, open } = useContext(ProcessContext);

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
    <div
      id="app"
      style={{
        backgroundImage: showWallpaper
          ? "url(https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?crop=entropy&fit=crop)"
          : "",
      }}
    >
      <h1 className="pb-4">Rnd functionality testing page.</h1>
      <div className="flex flex-col items-center">
        {Object.entries(programs).map(([k, v]) => (
          <Button
            key={k + "button"}
            onClick={(e) => {
              e.preventDefault();
              open(v);
            }}
            className="my-4 w-[300px]"
          >
            Add {v.name}
          </Button>
        ))}
      </div>

      {processes.map((process) => {
        return (
          <Window
            order={order}
            key={process.id}
            entry={process}
            focus={focus}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            minimize={minimize}
            maximize={maximize}
            close={close}
          />
        );
      })}

      {/* {Object.entries(entryObjects).map(([id, e]) => {
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
      })} */}
      <Taskbar
        entries={processes}
        restoreFromMinimize={restoreFromMinimize}
        focus={focus}
        maximize={maximize}
      />
    </div>
  );
}

export default RndTester;
