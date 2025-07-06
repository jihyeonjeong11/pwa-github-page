import { ProcessType } from "@/types/process";

class Process {
  id;
  name;
  Component;
  width;
  height;
  x;
  y;
  allowResizing;
  minimized;
  maximized;
  focused;

  constructor({
    id,
    name,
    Component,
    width,
    height,
    x,
    y,
    allowResizing = true,
    minimized = false,
    maximized = false,
    focused = false,
  }: ProcessType) {
    this.id = id;
    this.name = name;
    this.Component = Component;
    this.width = width;
    this.height = height;
    this.allowResizing = allowResizing;
    this.minimized = minimized;
    this.maximized = maximized;
    this.focused = focused;
    this.x = x || 0;
    this.y = y || 0;
  }
}

export default Process;
