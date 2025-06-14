import { Rnd } from "react-rnd";
import { RndDefaultProps } from "../_devPurpose/rnd";
import { useMemo } from "react";
import { MIN_WINDOW_SIZE } from "@/constants";

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
  focus,
  setEntries,
}: {
  children: React.ReactElement;
  entry: RndDefaultProps;
  focus: (id: string) => void;
  setEntries: React.Dispatch<React.SetStateAction<RndDefaultProps[]>>;
}) {
  const style = useMemo<React.CSSProperties>(
    () => ({
      pointerEvents: entry.minimized ? "none" : undefined,
      zIndex: entry.minimized ? -1 : entry.focused ? 3 : 1,
    }),
    [entry.minimized, entry.focused]
  );

  return (
    <Rnd
      style={style}
      position={{
        x: entry.x,
        y: entry.y,
      }}
      onDragStart={() => {
        focus(entry.id);
      }}
      onDragStop={(_event, { x, y }) => {
        // todo: cleanit
        setEntries((p) =>
          p.map((e) => ({
            ...e,
            x: e.id === entry.id ? x : e.x,
            y: e.id === entry.id ? y : e.y,
          }))
        );
      }}
      onResizeStop={(e, dir, ref, delta, position) => {
        setEntries((p) =>
          p.map((e) => ({
            ...e,
            width: e.id === entry.id ? ref.offsetWidth : e.width,
            height: e.id === entry.id ? ref.offsetHeight : e.height,
            x: e.id === entry.id ? position.x : e.x,
            y: e.id === entry.id ? position.y : e.y,
          }))
        );
      }}
      size={{ width: entry.width, height: entry.height }}
      minHeight={MIN_WINDOW_SIZE.height}
      minWidth={MIN_WINDOW_SIZE.width}
      enableResizing={
        entry.minimized || entry.maximized
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
