import { useContext, useState } from "react";
import { ComponentProcessProps } from "../AppRenderer";
import { ProcessContext } from "@/contexts/ProcessProvider";
import PdfForm from "./PdfForm";
import usePDF from "./usePDF";
import PdfPage from "./PdfPage";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Printer } from "@/images";
// const testPdfUrl = `https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf`;

function PdfReader({ id }: ComponentProcessProps & { pdfUrl?: string }) {
  const [pdfBlob, setPdfBlob] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");

  const { processes } = useContext(ProcessContext);
  const { width } = processes.find((p) => p.id === id)!;
  const {
    status,
    pages,
    page,
    scale,
    onChangePage,
    onChangeInputPage,
    onChangeScale,
  } = usePDF(pdfBlob, width!);

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
      <nav className="flex-shrink-0 h-[35px] flex px-2 py-1 bg-primary-window-background">
        <div className="text-start w-full overflow-hidden">
          <p className="truncate">{pdfTitle}</p>
        </div>
        <div className="flex w-full">
          <div className="flex w-full items-center justify-center">
            <div className="w-full flex justify-center items-center gap-4">
              <div className="flex gap-2 justify-center items-center">
                <Input
                  className="w-[36px]"
                  value={page.current}
                  onChange={onChangeInputPage}
                />
                <div> / {page.total}</div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <Button
                  className="p-0 w-[22px]"
                  onClick={() => onChangeScale(false)}
                >
                  -
                </Button>

                <span>x{scale}</span>
                <Button
                  className="p-0 w-[22px]"
                  onClick={() => onChangeScale(true)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button
            className={"p-0 w-[32px] flex items-center justify-center"}
            variant="primary"
            onClick={async () => {
              const { default: printJs } = await import("print-js");
              printJs({
                printable: pdfBlob,
                type: "pdf",
              });
            }}
          >
            {/* todo: 트랜지션 로딩 버튼 */}
            <img src={Printer} className="p-1" />
          </Button>
        </div>
      </nav>
      {status === "loading" && <>loading...</>}
      <div className="w-full h-full overflow-y-scroll">
        <ol className="flex justify-center flex-col items-center gap-2">
          {pages.map((canvas, index) => (
            <PdfPage
              canvas={canvas}
              key={index}
              id={`pdf-${index}`}
              page={index + 1}
              onChangePage={onChangePage}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default PdfReader;
