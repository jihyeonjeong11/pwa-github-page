import { JSX } from "react";
import { Props } from "react-rnd";

// todo: 더 쪼갤 수 있나?
export type BaseWindowType = {
  allowResizing: boolean;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
};

export type ProgramType = BaseWindowType & {
  Component: React.LazyExoticComponent<() => JSX.Element>;
  name: string;
  width?: number;
  height?: number;
};

export type ProgramsType = Record<string, ProgramType>;

export type RndProgramType = NonNullable<Props["default"]> & ProgramType;

export type RndWindowType = RndProgramType & { id: string };

// todo: 배열, 객체 테스트에서 큰 퍼포먼스 차이를 얻지 못했음.
export type RndWindowListType = RndWindowType[];

export type RndWindowEntriesType = Record<string, RndWindowType>;

export type ResizeDirection =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topRight"
  | "bottomRight"
  | "bottomLeft"
  | "topLeft";
