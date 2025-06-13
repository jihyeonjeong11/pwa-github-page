import Window from "@/components/Window";
import { Rnd, Props } from "react-rnd";
import { useState } from "react";
import { DEFAULT_WINDOW_SIZE, MIN_WINDOW_SIZE } from "@/constants";
import Taskbar from "@/components/taskbar";
// todo: functions.ts? 페이지에 종속시키는게 나을지?
// todo: RND 부분 따로 빼기
// titlebar 펑션 넣기 - 포커스, 더블클릭
// 포커스 - 윈도우 하나 이상, z-index
// RndWindow SOC 추가
type WindowType = {
  minimized: boolean;
  maximized: boolean;
  name: string;
  id: string;

  // name, id, icon?
};

export type RndDefaultProps = NonNullable<Props["default"]> & WindowType;

const resizePoints = {
  right: true,
  left: true,
  top: true,
  bottom: true,
  topLeft: true,
  topRight: true,
  bottomLeft: true,
  bottomRight: true,
};

function RndTester() {
  const generateWindow = () => {
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
      id: `test-${1}`,
    };
  };

  const [entries, setEntries] = useState<RndDefaultProps[]>([generateWindow()]);

  function handleTaskbarAction(entry: RndDefaultProps) {
    //todo: minimize라면 active.
    //todo: 화면을 벗어났다면 크기 초기화.
    if (entry.minimized) {
      // minimized 해소 및 사이드 돌림.
      setEntries(
        entries.map((e) => {
          if (e.id === entry.id) {
            // todo: animationstate active 새로 만들기
            //
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

    // todo: if(entry가 스크린을 벗어났다면)?
    // 사이즈 원래 세팅대로 되돌림
  }

  function minimize() {
    setEntries([
      {
        ...entries[0],
        minimized: !entries[0].minimized,
      },
    ]);
  }

  function maximize() {
    setEntries([
      {
        ...entries[0],
        maximized: !entries[0].maximized,
      },
    ]);
  }

  return (
    <div id="app">
      <h1 className="pb-4">This is Rnd testing window.</h1>
      {/* todo: debugging panal */}
      {entries.map((e) => {
        return <div key="coords">{`x: ${e.x} y: ${e.y}`}</div>;
      })}
      {entries.map((e, i) => {
        return (
          // todo: add zIndex for multiple windows
          <Rnd
            key={"window-" + i}
            position={{
              x: e.x,
              y: e.y,
            }}
            onDragStop={(_event, { x, y }) => {
              // 위치 업데이트
              const updated = [...entries];
              updated[i] = { ...updated[i], x: x, y: y };
              setEntries(updated);
            }}
            onResizeStop={(e, dir, ref, delta, position) => {
              // 사이즈 업데이트
              const updated = [...entries];
              updated[i] = {
                ...updated[i],
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
              };
              setEntries(updated);
            }}
            disableDragging={e.maximized}
            size={{ width: e.width, height: e.height }}
            minHeight={MIN_WINDOW_SIZE.height}
            minWidth={MIN_WINDOW_SIZE.width}
            enableResizing={resizePoints}
          >
            <Window entry={e} minimize={minimize} maximize={maximize} />
          </Rnd>
        );
      })}
      <Taskbar entries={entries} handleTaskbarAction={handleTaskbarAction} />
    </div>
  );
}

export default RndTester;
