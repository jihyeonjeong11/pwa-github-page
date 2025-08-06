import { type DosFactoryType } from "emulators-ui/dist/types/js-dos";

declare global {
  interface Window {
    Dos: DosFactoryType;
  }
}
