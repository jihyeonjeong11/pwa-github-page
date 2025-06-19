import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const outerBorderClass =
  "border-2 border-white border-r-primary-button-border border-b-primary-button-border";
export const innerBorderClass =
  "border-2 border-white border-l-primary-button-border border-t-primary-button-border";
export const outerBorderActiveClass =
  "active:translate-y-[2px] active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border";
