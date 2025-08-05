import { RefObject, useEffect, useState } from "react";
// todo: fix this import
import { DosPlayer as Instance, DosPlayerFactoryType } from "js-dos";

declare const Dos: DosPlayerFactoryType;

export function useDos(ref: RefObject<HTMLDivElement | null>) {
  const [dos, setDos] = useState<Instance | null>(null);
  useEffect(() => {
    // todo: Ensure this runs after script loading!!! solve race condition
    const root = ref.current;
    //@ts-expect-error window.emulators exists
    window.emulators.pathPrefix = "src/Program Files/js-dos";

    if (root === null) return;

    const instance = Dos(root);

    setDos(instance);
    return () => {
      instance.stop();
    };
  }, [ref]);

  useEffect(() => {
    if (dos !== null) {
      dos.run();
    }
  }, [dos]);
}
