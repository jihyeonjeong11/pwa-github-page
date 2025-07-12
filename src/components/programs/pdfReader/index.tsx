import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";

const testPdfUrl = `https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf`;
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

// todo: web pdf -> local pdf from static path -> local pdf from fs
function PdfReader() {
  const pageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfPage, setPdfPage] = useState(null);

  useEffect(() => {
    const loadingTask = pdfjs.getDocument(testPdfUrl);
    loadingTask.promise.then(function (pdf) {
      console.log("LOADED", pdf);
      pdf.getPage(1).then(function (p) {
        console.log("Page loaded", p);
        setPdfPage(p);
        const viewport = p.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current.getContext("2d");

        p.render({
          canvasContext: canvas,
          viewport: viewport,
        });
      });
    });
    loadingTask.promise.catch(function (e) {
      console.error("Error loading PDF: ", e);
    });
  }, []);

  return (
    <div>
      <h1>PDF Reader Component</h1>
      <canvas ref={canvasRef} width={600} height={800} />
      <div ref={pageRef}></div>
    </div>
  );
}

export default PdfReader;
