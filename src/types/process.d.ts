import { ProgramType } from "@/components/programs/types";

export type ProcessType = ProgramType & {
  id: string;
  x?: number;
  y?: number;
  allowResizing: boolean;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
};

export type ProcessListType = ProcessType[];

export type ProcessAction = {
  id?: string;
  process?: RndWindowType;
  updates?: Partial<RndWindowType>;
  previousState?: Partial<RndWindowType>;
};
