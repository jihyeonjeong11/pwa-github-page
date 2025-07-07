// todo: open -> saveState -> rndAction -> saveState
// position && size

import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";
import { ProcessType } from "@/types/process";
import { useCallback, useContext } from "react";

function useWindowControl(entry: ProcessType) {
  const { saveState, session, foreground } = useContext(SessionContext);
  const { open, processes, restore, maximize, close, minimize } =
    useContext(ProcessContext);

  const onOpen = useCallback(
    (program) => {
      const id = open(program);
      foreground(id);
    },
    [open, processes, foreground]
  );

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
    onOpen,
    onMaximize,
    onClickHeader,
    onDoubleClick,
    onClose,
    onMinimize,
  };
}

export default useWindowControl;
