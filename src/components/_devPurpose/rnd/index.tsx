import Window from "@/components/Window";
import { useContext, useState } from "react";
import Taskbar from "@/components/taskbar";
import { Button } from "@/components/ui/Button";
import programs from "@/components/programs/programs";

import { RndWindowEntriesType } from "@/components/programs/types";
import { useWindowStackOrder } from "@/hooks/useWindowStackOrder";
import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";
import useWindowControl from "@/hooks/useWindowControl";
import { on } from "events";

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
  const { processes, open, position, size, minimize, maximize, restore } =
    useContext(ProcessContext);
  const {
    foreground,
    session: { foregroundId },
  } = useContext(SessionContext);

  // todo: handler goes to custom hook useWIndow

  // function close(id = "") {
  //   if (!id) return;
  //   setEntryObjects((p) =>
  //     Object.fromEntries(
  //       Object.entries(p).filter(([entryId]) => entryId !== id)
  //     )
  //   );
  // }
  // function onDragStop(_event: DraggableEvent, data: Partial<DraggableData>) {
  //   return function (id: string) {
  //     setEntryObjects((p) => {
  //       return {
  //         ...p,
  //         [id]: {
  //           ...p[id],
  //           x: data.x!,
  //           y: data.y!,
  //         },
  //       };
  //     });
  //   };
  // }

  // const onResizeStop =
  //   (
  //     _e: MouseEvent | TouchEvent,
  //     _dir: ResizeDirection,
  //     _ref: HTMLElement,
  //     _delta: ResizableDelta,
  //     _position: Position
  //   ) =>
  //   (id: string) => {
  //     setEntryObjects((p) => {
  //       return {
  //         ...p,
  //         [id]: {
  //           ...p[id],
  //           width: _ref.offsetWidth,
  //           height: _ref.offsetHeight,
  //           x: _position.x,
  //           y: _position.y,
  //         },
  //       };
  //     });
  //   };

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
            onClick={() => {
              const id = open(v);
              foreground(id);
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
            onDragStop={position(process.id)}
            onResizeStop={size(process.id)}
          />
        );
      })}

      <Taskbar />
    </div>
  );
}

export default RndTester;
