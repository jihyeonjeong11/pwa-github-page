// return [canvas with pdf pages]

import { useCallback, useEffect, useMemo, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

function usePDF(pdfUrl: string, width: number) {
  const [pages, setPages] = useState<HTMLCanvasElement[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "loaded" | "">("");

  const loadPage = useCallback(
    async (docs: PDFDocumentProxy, i: number) => {
      const page = await docs.getPage(i);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;

      const originalViewport = page.getViewport({ scale: 1 });

      const calculatedScale = width / originalViewport.width;

      const viewport = page.getViewport({ scale: calculatedScale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext);
      return canvas;
    },
    [width]
  );

  const loadPdf = useCallback(
    async (blob: string) => {
      try {
        const docs = await pdfjs.getDocument(blob).promise;
        const pdfInfo: PDFDocumentProxy = docs._pdfInfo;
        const totalPages = pdfInfo.numPages;
        const pagePromises = [];
        for (let i = 0; i < totalPages; i++) {
          pagePromises.push(loadPage(docs, i + 1));
        }

        const renderedCanvases = await Promise.all(pagePromises);
        setPages(renderedCanvases);
        setStatus("loaded");
      } catch (e) {
        setStatus("error");
        console.error(e, "error loading pdf");
      }
    },
    [loadPage]
  );

  useEffect(() => {
    if (pdfUrl) {
      setStatus("loading");
      loadPdf(pdfUrl);
    }
    return () => setStatus("");
  }, [loadPdf, pdfUrl]);

  const memoizedResult = useMemo(
    () => ({
      status,
      pages,
    }),
    [status, pages]
  );

  return memoizedResult;
}
export default usePDF;
