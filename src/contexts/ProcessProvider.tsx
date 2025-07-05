import { createContext, ReactNode, useReducer } from "react";
import {
  open,
  processReducer,
  close,
  minimize,
  maximize,
  restore,
} from "@/lib/processActions";
import { ProcessContextType } from "@/types/ProcessContext";

const initialProcesses: ProcessContextType = {
  processes: [],
  open: (): string => "",
  close: (): string => "",
  maximize: (): void => undefined,
  minimize: (): string => "",
  restore: (): void => undefined,
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
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
}

export default ProcessProvider;
