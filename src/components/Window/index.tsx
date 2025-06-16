import { WindowRoot, WindowHeader } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";
import { Minimize, Maximize, Close } from "@/components/ui/NavigationIcons";
import { RndDefaultProps } from "@/components/_devPurpose/rnd";
import { useWindowTransition } from "./useWindowTransition";

// todo: Drag액션 WindowsHeader에 걸기.
// todo: bubbling 해결.
// todo: hook으로 빼면 더 복잡하게 추가 가능. 이후에 minimize 애니메이션 살리는게 편할 듯.
// drag -> 타이틀바, 타이틀바 클릭, 터치 -> 포커스, 버튼 세개 -> 최소화 최대화 닫기

function Window({
  entry,
  minimize,
  maximize,
  close,
  onClickFocusElement,
}: {
  entry: RndDefaultProps;
  minimize: (id: string) => void;
  maximize: (id: string) => void;
  close: (id: string) => void;
  onClickFocusElement: (id: string) => void;
}) {
  const windowTransition = useWindowTransition(entry);
  const { focused, name, id } = entry;

  return (
    <WindowRoot
      onClick={() => {
        onClickFocusElement(id);
      }}
      {...windowTransition}
    >
      <WindowHeader
        className={
          focused
            ? "justify-between drag-handle"
            : "justify-between bg-primary-button-border drag-handle"
        }
      >
        <div className="grow min-w-0 overflow-hidden">{`${name}-${id}`}</div>
        <nav
          className="flex gap-1 shrink-0"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            onClick={() => {
              minimize(id);
            }}
            onTouchStart={() => {
              minimize(id);
            }}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Minimize />
          </Button>
          <Button
            onClick={() => {
              maximize(id);
            }}
            onTouchStart={() => maximize(id)}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Maximize />
          </Button>
          <Button
            onClick={() => {
              close(id);
            }}
            onTouchStart={() => close(id)}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Close />
          </Button>
        </nav>
      </WindowHeader>
    </WindowRoot>
  );
}

export default Window;
