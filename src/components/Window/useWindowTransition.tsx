import { Variant } from "motion/react";
import { useLayoutEffect, useState } from "react";
import { RndDefaultProps } from "../_devPurpose/rnd";
import { TASKBAR_HEIGHT } from "@/constants";
import { Easing } from "motion/react";

const baseMaximize = {
  opacity: 1,
  scale: 1,
};

const baseMinimize = {
  opacity: 0,
  scale: 0.7,
};

const exit = {
  opacity: 0,
  scale: 0.95,
};

const initial = {
  ...exit,
};

export const viewHeight = (): number => window.innerHeight;

export const viewWidth = (): number => window.innerWidth;

export function useWindowTransition(entry: RndDefaultProps) {
  const [maximize, setMaximize] = useState<Variant>(
    Object.create(null) as Variant
  );
  const [minimize, setMinimize] = useState<Variant>(
    Object.create(null) as Variant
  );

  // todo: minimize. Move window to bottom left, make opacity to 0(baseMinimize)
  useLayoutEffect(() => {
    if (entry.minimized) {
      // todo: innerWidth - 현재위치 = 0 계산
      setMinimize({
        ...baseMinimize,
        x: -entry.x,
        y: window.innerHeight,
      });
    }
  }, [entry.minimized, entry.x]);

  // todo: figure out how enlarging works
  useLayoutEffect(() => {
    if (entry.maximized) {
      //todo: 최대화값 x, y = -원래위치 , window.innerWidth, window.innerHeight - TASKBAR_HEIGHT
      setMaximize({
        ...baseMaximize,
        x: -entry.x,
        y: -entry.y,
        width: window.innerWidth,
        height: window.innerHeight - TASKBAR_HEIGHT,
      });
    }
  }, [entry.maximized, entry.x, entry.y]);

  return {
    animate: entry.minimized ? "minimize" : entry.maximized ? "maximize" : "",
    transition: {
      duration: 0.5,
      ease: "easeInOut" as Easing,
    },
    variants: {
      initial: initial,
      maximize,
      minimize,
    },
  };
}
