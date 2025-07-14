import { useContext, useState } from "react";
import { ComponentProcessProps } from "../AppRenderer";
import { ProcessContext } from "@/contexts/ProcessProvider";
import PdfForm from "./PdfForm";
import usePDF from "./usePDF";
import PdfPage from "./pdfPage";

// const testPdfUrl = `https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf`;

// todo: pdf 컨트롤, useIntersectionObserver

// todo: useResizableContent hook , resizeObserver needed

function PdfReader({ id }: ComponentProcessProps & { pdfUrl?: string }) {
  const [pdfBlob, setPdfBlob] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");

  const { processes } = useContext(ProcessContext);
  const { width } = processes.find((p) => p.id === id)!;
  const { status, pages } = usePDF(pdfBlob, width!);

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
    <div className="flex flex-col w-full h-[calc(100%-30px)] text-black bg-primary-background ">
      {/* todo: header control, title, pagecount, zooming, download, print */}
      <nav className="flex-shrink-0 h-[35px] flex justify-between px-2 pt-1">
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
      </nav>
      {status === "loading" && <>loading...</>}
      <div className="w-full h-full overflow-y-scroll">
        <ol className="flex justify-center flex-col items-center">
          {pages.map((canvas, index) => (
            <PdfPage canvas={canvas} key={index} id={id} page={index} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default PdfReader;
