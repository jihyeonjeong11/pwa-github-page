import { WindowRoot, WindowHeader } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";
import { Minimize, Maximize, Close } from "@/components/ui/NavigationIcons";
import { RndDefaultProps } from "@/components/_devPurpose/rnd";
import { useWindowTransition } from "./useWindowTransition";

// todo: Drag액션 WindowsHeader에 걸기.

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
    <WindowRoot onClick={() => onClickFocusElement(id)} {...windowTransition}>
      <WindowHeader
        className={
          focused
            ? "justify-between"
            : "justify-between bg-primary-button-border"
        }
      >
        <div className="grow min-w-0 overflow-hidden">{`${name}-${id}`}</div>
        <nav className="flex gap-1 shrink-0">
          <Button
            onClick={() => minimize(id)}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Minimize />
          </Button>
          <Button
            onClick={() => maximize(id)}
            variant={"primary"}
            className={"p-0 w-[22px] flex items-center justify-center"}
          >
            <Maximize />
          </Button>
          <Button
            onClick={() => close(id)}
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
