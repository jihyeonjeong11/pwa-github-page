import {
  changeForeground,
  foreground,
  sessionReducer,
} from "@/lib/sessionActions";
import { createContext, useReducer } from "react";

const initialSessionState = {
  session: {
    foregroundId: "",
    states: {},
    stackOrder: [],
  },
  focus: () => null, //todo focus
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
