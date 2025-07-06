import { foreground, sessionReducer } from "@/lib/sessionActions";
import { SessionContextType } from "@/types/SessionContext";
import { createContext, useReducer } from "react";

const initialSessionState: SessionContextType = {
  session: {
    foregroundId: "",
    states: {},
    stackOrder: [],
  },
  foreground: () => null,
};

export const SessionContext = createContext(initialSessionState);

function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, dispatch] = useReducer(
    sessionReducer,
    initialSessionState.session
  );

  return (
    <SessionContext.Provider
      value={{ session, foreground: foreground(dispatch) }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
