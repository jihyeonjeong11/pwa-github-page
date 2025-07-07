export type SessionStateType = {
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
};

export type SessionType = {
  foregroundId: string;
  states: Record<string, SessionStateType>; //todo: Adjust type as needed
  stackOrder: string[];
};

export type SessionObjectType = Record<string, SessionType>;

export type SessionContextType = {
  session: SessionType;
  foreground: (id: string) => void;
  saveState: (state: SessionStateType) => void;
  getState: (id: string) => SessionStateType;
};

export type SessionAction = {
  foregroundId?: string;
  state?: SessionStateType;
};
