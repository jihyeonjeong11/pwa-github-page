import { useContext, useState } from "react";
import { Button } from "../ui/Button";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn, outerBorderClass } from "@/lib/utils";
import programs from "../programs/programs";
import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";
import { ProgramType } from "../programs/types";

const STARTMENU_ICON_WIDTH = 36;
const STARTMENU_ICON_HEIGHT = 36;

function MenuItem({
  program,
  onClick,
}: {
  program: Partial<ProgramType>;
  onClick: () => void;
}) {
  const icon = program.icon ? program.icon : "images/drive1.ico";

  return (
    <li
      onClick={onClick}
      className="truncate flex gap-4 p-2 hover:bg-primary-header-background hover:text-white items-center"
    >
      <img
        width={STARTMENU_ICON_WIDTH}
        height={STARTMENU_ICON_HEIGHT}
        src={icon}
      />
      {program.name}
    </li>
  );
}

// todo: ui/dropdown로 이동시킬 것
// static menu consideration: programs, seperator,  settings, help, find, run, seperator, suspend, shutdown
function StartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useContext(ProcessContext);
  const { foreground } = useContext(SessionContext);

  return (
    <DropdownMenuPrimitive.Root onOpenChange={setIsOpen} open={isOpen}>
      <div className="p-0.5">
        <Button asChild className="p-1 h-[26px]">
          <DropdownMenuPrimitive.Trigger>
            <label className="flex items-center h-full w-full gap-1">
              <div>
                <img
                  alt="logo"
                  src="images/start.png"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>
              Start
            </label>
          </DropdownMenuPrimitive.Trigger>
        </Button>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            className={cn(
              "bg-primary-window-background min-h-[220px] flex",
              outerBorderClass
            )}
            align="start"
            alignOffset={3}
          >
            <DropdownMenuPrimitive.Item className="bg-secondary-window-background w-[30px]">
              <div
                className="w-full pt-4 flex items-center text-white"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                <span className="font-bold text-sm">PWA-Windows</span>
              </div>
            </DropdownMenuPrimitive.Item>
            <ol className="flex flex-col">
              {Object.entries(programs).map(([key, program]) => {
                return (
                  <DropdownMenuPrimitive.Item key={key}>
                    <MenuItem
                      onClick={() => {
                        const generated = open(program);
                        foreground(generated);
                      }}
                      program={program}
                    />
                  </DropdownMenuPrimitive.Item>
                );
              })}

              <DropdownMenuPrimitive.Separator
                className="my-1 h-[2px] bg-transparent"
                style={{
                  borderTop: "1px solid #808080",
                  borderBottom: "1px solid #C0C0C0",
                }}
              />
              <DropdownMenuPrimitive.Item className="flex flex-col">
                <MenuItem
                  onClick={() => null} // todo: can i shutdown pwa?
                  program={{ name: "Shut Down", icon: "images/off.ico" }}
                />
              </DropdownMenuPrimitive.Item>
            </ol>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </div>
    </DropdownMenuPrimitive.Root>
  );
}

export default StartMenu;
