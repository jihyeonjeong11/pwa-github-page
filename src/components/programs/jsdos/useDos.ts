import { RefObject, useEffect, useState } from "react";
// todo: fix this import
import { type DosInstance } from "emulators-ui/dist/types/js-dos";
import { loadFiles } from "@/lib/utils";

declare const Dos: unknown;

export function useDos(
  ref: RefObject<HTMLDivElement | null>,
  libs: string[] | undefined
) {
  const [dos, setDos] = useState<DosInstance | null>(null);

  useEffect(() => {
    if (!ref || !libs) return;
    const root = ref.current;
    loadFiles(libs).then(() => {
      if (window.Dos) {
        console.log("dos found");
        const instance = window.Dos(root);
        setDos(instance);
      }
    });
    return () => {
      dos && dos.stop();
    };
  }, []);

  useEffect(() => {
    if (dos !== null) {
      //dos.run("src/Program Files/js-dos/digger.jsdos");
    }
  }, [dos]);

  // useEffect(() => {
  //   // todo: Ensure this runs after script loading!!! solve race condition
  //   const root = ref.current;
  //   //window.emulators.pathPrefix = "src/Program Files/js-dos";

  //   if (root === null) return;
  //   console.log(Dos.run);
  //   //@ts-expect-error find better solution
  //   const instance = Dos(root);

  //   setDos(instance);
  //   return () => {
  //     instance.stop();
  //   };
  // }, [ref]);

  // useEffect(() => {
  //   if (dos !== null) {
  //     //dos.run("src/Program Files/js-dos/digger.jsdos");
  //   }
  // }, [dos]);
}
