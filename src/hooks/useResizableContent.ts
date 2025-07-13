import { useEffect, useRef } from "react";

function useResizableContent(width, height, cb) {
  const prevSize = useRef({ width, height });
  useEffect(() => {
    if (
      width !== prevSize.current.width ||
      height !== prevSize.current.height
    ) {
      prevSize.current = { width, height };
      cb();
    }
  }, [width, height, cb]);
  // 1. width, height 변경되었을 때, useRef
  // 2. 새롭게 dimension 계산 functions.ts
  // 3. 콜백 리턴
}

export default useResizableContent;
