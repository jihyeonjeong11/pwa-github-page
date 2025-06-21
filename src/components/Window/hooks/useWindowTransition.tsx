import { Variant } from "motion/react";
import { useLayoutEffect, useState } from "react";
import { TASKBAR_HEIGHT } from "@/constants";
import { Easing } from "motion/react";
import { RndWindowType } from "../../programs/types";

// consider: 윈도우 상태 스테이트 enum으로 만들어서 그걸로 전부 처리할 것. -> active -> minimizing -> minimized 식으로.. variants를 꼭 쓰지 않아도?>
const baseMaximize = {
  opacity: 1,
  scale: 1,
};

const baseMinimize = {
  opacity: 0,
  scale: 0.7,
  zIndex: 1,
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

export function useWindowTransition(entry: RndWindowType) {
  const [maximize, setMaximize] = useState<Variant>(
    Object.create(null) as Variant
  );
  const [minimize, setMinimize] = useState<Variant>(
    Object.create(null) as Variant
  );

  useLayoutEffect(() => {
    if (entry.minimized) {
      setMinimize({
        ...baseMinimize,
        x: -entry.x,
        y: window.innerHeight,
      });
    }
  }, [entry.minimized, entry.x]);

  useLayoutEffect(() => {
    if (entry.maximized) {
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
