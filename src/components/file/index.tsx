import { memo, useContext } from "react";
import { ProgramType } from "../programs/types";
import { ProcessContext } from "@/contexts/ProcessProvider";
import { SessionContext } from "@/contexts/SessionProvider";
import { Drive1Icon } from "@/images";

export const BASE_ICON_WIDTH = 48;
export const BASE_ICON_HEIGHT = 48;

// todo: rnd instance: starting x y
// todo: cursors
function FileEntry({ program }: { program: ProgramType }) {
  const icon = program.icon ? program.icon : Drive1Icon;
  const { open } = useContext(ProcessContext);
  const { foreground } = useContext(SessionContext);

  const onDoublicClick = () => {
    const generated = open(program);
    foreground(generated);
  };

  return (
    <figure
      className="flex flex-col justify-center items-center"
      onDoubleClick={onDoublicClick}
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

export default memo(FileEntry);
