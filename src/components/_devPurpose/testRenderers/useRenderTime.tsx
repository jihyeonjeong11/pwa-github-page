import { useLayoutEffect } from "react";

export default function useRenderTime(name: string) {
  console.time(name + "started");

  useLayoutEffect(() => {
    console.timeEnd(name + "ended");
  });
}
