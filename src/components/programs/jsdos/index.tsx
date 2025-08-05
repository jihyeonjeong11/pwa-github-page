import { useRef } from "react";
import { useDos } from "./useDos";

// todo: emulator.js 상의 Dos를 expose할 방법.
function JsDos({ id }: { id: string }) {
  const containerRef = useRef(null);
  useDos(containerRef);
  return (
    <div id={id} className="w-full h-[calc(100%-30px)] text-black bg-white">
      <div ref={containerRef} style={{ width: "640px", height: "400px" }}>
        dosbox
      </div>
    </div>
  );
}

export default JsDos;
