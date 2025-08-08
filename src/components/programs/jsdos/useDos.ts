import { RefObject, useEffect, useState } from "react";
import { type DosInstance } from "emulators-ui/dist/types/js-dos";
import { loadFiles } from "@/lib/utils";

export function useDos(
  ref: RefObject<HTMLDivElement | null>,
  libs: string[] | undefined
) {
  const [dos, setDos] = useState<DosInstance | null>(null);

  useEffect(() => {
    if (!ref || !libs || !ref) return;
    const root = ref.current!;
    loadFiles(libs).then(() => {
      if (window.Dos) {
        const instance = window.Dos(root);
        setDos(instance);
      }
    });
    return () => {
      if (dos) dos.stop();
    };
    // todo: seperate of concerns
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
