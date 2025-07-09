// todo : 바탕화면 -> 월페이퍼 훅
// todo : programlist -> icon

import useWallpaper from "@/hooks/useWallpaper";
import Taskbar from "../taskbar";
import { useContext } from "react";
import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";
import Window from "@/components/Window";
import programs from "../programs/programs";
import FileEntry from "../file";

// todo: 윈도우 로딩 스크린
// todo: taskbar -> 시작메뉴 dropdown

function Desktop() {
  const { style, getRandomWallpaper } = useWallpaper();
  const { processes, open } = useContext(ProcessContext);
  const { foreground } = useContext(SessionContext);
  return (
    <div
      id="app"
      style={style}
      onContextMenu={(e) => {
        // todo: 모바일 어케햇더라
        e.preventDefault();
        getRandomWallpaper();
      }}
    >
      <div className="flex flex-col gap-2 items-start">
        {Object.entries(programs).map(([k, v]) => (
          // <Button
          //   key={k + "button"}
          //   onClick={() => {
          //     const id = open(v);
          //     foreground(id);
          //   }}
          //   className="my-4 w-[300px]"
          // >
          //   Add {v.name}
          // </Button>
          <FileEntry key={k} program={v} />
        ))}
      </div>

      {processes.map((process) => {
        return <Window key={process.id} entry={process} />;
      })}

      <Taskbar />
    </div>
  );
}

export default Desktop;
