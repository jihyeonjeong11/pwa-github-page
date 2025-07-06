import { foreground, saveState, sessionReducer } from "@/lib/sessionActions";
import { SessionContextType } from "@/types/SessionContext";
import { createContext, useReducer } from "react";

const initialSessionState: SessionContextType = {
  session: {
    foregroundId: "",
    states: {}, // todo: position
    stackOrder: [],
  },
  foreground: () => null,
  saveState: () => null,
};

export const SessionContext = createContext(initialSessionState);

function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, dispatch] = useReducer(
    sessionReducer,
    initialSessionState.session
  );

  return (
    <SessionContext.Provider
      value={{
        session,
        foreground: foreground(dispatch),
        saveState: saveState(session, dispatch),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
