import {
  SessionAction,
  SessionContextType,
  SessionObjectType,
  SessionType,
} from "@/types/SessionContext";
import { Dispatch } from "react";

export const foreground =
  (updateSession: Dispatch<SessionAction>) =>
  (id: string): void =>
    updateSession({ foregroundId: id });

const saveState = (session, state) => {
  console.log("eee", session);
  return {
    ...session,
    states: {
      ...session.states,
      [state.id]: state,
    },
    //stackOrder: session.stackOrder.filter((stackId) => stackId !== state.id),
  };
};

const changeForeground = (session, foregroundId: string) => ({
  ...session,
  foregroundId,
});

export const sessionReducer = (
  session: SessionObjectType,
  { foregroundId, state }: SessionAction
): SessionObjectType => {
  if (state) return saveState(session, state); // updateState
  if (foregroundId) {
    console.log(session);
    return changeForeground(session, foregroundId); // changeForeground
  }
  return session;
};
