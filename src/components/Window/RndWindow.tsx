import { Rnd, DraggableData, ResizableDelta, Position } from "react-rnd";
import { DraggableEvent } from "react-draggable";
import { useContext, useMemo } from "react";
import { MIN_WINDOW_SIZE } from "@/constants";
import { ResizeDirection, RndWindowType } from "../programs/types";
import { ProcessType } from "@/types/process";
import { ProcessContext } from "@/contexts/ProcessProvider";

const RESIZING_DISABLED = {
  bottom: false,
  bottomLeft: false,
  bottomRight: false,
  left: false,
  right: false,
  top: false,
  topLeft: false,
  topRight: false,
};

const RESIZING_ENABLED = {
  bottom: true,
  bottomLeft: true,
  bottomRight: true,
  left: true,
  right: true,
  top: true,
  topLeft: true,
  topRight: true,
};

function RndWindow({
  children,
  entry,

  onDragStop,
  onResizeStop,
  zIndex,
}: {
  zIndex: number;
  children: React.ReactElement;
  entry: ProcessType;
  focus: (id: string) => void;
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
}) {
  return (
    <Rnd
      cancel=".cancel"
      dragHandleClassName="drag-handle"
      style={{ zIndex: zIndex }}
      position={{
        x: entry.x!,
        y: entry.y!,
      }}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      size={{ width: entry.width!, height: entry.height! }}
      minHeight={MIN_WINDOW_SIZE.height}
      minWidth={MIN_WINDOW_SIZE.width}
      enableResizing={
        entry.minimized || entry.maximized || !entry.allowResizing
          ? RESIZING_DISABLED
          : RESIZING_ENABLED
      }
      disableDragging={entry.maximized || entry.minimized}
    >
      {children}
    </Rnd>
  );
}

export default RndWindow;
