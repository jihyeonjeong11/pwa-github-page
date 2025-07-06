import {
  SessionAction,
  SessionStateType,
  SessionType,
} from "@/types/SessionContext";
import { Dispatch } from "react";

export const foreground =
  (updateSession: Dispatch<SessionAction>) =>
  (id: string): void =>
    updateSession({ foregroundId: id });

const saveState = (session: SessionType, state: SessionStateType) => {
  return {
    ...session,
    states: {
      ...session.states,
      [state.id]: state,
    },
    stackOrder: session.stackOrder.filter((stackId) => stackId !== state.id),
  };
};

const changeForeground = (session: SessionType, foregroundId: string) => ({
  ...session,
  foregroundId,
});

export const sessionReducer = (
  session: SessionType,
  { foregroundId, state }: SessionAction
) => {
  if (state) return saveState(session, state);
  if (foregroundId) {
    return changeForeground(session, foregroundId);
  }
  return session;
};
