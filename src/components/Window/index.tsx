import { DraggableData, DraggableEvent } from "react-draggable";
import AppRenderer from "../programs/AppRenderer";
import { ResizeDirection } from "../programs/types";
import RndWindow from "./RndWindow";
import WindowContainer from "./WindowContainer";
import { Position, ResizableDelta } from "react-rnd";
import { ProcessType } from "@/types/process";

function Window({
  order,
  entry,
  focus,
  onDragStop,
  onResizeStop,
  minimize,
  maximize,
  close,
}: {
  order: string[];
  entry: ProcessType;
  onDragStop: (
    _event: DraggableEvent,
    data: Partial<DraggableData>
  ) => (id: string) => void;
  onResizeStop: (
    e: MouseEvent | TouchEvent,
    dir: ResizeDirection,
    elementRef: HTMLElement,
    delta: ResizableDelta,
    position: Position
  ) => (id: string) => void;
  minimize: (id: string) => void;
  maximize: (id: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
}) {
  return (
    <RndWindow
      order={order}
      entry={entry}
      focus={focus}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
    >
      <WindowContainer
        entry={entry}
        minimize={minimize}
        maximize={maximize}
        close={close}
        focus={focus}
      >
        {/* todo: id 전달하기 */}
        <AppRenderer Component={entry.Component} />
      </WindowContainer>
    </RndWindow>
  );
}

export default Window;
