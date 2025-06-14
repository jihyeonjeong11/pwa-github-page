import Window from "@/components/Window";
import { Props } from "react-rnd";
import { useState } from "react";
import { DEFAULT_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
import { Button } from "@/components/ui/Button";
import RndWindow from "@/components/Window/RndWindow";
// todo: functions.ts? 페이지에 종속시키는게 나을지?
// titlebar 펑션 넣기 - 포커스, 더블클릭
type WindowType = {
  minimized: boolean;
  maximized: boolean;
  name: string;
  id: string;
  // todo: temp solution
  focused: boolean;
};

// todo: not Default anymore chagne name
export type RndDefaultProps = NonNullable<Props["default"]> & WindowType;

function handleRestUnfocus(entries: RndDefaultProps[]) {
  return entries.map((e) => ({ ...e, focused: false }));
}

function handleSplice(entries: RndDefaultProps[], id: string) {
  return entries.filter((e) => e.id !== id);
}

const generateWindow = (length = 1) => {
  const x = (window.innerWidth - DEFAULT_WINDOW_SIZE.width) / 2;
  const y = (window.innerHeight - DEFAULT_WINDOW_SIZE.height) / 2;

  return {
    x,
    y,
    width: DEFAULT_WINDOW_SIZE.width,
    height: DEFAULT_WINDOW_SIZE.height,
    minimized: false,
    maximized: false,
    name: "test-window",
    id: `test-${length}`,
    focused: true,
  };
};

function RndTester() {
  const [entries, setEntries] = useState<RndDefaultProps[]>([
    generateWindow(1),
  ]);

  function handleTaskbarAction(entry: RndDefaultProps) {
    if (entry.minimized) {
      setEntries((p) =>
        p.map((e) => {
          if (e.id === entry.id) {
            return {
              ...e,
              minimized: false,
            };
          } else {
            return e;
          }
        })
      );
    }
  }

  function minimize(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? false : e.focused,
        minimized: id === e.id ? !e.minimized : e.minimized,
      }))
    );
  }

  function maximize(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? true : false,
        maximized: id === e.id ? !e.maximized : e.maximized,
      }))
    );
  }

  function focus(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({
        ...e,
        focused: id === e.id ? true : false,
      }))
    );
  }

  function close(id = "") {
    if (!id) return;
    setEntries((p) => handleSplice(p, id));
  }

  function onClickFocusElement(id = "") {
    if (!id) return;
    setEntries((p) =>
      p.map((e) => ({ ...e, focused: id === e.id ? true : false }))
    );
  }

  return (
    <div id="app">
      <h1 className="pb-4">This is Rnd testing window.</h1>
      {/* todo: debugging panal */}
      {entries.map((e) => {
        return <div key="coords">{`x: ${e.x} y: ${e.y}`}</div>;
      })}
      <Button
        onClick={() =>
          setEntries((p) => [
            ...handleRestUnfocus(p),
            generateWindow(p.length + 1),
          ])
        }
        className="my-4"
      >
        Add new window
      </Button>
      {entries.map((e, i) => {
        return (
          // todo: add zIndex for multiple windows
          <RndWindow
            key={"window-" + i}
            entry={e}
            focus={focus}
            setEntries={setEntries}
          >
            <Window
              entry={e}
              minimize={minimize}
              maximize={maximize}
              close={close}
              onClickFocusElement={onClickFocusElement}
            />
          </RndWindow>
        );
      })}
      <Taskbar entries={entries} handleTaskbarAction={handleTaskbarAction} />
    </div>
  );
}

export default RndTester;
