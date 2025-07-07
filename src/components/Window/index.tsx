import AppRenderer from "../programs/AppRenderer";
import RndWindow from "./RndWindow";
import WindowContainer from "./WindowContainer";
import { ProcessType } from "@/types/process";
import useWindowControl from "@/hooks/useWindowControl";

function Window({ entry }: { entry: ProcessType }) {
  const {
    onMaximize,
    onClickHeader,
    onDoubleClick,
    onClose,
    onMinimize,
    zIndex,
    onDragStop,
    onResizeStop,
  } = useWindowControl(entry);

  return (
    <RndWindow
      zIndex={zIndex}
      entry={entry}
      focus={focus}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
    >
      <WindowContainer
        entry={entry}
        onMaximize={onMaximize}
        onClickHeader={onClickHeader}
        onDoubleClick={onDoubleClick}
        onClose={onClose}
        onMinimize={onMinimize}
      >
        {/* todo: id 전달하기 */}
        <AppRenderer Component={entry.Component} />
      </WindowContainer>
    </RndWindow>
  );
}

export default Window;
