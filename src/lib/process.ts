import { ProcessType } from "@/types/process";

class Process {
  id;
  name;
  Component;
  width;
  height;
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
  }
}

export default Process;
