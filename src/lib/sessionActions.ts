import {
  SessionAction,
  SessionStateType,
  SessionType,
} from "@/types/SessionContext";
import { Dispatch } from "react";

const updateState = (session: SessionType, state: SessionStateType) => ({
  ...session,
  states: {
    ...session.states,
    [state.id]: state,
  },
  stackOrder: session.stackOrder.filter((stackId) => stackId !== state.id),
});

const changeForeground = (session: SessionType, foregroundId: string) => ({
  ...session,
  foregroundId,
  stackOrder: [
    ...(foregroundId ? [foregroundId] : []),
    ...session.stackOrder.filter((stackId) => stackId !== foregroundId),
  ],
});

export const sessionReducer = (
  session: SessionType,
  { foregroundId, state }: SessionAction
) => {
  // x, y 저장용
  if (state) return updateState(session, state);
  // 포커스 지우는 용도
  if (typeof foregroundId === "string") {
    return changeForeground(session, foregroundId);
  }
  return session;
};

export const getState = (session: SessionType) => (id: string) => {
  return session.states[id] || {};
};

export const foreground =
  (updateSession: Dispatch<SessionAction>) =>
  (id: string): void => {
    console.log("foreground", id);
    updateSession({ foregroundId: id });
  };

export const saveState =
  (session: SessionType, updateSession: Dispatch<SessionAction>) =>
  ({ id, height = 0, width = 0, x = 0, y = 0 }: SessionStateType) => {
    const { x: previousX = 0, y: previousY = 0 } = getState(session)(id);

    updateSession({
      state: {
        id,
        height,
        width,
        x: previousX === x ? x : previousX + x,
        y: previousY === y ? y : previousY + y,
      },
    });
  };
