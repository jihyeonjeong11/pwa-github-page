import { memo, useEffect, useRef } from "react";

function PdfPage({
  canvas,
}: {
  canvas: HTMLCanvasElement;
  id: string;
  page: number; // todo: 페이지 핸들러 아마 IntersectionObserver
}) {
  const containerRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    if (canvas) containerRef.current?.append(canvas);

    return () => canvas?.remove();
  }, [canvas]);

  return <li ref={containerRef} />;
}

export default memo(PdfPage);
