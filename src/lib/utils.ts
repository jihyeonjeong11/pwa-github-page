import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { extname, basename } from "path-browserify";
import { ONE_TIME_PASSIVE_EVENT } from "@/constants";

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

export const loadStyle = (href: string) =>
  new Promise((resolve, reject) => {
    const links = [
      ...document.querySelectorAll("link[rel=stylesheet]"),
    ] as HTMLLinkElement[];
    if (links.some((link) => link.href.endsWith(href))) {
      return resolve(new Event("Already loaded."));
    }

    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.fetchPriority = "high";
    link.href = href;
    link.addEventListener("error", reject, ONE_TIME_PASSIVE_EVENT);
    link.addEventListener("load", resolve, ONE_TIME_PASSIVE_EVENT);

    document.head.append(link);
  });

export const loadScript = (src: string) =>
  new Promise((resolve, reject) => {
    const scripts = [...document.scripts];
    if (scripts.find((script) => script.src.endsWith(src))) {
      return resolve(new Event("Already loaded."));
    }

    const script = document.createElement("script");
    script.async = false;
    script.fetchPriority = "high";
    script.src = src;
    script.addEventListener("error", reject, ONE_TIME_PASSIVE_EVENT);
    script.addEventListener("load", resolve, ONE_TIME_PASSIVE_EVENT);

    document.head.append(script);
  });

export const loadFiles = async (files?: string[]): Promise<void> =>
  !files || files.length === 0
    ? Promise.resolve()
    : files.reduce(async (_promise, file) => {
        await (getExtension(file) === ".css"
          ? loadStyle(encodeURI(file))
          : loadScript(encodeURI(file)));
      }, Promise.resolve());

export const preloadLibs = (libs: string[] = []) => {
  const scripts = [...document.scripts];

  libs.map(encodeURI).forEach((lib) => {
    if (scripts.some((script) => script.src.endsWith(lib))) {
      return;
    }

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
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/modulepreload
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
