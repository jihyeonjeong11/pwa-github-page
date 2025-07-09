import { useContext } from "react";
import { ProgramType } from "../programs/types";
import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";

const BASE_ICON_WIDTH = 48;
const BASE_ICON_HEIGHT = 48;

// todo: another rnd instance?
// todo: what if click? Shoulda focus the most recent instance of clicked program?
// todo: cursors
function FileEntry({ program }: { program: ProgramType }) {
  const icon = program.icon ? program.icon : "images/drive1.ico";
  const { open } = useContext(ProcessContext);
  const { foreground } = useContext(SessionContext);
  return (
    <figure
      className="flex flex-col justify-center items-center"
      onDoubleClick={() => {
        const generated = open(program);
        foreground(generated);
      }}
    >
      <picture>
        <img width={BASE_ICON_WIDTH} height={BASE_ICON_HEIGHT} src={icon} />
      </picture>
      <figcaption className="bg-primary-background w-[120px] truncate text-icon-desc p-0.5">
        <span>{program.name}</span>
      </figcaption>
    </figure>
  );
}

export default FileEntry;
