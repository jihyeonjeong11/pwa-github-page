import Window from "@/components/Window";
import { useContext } from "react";
import Taskbar from "@/components/taskbar";
import { Button } from "@/components/ui/Button";
import programs from "@/components/programs/programs";

import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";

const showWallpaper = false; // todo: use hook
// function determineDefaultWindowSize() {
//   // todo: Write isMobile hook
//   if (window.innerWidth < DEFAULT_WINDOW_SIZE.width) {
//     return {
//       width: window.innerWidth,
//       height: window.innerWidth - 100,
//     };
//   }
//   return DEFAULT_WINDOW_SIZE;
// }

function RndTester() {
  const { processes, open } = useContext(ProcessContext);
  const { foreground } = useContext(SessionContext);

  return (
    <div
      id="app"
      style={{
        backgroundImage: showWallpaper
          ? "url(https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?crop=entropy&fit=crop)"
          : "",
      }}
    >
      <h1 className="pb-4">Rnd functionality testing page.</h1>
      <div className="flex flex-col items-center">
        {Object.entries(programs).map(([k, v]) => (
          <Button
            key={k + "button"}
            onClick={() => {
              const id = open(v);
              foreground(id);
            }}
            className="my-4 w-[300px]"
          >
            Add {v.name}
          </Button>
        ))}
      </div>

      {processes.map((process) => {
        return <Window key={process.id} entry={process} />;
      })}

      <Taskbar />
    </div>
  );
}

export default RndTester;
