export type SessionType = {
  foregroundId: string;
  states: Record<string, unknown>; //todo: Adjust type as needed
  stackOrder: string[];
};

export type SessionObjectType = Record<string, SessionType>;

export type SessionContextType = {
  sessions: SessionObjectType;
  focus: (id: string) => void;
};

export type SessionAction = {
  foregroundId?: string;
  state?: SessionObjectType;
};
