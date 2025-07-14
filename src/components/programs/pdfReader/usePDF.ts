import { useCallback, useEffect, useMemo, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

function usePDF(pdfUri: string, width: number) {
  const [pages, setPages] = useState<HTMLCanvasElement[]>([]);
  const [page, setPage] = useState({ total: 0, current: 0 });
  const [status, setStatus] = useState<"loading" | "error" | "loaded" | "">("");

  const loadPage = useCallback(async (docs: PDFDocumentProxy, i: number) => {
    const page = await docs.getPage(i);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    const originalViewport = page.getViewport({ scale: 1 });
    const scaleToFitDesiredWidth = width / 2 / originalViewport.width;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onChangePage = useCallback((current: number) => {
    setPage((prev) => ({ ...prev, current }));
  }, []);

  const memoizedResult = useMemo(
    () => ({
      status,
      pages,
      page,
      onChangePage,
    }),
    [status, pages, page, onChangePage]
  );

  return memoizedResult;
}
export default usePDF;
