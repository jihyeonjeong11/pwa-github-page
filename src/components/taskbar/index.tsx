import { Button } from "../ui/Button";

export default function Taskbar() {
  return (
    <nav
      className={`fixed left-0 bottom-0 bg-primary-window-background w-[100vw] h-8 border-t-2 border-t-white flex justify-start gap-2`}
    >
      <div className="p-0.5">
        <Button className="p-1 h-[26px]">
          <label className="flex items-center h-full w-full gap-1 ">
            <div>
              <img
                alt="logo"
                src="public/images/start.png"
                className="w-[20px] h-[20px] object-contain"
              />
            </div>
            Start
          </label>
        </Button>
      </div>
      <ol className="p-0.5 flex grow">
        <li className="bg-red-200 text-sm">
          <Button className="h-[26px] overflow-hidden" variant={"primary"}>
            <label>Test-window</label>
          </Button>
        </li>
      </ol>

      <div className="shrink-0 p-0.5 shadow-[inset_-1.5px_-1.5px_0_0_#fcfcfc,_inset_1.5px_1.5px_0_0_#a099a1]">
        <time className="px-2 text-xs">오후 2:15</time>
      </div>
    </nav>
  );
}
