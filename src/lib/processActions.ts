// todo: reducer
import { ProgramType, RndWindowType } from "@/components/programs/types";
import { DEFAULT_WINDOW_SIZE } from "@/constants";
import Process from "./process";
import { Dispatch } from "react";
import { ProcessAction, ProcessListType } from "@/types/process";

function determineDefaultWindowSize() {
  // todo: Write isMobile hook
  if (window.innerWidth < DEFAULT_WINDOW_SIZE.width) {
    return {
      width: window.innerWidth,
      height: window.innerWidth - 100,
    };
  }
  return DEFAULT_WINDOW_SIZE;
}

// todo: 핸들러 다른 파일로 빼기
export const generateWindow = (
  program: ProgramType,
  newId: number
): RndWindowType => {
  const { width, height } = determineDefaultWindowSize();
  const x = (window.innerWidth - width) / 2;
  const y = (window.innerHeight - height) / 2;
  return {
    // rnd props
    x,
    y,
    width: program.width ? program.width : width,
    height: program.height ? program.height : height,
    // Window props
    minimized: false,
    maximized: false,
    allowResizing: program.allowResizing,
    focused: false,
    // Component Props
    name: program.name,
    id: `${program.name}-${newId}`,
    Component: program.Component,
  };
};

const updateProcess = (
  id: string,
  updates: Partial<RndWindowType>,
  processes: ProcessListType
) =>
  processes.map((process) =>
    process.id === id ? { ...process, ...updates } : process
  );

const addProcess = (
  process: RndWindowType,
  processes: ProcessListType,
  previousState: Partial<RndWindowType> = {}
) => [...processes, { ...process, ...previousState }];

export const maximize =
  (updateProcesses: Dispatch<ProcessAction>) =>
  (id: string): void =>
    updateProcesses({ updates: { maximized: true }, id });

export const minimize =
  (updateProcesses: Dispatch<ProcessAction>) =>
  (id: string): void =>
    updateProcesses({ updates: { minimized: true }, id });

export const close =
  (updateProcesses: Dispatch<ProcessAction>) => (id: string) => {
    updateProcesses({ id: id });
  };

export const restore =
  (updateProcesses: Dispatch<ProcessAction>) =>
  (id: string, key: "minimized" | "maximized"): void =>
    updateProcesses({
      updates: { [key]: false },
      id,
    });

export const open =
  (processes: ProcessListType, updateProcesses: Dispatch<ProcessAction>) =>
  (app: ProgramType) => {
    // todo: id 체커
    const generated = new Process({
      ...app,
      id: `test-${processes.length}`,
    });
    updateProcesses({ process: generated });
    return generated.id;
  };

export const processReducer = (
  processes: ProcessListType,
  { id, process, updates }: ProcessAction
) => {
  if (id && updates) return updateProcess(id, updates, processes);
  if (process) return addProcess(process, processes);
  if (id) {
    return processes.filter((process) => process.id !== id);
  }
  return processes;
};
