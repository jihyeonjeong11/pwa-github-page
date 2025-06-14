import { Rnd } from "react-rnd";
import { RndDefaultProps } from "../_devPurpose/rnd";
import { useMemo } from "react";

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
}: {
  children: React.ReactElement;
  entry: RndDefaultProps;
}) {
  const style = useMemo<React.CSSProperties>(
    () => ({
      pointerEvents: entry.minimized ? "none" : undefined,
      zIndex: entry.minimized ? -1 : entry.focused ? 3 : 1,
    }),
    [entry.minimized, entry.focused]
  );

  return <Rnd style={style}>{children}</Rnd>;
}

export default RndWindow;

// <Rnd
// style={{ zIndex: e.minimized ? -1 : e.focused ? 3 : 1 }}
// key={"window-" + i}
// position={{
//   x: e.x,
//   y: e.y,
// }}
// onDragStart={() => {
//   // todo: focus
// }}
// onDragStop={(_event, { x, y }) => {
//   // 위치 업데이트
//   const updated = [...entries];
//   updated[i] = { ...updated[i], x: x, y: y };
//   setEntries(updated);
// }}
// onResizeStop={(e, dir, ref, delta, position) => {
//   const updated = [...entries];
//   updated[i] = {
//     ...updated[i],
//     width: ref.offsetWidth,
//     height: ref.offsetHeight,
//     ...position,
//   };
//   setEntries(updated);
// }}
// zIndex={e.minimized ? 1 : e.focused ? 3 : 2}
// size={{ width: e.width, height: e.height }}
// minHeight={MIN_WINDOW_SIZE.height}
// minWidth={MIN_WINDOW_SIZE.width}
// enableResizing={
//   e.minimized || e.maximized ? RESIZING_DISABLED : RESIZING_ENABLED
// }
// disableDragging={e.maximized || e.minimized}
// >
