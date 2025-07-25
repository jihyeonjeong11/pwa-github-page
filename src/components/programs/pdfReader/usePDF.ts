import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

function usePDF(pdfUri: string, width: number) {
  const [pages, setPages] = useState<HTMLCanvasElement[]>([]);
  const [page, setPage] = useState({ total: 0, current: 0 });
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState<"loading" | "error" | "loaded" | "">("");

  const loadPage = useCallback(
    async (docs: PDFDocumentProxy, i: number) => {
      const page = await docs.getPage(i);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      // todo: js-pdf 스케일이 반대로 적용되고 있음. 원인 필요
      const originalViewport = page.getViewport({ scale });
      const scaleToFitDesiredWidth = width / 1.5 / originalViewport.width;
      const caliberatedViewport = page.getViewport({
        scale: scaleToFitDesiredWidth,
      });

      const devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(caliberatedViewport.width * devicePixelRatio);
      canvas.height = Math.floor(caliberatedViewport.height * devicePixelRatio);
      canvas.style.width = `${caliberatedViewport.width}px`;
      canvas.style.height = `${caliberatedViewport.height}px`;

      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
      context.scale(devicePixelRatio, devicePixelRatio);
      const renderContext = {
        canvasContext: context,
        viewport: caliberatedViewport,
      };
      await page.render(renderContext);
      return canvas;
      // canvas element에 가상화를 적용할 수 있는지?
    },
    // todo: width 변경 시 새 사이즈로 로드. 현재로써는 퍼포먼스 이슈로 도입 불가 scale 역시 마찬가지임
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scale]
  );

  const loadPdf = useCallback(
    async (uri: string) => {
      try {
        const docs = await pdfjs.getDocument(uri).promise;
        const pdfInfo: PDFDocumentProxy = docs._pdfInfo;
        const totalPages = pdfInfo.numPages;
        const pagePromises = [];
        for (let i = 0; i < totalPages; i++) {
          pagePromises.push(loadPage(docs, i + 1));
        }

        const renderedCanvases = await Promise.all(pagePromises);
        setPages(renderedCanvases);
        setPage({ current: 1, total: totalPages });
        setStatus("loaded");
      } catch (e) {
        setStatus("error");
        console.error(e, "error loading pdf");
      }
    },
    [loadPage]
  );

  useEffect(() => {
    if (pdfUri) {
      setStatus("loading");
      loadPdf(pdfUri);
    }
    return () => {
      setPages([]);
      setStatus("");
    };
  }, [loadPdf, pdfUri]);

  const onChangeInputPage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newPage = Number(e.target.value);

      if (Number.isNaN(newPage) || newPage < 1 || newPage > page.total) {
        return;
      }

      setPage((prev) => ({ ...prev, current: Number(e.target.value) }));

      const pages = document.querySelectorAll("[id^='pdf-']");
      pages[newPage - 1].scrollIntoView();
    },
    [page.total]
  );

  const onChangePage = useCallback((current: number) => {
    setPage((prev) => ({ ...prev, current }));
  }, []);

  const onChangeScale = useCallback((bool: boolean) => {
    //
    setScale((p) => {
      if (bool) {
        return Math.max(Number((p - 0.1).toFixed(1)), 0.1); // 스케일의 최소값 (확대의 최대치)
      } else {
        return Math.min(Number((p + 0.1).toFixed(1)), 2);
      }
    });
  }, []);

  const memoizedResult = useMemo(
    () => ({
      status,
      pages,
      page,
      scale,
      onChangePage,
      onChangeInputPage,
      onChangeScale,
    }),
    [status, pages, page, scale, onChangePage, onChangeInputPage, onChangeScale]
  );

  return memoizedResult;
}
export default usePDF;
