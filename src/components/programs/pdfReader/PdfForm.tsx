import { Button } from "@/components/ui/Button";
import { useEffect, useRef } from "react";

function PdfForm({ onDropPdf }: { onDropPdf: (file: File) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFormClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file" && item.type === "application/pdf") {
          const file = item.getAsFile();
          if (file) onDropPdf(file);
        } else {
          alert("Only PDF files are allowed.");
        }
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      [...e.target.files].forEach((file) => {
        if (file.type === "application/pdf") {
          onDropPdf(file);
        } else {
          alert("Only PDF files are allowed.");
        }
      });
    }
  };

  // todo: unfocus 시 동작하지 말아야 함.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (e.clipboardData!.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...e.clipboardData!.items].forEach((item) => {
          // If dropped items aren't files, reject them
          if (item.kind === "file" && item.type === "application/pdf") {
            const file = item.getAsFile();
            if (file) onDropPdf(file);
          } else {
            // do nothing
          }
        });
      }
    };

    document.addEventListener("paste", onPaste);

    return () => {
      document.removeEventListener("paste", onPaste);
    };
  }, [onDropPdf]);

  return (
    <form
      className="flex flex-col justify-center items-center h-full w-full p-8 cursor-pointer"
      action="upload-pdf"
      method="post"
      encType="multipart/form-data"
      onClick={onFormClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <legend className="mb-4 text-lg font-semibold">Select PDF</legend>

      <fieldset className="text-center flex flex-col items-center">
        <label className="text-gray-600 mb-2">
          Choose, paste or drag and drop.
        </label>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onChange}
        />
        <Button asChild className="p-2">
          <p className="mt-4 text-white  underline">Click or drag files here</p>
        </Button>
      </fieldset>
    </form>
  );
}

export default PdfForm;
