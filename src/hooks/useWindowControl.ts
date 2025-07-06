// todo: open -> saveState -> rndAction -> saveState
// position && size

import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";
import { useCallback, useContext } from "react";

function useWindowControl() {
  const { saveState, session, foreground } = useContext(SessionContext);
  const { open, processes } = useContext(ProcessContext);

  const onOpen = useCallback(
    (program) => {
      const id = open(program);
      console.log("after open", processes, id);
      foreground(id);
    },
    [open, processes, foreground]
  );

  return { onOpen };
}

export default useWindowControl;
