import { createContext, ReactNode, useReducer } from "react";
import {
  open,
  processReducer,
  close,
  minimize,
  maximize,
  restore,
  position,
  size,
} from "@/lib/processActions";
import { ProcessContextType } from "@/types/ProcessContext";

const initialProcesses: ProcessContextType = {
  processes: [],
  open: () => "",
  close: () => "",
  maximize: () => undefined,
  minimize: () => "",
  restore: () => undefined,
  position: () => undefined,
  size: () => undefined,
};

export const ProcessContext =
  createContext<ProcessContextType>(initialProcesses);

function ProcessProvider({ children }: { children: ReactNode }) {
  const [processes, dispatch] = useReducer(
    processReducer,
    initialProcesses.processes
  );
  return (
    <ProcessContext.Provider
      value={{
        processes,
        open: open(processes, dispatch),
        close: close(dispatch),
        minimize: minimize(dispatch),
        maximize: maximize(dispatch),
        restore: restore(dispatch),
        position: position(dispatch),
        size: size(dispatch),
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}

export default ProcessProvider;
