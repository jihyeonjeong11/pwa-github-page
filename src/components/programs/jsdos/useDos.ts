import { RefObject, useEffect, useState } from "react";
// todo: fix this import
import { type DosInstance } from "emulators-ui/dist/types/js-dos";

declare const Dos: unknown;

export function useDos(ref: RefObject<HTMLDivElement | null>) {
  const [dos, setDos] = useState<DosInstance | null>(null);
  useEffect(() => {
    // todo: Ensure this runs after script loading!!! solve race condition
    const root = ref.current;
    //@ts-expect-error window.emulators exists
    //window.emulators.pathPrefix = "src/Program Files/js-dos";

    if (root === null) return;
    console.log(Dos.run);
    //@ts-expect-error find better solution
    const instance = Dos(root);

    setDos(instance);
    return () => {
      instance.stop();
    };
  }, [ref]);

  useEffect(() => {
    if (dos !== null) {
      //dos.run("src/Program Files/js-dos/digger.jsdos");
    }
  }, [dos]);
}
