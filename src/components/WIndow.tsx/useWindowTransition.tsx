import { TASKBAR_HEIGHT } from "@/constants";
import { Variant } from "motion/react";
import { useLayoutEffect, useState } from "react";

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

const getMaxDimensions = (): Partial<Variant> => ({
  height: viewHeight() - TASKBAR_HEIGHT,
  width: viewWidth(),
});

export function useWindowTransition(entries) {
  // todo pass from rndTester

  // const { processes: { [id]: process } = {} } = useProcesses();
  // const { closing, componentWindow, maximized, minimized, taskbarEntry } =
  //   process || {};
  const [maximize, setMaximize] = useState<Variant>(
    Object.create(null) as Variant
  );
  const [minimize, setMinimize] = useState<Variant>(
    Object.create(null) as Variant
  );

  useLayoutEffect(() => {
    if (entries.minimized) {
      setMinimize({
        ...baseMinimize,
        x: window.innerWidth,
        y: window.innerHeight,
        backgroundColor: "red",
      });
    }
  }, [entries.minimized]);

  useLayoutEffect(() => {
    if (entries.maximized) {
      console.log("eiei");
      setMaximize({
        ...baseMaximize,
        x: 300,
        y: 600,
        backgroundColor: "blue",
      });
    }
  }, [entries.maximized]);

  return {
    animate: entries.minimized
      ? "minimize"
      : entries.maximized
      ? "maximize"
      : "",
    transition: {
      duration: 1,
    },
    variants: {
      initial: initial,
      maximize,
      minimize,
    },
  };
}
