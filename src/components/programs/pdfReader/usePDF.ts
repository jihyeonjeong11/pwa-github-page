// return [canvas with pdf pages]

import { useCallback, useEffect, useMemo, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

const scale = 1.5;
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

function usePDF(pdfUrl: string) {
  const [pages, setPages] = useState<HTMLCanvasElement[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "loaded" | "">("");

  const loadPage = async (docs: PDFDocumentProxy, i: number) => {
    const page = await docs.getPage(i);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    const viewport = page.getViewport({ scale });
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext);
    return canvas;
  };

  const loadPdf = useCallback(async (blob: string) => {
    try {
      const docs = await pdfjs.getDocument(blob).promise;
      const pdfInfo: PDFDocumentProxy = docs._pdfInfo;
      const totalPages = pdfInfo.numPages;
      const pagePromises = [];
      for (let i = 0; i < totalPages; i++) {
        pagePromises.push(loadPage(docs, i + 1));
      }

      // *** THIS IS THE KEY CHANGE ***
      const renderedCanvases = await Promise.all(pagePromises);
      setPages(renderedCanvases);
      setStatus("loaded");
    } catch (e) {
      setStatus("error");
      console.error(e, "error loading pdf");
    }
  }, []);

  useEffect(() => {
    setStatus("loading");
    loadPdf(pdfUrl);
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

// useEffect(() => {
//   const loadPdf = async () => {
//     setLoading(true);
//     setError("");

//     if (!pdfUrl) {
//       setLoading(false);
//       return;
//     }
//     // First loading
//     if (!pdfRef.current) {
//       try {
//         const loadingTask = pdfjs.getDocument(pdfUrl);
//         pdfRef.current = await loadingTask.promise;
//         setTotalPages(pdfRef.current._pdfInfo.numPages);

//         if (pageNum !== 1) {
//           setPageNum(1);
//           return;
//         }
//       } catch (e) {
//         console.error(e, "error loading pdf");
//       }
//     } else {
//       // Page change
//       if (pdfRef.current && canvasRef.current) {
//         try {
//           const page = await pdfRef.current.getPage(pageNum);
//           const canvas = canvasRef.current;
//           const context = canvas.getContext("2d", {
//             alpha: false,
//             desynchronized: true,
//           })!;
//           const scale = BASE_SCALE;
//           const viewport = page.getViewport({ scale });
//           // todo: make it dynamic?
//           canvas.height = height! - 200; // viewport.height;
//           canvas.width = width!; // viewport.width;
//           const renderContext = {
//             canvasContext: context,
//             viewport: viewport,
//           };
//           await page.render(renderContext).promise;
//         } catch (e) {
//           console.log(e, "error reendering page");
//         } finally {
//           setLoading(false);
//         }
//       }
//     }
//   };
//   loadPdf();
// }, [pdfUrl, pageNum, totalPages, height, width]);
// 1.
export default usePDF;
