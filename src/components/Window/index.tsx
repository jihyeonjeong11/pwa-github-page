import { DraggableData, DraggableEvent } from "react-draggable";
import AppRenderer from "../programs/AppRenderer";
import { ResizeDirection, RndWindowType } from "../programs/types";
import RndWindow from "./RndWindow";
import WindowContainer from "./WindowContainer";
import { Position, ResizableDelta } from "react-rnd";

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
  entry: RndWindowType;
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
        <AppRenderer Component={entry.Component} />
      </WindowContainer>
    </RndWindow>
  );
}

export default Window;
