import { memo, useEffect, useRef } from "react";

function PdfPage({
  canvas,
  id,
  page,
  onChangePage,
}: {
  canvas: HTMLCanvasElement;
  id: string;
  page: number;
  onChangePage: (current: number) => void;
}) {
  const containerRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (canvas && containerRef.current) {
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.append(canvas);
    }

    return () => canvas?.remove();
  }, [canvas]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined = undefined;
    if (containerRef.current instanceof HTMLElement) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ isIntersecting }) => {
            if (isIntersecting) {
              onChangePage(page);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(containerRef.current);

      return () => observer?.disconnect();
    }
  }, [page, onChangePage]);

  return <li id={id} ref={containerRef} />;
}

export default memo(PdfPage);
