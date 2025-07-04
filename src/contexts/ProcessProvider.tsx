import { RndWindowListType, RndWindowType } from "@/components/programs/types";
import { createContext, ReactNode, useReducer } from "react";

const initialProcesses = {
  processes: [],
};

const ProcessContext = createContext<{ processes: RndWindowListType }>(
  initialProcesses
);

const updateProcess = (
  id: string,
  updates: Partial<RndWindowType>,
  processes: RndWindowListType
) =>
  processes.map((process) =>
    process.id === id ? { ...process, ...updates } : process
  );

export const processReducer = (
  processes: RndWindowType,
  { id, process, updates }: any
) => {
  if (id && updates) return updateProcess(id, updates, processes);
  return processes;
};

function ProcessProvider({ children }: { children: ReactNode }) {
  const [processes, updateProcesses] = useReducer(
    processReducer,
    initialProcesses.processes
  );

  return (
    <ProcessContext.Provider value={{ processes }}>
      {children}
    </ProcessContext.Provider>
  );
}

export default ProcessProvider;
