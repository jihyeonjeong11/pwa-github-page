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

export const saveState =
  (session: SessionType, updateSession: Dispatch<SessionAction>) =>
  (state): void => {
    const { x: previousX = 0, y: previousY = 0 } =
      session.states[state.id] || {};

    updateSession({
      state: state,
    });
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
