// todo: 좋은 네이밍이 아닌것 같음. 생각나면 바꿀것
import { WindowRoot, WindowHeader } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";
import { Minimize, Maximize, Close } from "@/components/ui/NavigationIcons";
import { useWindowTransition } from "./hooks/useWindowTransition";
import { cn } from "@/lib/utils";
import { ProcessContext } from "@/contexts/ProcessProvider";
import { useContext } from "react";
import { ProcessType } from "@/types/process";

// drag -> 타이틀바, 타이틀바 클릭, 터치 -> 포커스, 버튼 세개 -> 최소화 최대화 닫기
// todo: 주말에 사이즈 배리어블 따로 빼서 정리할

function WindowContainer({
  entry,
  //minimize,
  //maximize,
  //close,
  focus,
  children,
}: {
  entry: ProcessType;
  minimize: (id: string) => void;
  maximize: (id: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  children: React.ReactElement;
}) {
  const windowTransition = useWindowTransition(entry);
  const { focused, id } = entry;
  const { close, minimize, maximize, restore } = useContext(ProcessContext);
  return (
    <WindowRoot
      onClick={() => {
        focus(id);
      }}
      {...windowTransition}
    >
      <WindowHeader
        onDoubleClick={() =>
          entry.allowResizing && entry.maximized
            ? restore(id, "maximized")
            : maximize(id)
        }
        className={cn(
          focused
            ? "justify-between drag-handle"
            : "justify-between bg-primary-button-border drag-handle",
          "w-full h-full flex"
        )}
      >
        <div className="flex-1 min-w-0">
          <div className="px-2 overflow-hidden text-nowrap text-ellipsis">{`${id}`}</div>
        </div>
        <nav className="flex flex-shrink-0 gap-1 h-full cancel items-center pr-1">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              minimize(id);
            }}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Minimize />
          </Button>
          <Button
            onClick={() =>
              entry.allowResizing && entry.maximized
                ? restore(id, "maximized")
                : maximize(id)
            }
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Maximize />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              close(id);
            }}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Close />
          </Button>
        </nav>
      </WindowHeader>
      {children}
    </WindowRoot>
  );
}

export default WindowContainer;
