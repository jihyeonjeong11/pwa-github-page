// todo: open -> saveState -> rndAction -> saveState
// position && size

import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";
import { ProcessType } from "@/types/process";
import { useCallback, useContext } from "react";

const baseZindex = 1000;

function useWindowControl(entry: ProcessType) {
  const { session, foreground } = useContext(SessionContext);
  const { restore, maximize, close, minimize, position, size } =
    useContext(ProcessContext);

  const zIndex =
    baseZindex + session.stackOrder.slice().reverse().indexOf(entry.id);

  const onDragStop = position(entry.id);
  const onResizeStop = size(entry.id);

  const onClickHeader = useCallback(() => {
    return foreground(entry.id);
  }, [entry.id, foreground]);

  const onDoubleClick = useCallback(() => {
    return entry.allowResizing && entry.maximized
      ? restore(entry.id, "maximized")
      : maximize(entry.id);
  }, [entry.allowResizing, entry.id, entry.maximized, maximize, restore]);

  const onMaximize = useCallback(() => {
    return entry.allowResizing && entry.maximized
      ? restore(entry.id, "maximized")
      : maximize(entry.id);
  }, [entry.allowResizing, entry.maximized, maximize, restore, entry.id]);

  const onClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      close(entry.id);
    },
    [close, entry.id]
  );

  const onMinimize = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      foreground("");
      minimize(entry.id);
    },
    [entry.id, foreground, minimize]
  );

  return {
    onMaximize,
    onClickHeader,
    onDoubleClick,
    onClose,
    onMinimize,
    zIndex,
    onDragStop,
    onResizeStop,
  };
}

export default useWindowControl;
