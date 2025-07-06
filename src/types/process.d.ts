export type ProcessType = {
  id: string;
  name: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  allowResizing: boolean;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
};

export type ProcessListType = ProcessType[];

export type ProcessAction = {
  id?: string;
  process?: RndWindowType;
  updates?: Partial<RndWindowType>;
  previousState?: Partial<RndWindowType>;
};
