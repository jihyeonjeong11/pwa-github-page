import { useContext, useRef } from "react";
import { useDos } from "./useDos";
import { ProcessContext } from "@/contexts/ProcessProvider";

// todo: emulator.js 상의 Dos를 expose할 방법.
function JsDos({ id }: { id: string }) {
  const containerRef = useRef(null);
  const { processes } = useContext(ProcessContext);
  const { libs } = processes.find((p) => p.id === id)!;
  useDos(containerRef, libs);

  return (
    <div id={id} className="w-full h-[calc(100%-30px)] text-black bg-white">
      <div ref={containerRef}>dosbox</div>
    </div>
  );
}

export default JsDos;
