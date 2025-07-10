import useIsMobile from "@/hooks/useIsMobile";
import { Button } from "../ui/Button";
import { useHasIOSBottomBar } from "@/hooks/useIsIOSNotch";
import Clock from "./Clock";
import { useContext } from "react";
import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";
import { ProcessType } from "@/types/process";
import StartMenu from "./StartMenu";

export default function Taskbar() {
  const { isMobile } = useIsMobile();
  const { hasIOSBottomBar } = useHasIOSBottomBar();
  const { processes, maximize, restore } = useContext(ProcessContext);
  const {
    foreground,
    session: { foregroundId },
  } = useContext(SessionContext);

  const onRestore = (e: ProcessType) => {
    if (e.minimized) restore(e.id, "minimized");
    foreground(e.id);
  };

  //todo: 언젠가 바텀 패딩이 더 잡힌다면 notch-safe가 pwa를 지원하는 것임.
  // todo: starting menu
  return (
    <nav
      style={{ paddingBottom: isMobile && hasIOSBottomBar ? 55 : 0 }}
      className={`fixed left-0 bottom-0 bg-primary-window-background w-full h-8 border-t-2 border-t-white flex justify-start gap-2 notch-safe`}
    >
      <StartMenu />
      <ol className="p-0.5 flex grow gap-1">
        {processes.map((e) => (
          <li key={`${e.name}_task_${e.id}`} className="text-sm">
            {/* todo: 아이콘 */}
            <Button
              onDoubleClick={() =>
                e.maximized && e.allowResizing
                  ? maximize(e.id)
                  : restore(e.id, "maximized")
              }
              onClick={() => onRestore(e)}
              className="h-[26px] overflow-hidden"
              variant={e.id === foregroundId ? "focused" : "primary"}
            >
              <label className="flex items-center h-full w-full gap-1 text-nowrap text-ellipsis">
                <div>
                  <img
                    alt="disk"
                    src="images/drive1.ico"
                    className="w-[20px] h-[20px] object-contain"
                  />
                </div>
                {e.name}
              </label>
            </Button>
          </li>
        ))}
      </ol>
      <div className="p-0.5">
        <div className="shrink-0 p-0.5 shadow-[inset_-1.5px_-1.5px_0_0_#fcfcfc,_inset_1.5px_1.5px_0_0_#a099a1] h-[26px] flex items-center">
          <Clock />
        </div>
      </div>
    </nav>
  );
}
