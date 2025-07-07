import { ProgramType } from "@/components/programs/types";
import { ProcessListType } from "./process";

export type ProcessContextType = {
  processes: ProcessListType;
  open: (app: ProgramType) => string;
  close: (id: string) => void;
  maximize: (id: string) => void;
  minimize: (id: string) => void;
  restore: (id: string, key: "minimized" | "maximized") => void;
  position: (id: string) => void;
  size: (id: string) => void;
};
