import {
  foreground,
  getState,
  saveState,
  sessionReducer,
} from "@/lib/sessionActions";
import { SessionContextType } from "@/types/SessionContext";
import { createContext, useReducer } from "react";

const initialSessionState: SessionContextType = {
  session: {
    foregroundId: "",
    states: {},
    stackOrder: [],
  },
  foreground: () => null,
  saveState: () => null,
  getState: () => ({
    id: "",
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  }),
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
        getState: getState(session),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
