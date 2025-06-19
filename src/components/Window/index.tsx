import { WindowRoot, WindowHeader } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";
import { Minimize, Maximize, Close } from "@/components/ui/NavigationIcons";
import { RndDefaultProps } from "@/components/_devPurpose/rnd";
import { useWindowTransition } from "./useWindowTransition";
import { cn } from "@/lib/utils";

// todo: hook으로 빼면 더 복잡하게 추가 가능. 이후에 minimize 애니메이션 살리는게 편할 듯.
// drag -> 타이틀바, 타이틀바 클릭, 터치 -> 포커스, 버튼 세개 -> 최소화 최대화 닫기
// todo: 주말에 사이즈 배리어블 따로 빼서 정리할

function Window({
  entry,
  minimize,
  maximize,
  close,
  onClickFocusElement,
  children,
}: {
  entry: RndDefaultProps;
  minimize: (id: string) => void;
  maximize: (id: string) => void;
  close: (id: string) => void;
  onClickFocusElement: (id: string) => void;
  children: React.ReactElement;
}) {
  const windowTransition = useWindowTransition(entry);
  const { focused, name, id } = entry;

  return (
    <WindowRoot
      onMouseDown={() => {
        onClickFocusElement(id);
      }}
      {...windowTransition}
    >
      <WindowHeader
        className={cn(
          focused
            ? "justify-between drag-handle"
            : "justify-between bg-primary-button-border drag-handle",
          "w-full h-full flex"
        )}
      >
        <div className="flex-1 min-w-0">
          <div className="px-2 overflow-hidden text-nowrap text-ellipsis">{`${name}-${id}`}</div>
        </div>
        <nav className="flex flex-shrink-0 gap-1 h-full cancel items-center pr-1">
          <Button
            onClick={() => {
              minimize(id);
            }}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Minimize />
          </Button>
          <Button
            onClick={() => {
              if (entry.resizeEnabled) maximize(id);
            }}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Maximize />
          </Button>
          <Button
            onClick={() => {
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

export default Window;
