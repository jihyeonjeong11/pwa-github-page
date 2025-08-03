// todo: reducer
import { ProgramType, RndWindowType } from "@/components/programs/types";
import Process from "./process";
import { Dispatch } from "react";
import { ProcessAction, ProcessListType } from "@/types/process";
import { v7 as uuid } from "uuid";
import { RndDragCallback, RndResizeCallback } from "react-rnd";
import { DEFAULT_WINDOW_SIZE } from "@/constants";
import { preloadLibs } from "./utils";

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

// // todo: 핸들러 다른 파일로 빼기
// export const generateWindow = (
//   program: ProgramType,
//   newId: number
// ): RndWindowType => {
//   const { width, height } = determineDefaultWindowSize();
//   const x = (window.innerWidth - width) / 2;
//   const y = (window.innerHeight - height) / 2;
//   return {
//     // rnd props
//     x,
//     y,
//     width: program.width ? program.width : width,
//     height: program.height ? program.height : height,
//     // Window props
//     minimized: false,
//     maximized: false,
//     allowResizing: program.allowResizing,
//     focused: false,
//     // Component Props
//     name: program.name,
//     id: `${program.name}-${newId}`,
//     Component: program.Component,
//   };
// };

const updateProcess = (
  id: string,
  updates: Partial<RndWindowType>,
  processes: ProcessListType
) => {
  return processes.map((process) =>
    process.id === id ? { ...process, ...updates } : process
  );
};

const addProcess = (
  process: RndWindowType,
  processes: ProcessListType,
  previousState: Partial<RndWindowType> = {}
) => [...processes, { ...process, ...previousState }];

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

export const position =
  (updateProcesses: Dispatch<ProcessAction>) =>
  (id: string): RndDragCallback =>
  (_event, { x, y }): void =>
    updateProcesses({ id, updates: { x, y } });

export const size =
  (updateProcesses: Dispatch<ProcessAction>) =>
  (id: string): RndResizeCallback =>
  (
    _event,
    _direction,
    { offsetWidth: width, offsetHeight: height },
    _delta,
    { x, y }
  ): void =>
    updateProcesses({ id, updates: { height, width, x, y } });

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
    // todo: 윈도우 overlay 감지 펑션. 만약 새로 생기는 윈도우가 이전 윈도우를 가린다면, x + 100 y + 100으로 효과를 줄것.
    // todo: latest, 첫 생성 시 중앙에 둠.
    // todo: make it recursive
    const { width, height } = determineDefaultWindowSize();
    if (app.libs) preloadLibs(app.libs);
    let initialX = (window.innerWidth - width) / 2;
    let initialY = (window.innerHeight - height) / 2;
    processes.forEach((e) => {
      if (e.x === initialX && e.y === initialY) {
        initialX += 50;
        initialY += 50;
      }
    });

    const generated = new Process({
      width,
      height,
      ...app,
      x: initialX,
      y: initialY,
      id: `test-${uuid()}`,
    });

    updateProcesses({ process: generated });
    return generated.id;
  };
