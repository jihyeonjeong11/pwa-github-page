import { useContext, useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { ComponentProcessProps } from "../AppRenderer";
import { ProcessContext } from "@/contexts/ProcessProvider";
import { PDFDocumentProxy } from "pdfjs-dist";
import Skeleton from "react-loading-skeleton";

const testPdfUrl = `https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf`;
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
const BASE_SCALE = 1.5;

// todo: web pdf -> local pdf from static path -> local pdf from fs
// todo: usePdf hook
// todo: usePdfSize hook , 아니라면, 사이즈를 고정으로 두고 확대/축소만 가능하도록..
// todo: pdf loader -> drag and drop or upload button -> pdf load
function PdfReader({
  id,
  pdfUrl = testPdfUrl,
}: ComponentProcessProps & { pdfUrl?: string }) {
  const { processes } = useContext(ProcessContext);
  const { width } = processes.find((p) => p.id === id)!;
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // todo: process로 다룰 것.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPdf = async () => {
      setLoading(true);
      setError("");

      if (!pdfUrl) {
        setError("No PDF URL provided");
        setLoading(false);
        return;
      }
      // First loading
      if (!pdfRef.current) {
        try {
          const loadingTask = pdfjs.getDocument(testPdfUrl);
          pdfRef.current = await loadingTask.promise;
          setTotalPages(pdfRef.current._pdfInfo.numPages);

          if (pageNum !== 1) {
            setPageNum(1);
            return;
          }
        } catch (e) {
          console.error(e, "error loading pdf");
        }
      } else {
        // Page change
        if (pdfRef.current && canvasRef.current) {
          try {
            const page = await pdfRef.current.getPage(pageNum);
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d")!;
            const scale = BASE_SCALE;
            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            await page.render(renderContext).promise;
          } catch (e) {
            console.log(e, "error reendering page");
          } finally {
            setLoading(false);
          }
        }
      }
    };
    loadPdf();
  }, [pdfUrl, pageNum, totalPages]);

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="w-full">
      {loading && <>loading...</>}
      {/* todo: add title */}
      <div className="overflow-hidden w-ful h-[calc(100%-60px)]">
        <canvas ref={canvasRef} className="w-full" />
      </div>
      {!loading && pdfRef.current && (
        <div className="flex flex-col items-center mt-6">
          <div className="mb-4 text-gray-700">
            Page {pageNum} of {totalPages}
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
              disabled={pageNum <= 1}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPageNum((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={pageNum >= totalPages}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfReader;
