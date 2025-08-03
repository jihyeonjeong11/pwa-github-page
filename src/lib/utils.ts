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

    console.log(123123);

    const link = document.createElement("link");

    link.fetchPriority = "high";
    link.rel = "preload";
    link.href = lib;

    switch (getExtension(lib)) {
      case ".css":
        link.as = "style";
        break;
      case ".htm":
      case ".html":
        link.rel = "prerender";
        break;
      case ".js":
        link.rel = "modulepreload";
        break;
      case ".json":
      case ".wasm":
        link.as = "fetch";
        link.crossOrigin = "anonymous";
        break;
      default:
        link.as = "script";
        break;
    }

    document.head.append(link);
  });
};
