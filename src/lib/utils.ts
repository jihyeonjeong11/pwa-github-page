import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { extname, basename } from "path-browserify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const outerBorderClass =
  "border-2 border-white border-r-primary-button-border border-b-primary-button-border";
export const innerBorderClass =
  "border-2 border-white border-l-primary-button-border border-t-primary-button-border";
export const outerBorderActiveClass =
  "active:translate-y-[2px] active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border";

export const getExtension = (url: string): string => {
  let ext = extname(url);

  if (!ext) {
    const baseName = basename(url);

    if (baseName.startsWith(".")) ext = baseName;
  }

  return ext.toLowerCase();
};

export const preloadLibs = (libs: string[] = []) => {
  const scripts = [...document.scripts];
  console.log("start", libs);

  libs.map(encodeURI).forEach((lib) => {
    if (scripts.some((script) => script.src.endsWith(lib))) {
      return;
    }

    const link = document.createElement("link");
    link.fetchPriority = "high";
    link.href = lib;

    // todo: better execute preloaded js in another block
    switch (getExtension(lib)) {
      case ".css":
        link.as = "style";
        document.head.append(link);
        break;
      case ".htm":
      case ".html":
        link.rel = "prerender";
        document.head.append(link);
        break;
      case ".js":
        document.head.append(link);

        // eslint-disable-next-line no-case-declarations
        const script = document.createElement("script");
        script.src = lib;
        document.head.append(script);
        break;
      case ".json":
      case ".wasm":
        link.as = "fetch";
        link.crossOrigin = "anonymous";
        document.head.append(link);
        break;
      default:
        link.as = "script";
        document.head.append(link);
        break;
    }
  });
};
