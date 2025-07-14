import { useContext, useState } from "react";
import { ComponentProcessProps } from "../AppRenderer";
import { ProcessContext } from "@/contexts/ProcessProvider";
import PdfForm from "./PdfForm";
import usePDF from "./usePDF";
import PdfPage from "./pdfPage";

// const testPdfUrl = `https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf`;

// todo: pdf 컨트롤, useIntersectionObserver

// todo: useResizableContent hook , resizeObserver needed
// todo: onDrag 리사이징
// todo: canvas 렌더러
// todo: usePdf hook 클리닝

function PdfReader({ id }: ComponentProcessProps & { pdfUrl?: string }) {
  const [pdfBlob, setPdfBlob] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");

  const { processes } = useContext(ProcessContext);
  const { width, height } = processes.find((p) => p.id === id)!;
  const { status, pages } = usePDF(pdfBlob, width!, height!);

  const onDropPdf = (file: File) => {
    setPdfBlob(URL.createObjectURL(file));
    setPdfTitle(file.name);
  };

  if (!pdfBlob) {
    return <PdfForm onDropPdf={onDropPdf} />;
  }

  if (status === "error") {
    return <div>Error!</div>;
  }

  return (
    <div className="w-full h-[calc(100%-30px)] text-black bg-primary-background ">
      {/* todo: header control, title, pagecount, zooming, download, print */}
      {/* <nav className="h-[30px] flex justify-between px-2">
        <div>{pdfTitle}</div>
        <div className="flex">
          <div className="flex">
            <div>{pages.length}</div>
            <div> / </div>
            <div>{pages.length}</div>
          </div>
          <div>zooming</div>
        </div>
        <div>controls</div>
      </nav> */}
      {status === "loading" && <>loading...</>}
      <div className="w-full h-full overflow-y-scroll">
        <ol className="flex justify-center flex-col items-center">
          {pages.slice(0, 10).map((canvas, index) => (
            <PdfPage canvas={canvas} key={index} id={id} page={1} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default PdfReader;
