// Container
// Header title
// Content Container
// close button
// buttons

import * as React from "react";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

const WindowRoot = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.section
      ref={ref}
      className={cn(
        "w-full h-full bg-primary-window-background text-white border-t-white border-l-white border-r-[#393939] border-b-[#393939] border-[2px]",
        className
      )}
      {...props}
    />
  )
);
WindowRoot.displayName = "WindowRoot";

const WindowHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      "bg-primary-header-background h-window-header-height p-1  border-[2px] border-[#bdbdbd] text-base inline-flex w-full truncate",
      className
    )}
    {...props}
  />
));
WindowHeader.displayName = "WindowHeader";

const WindowContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "py-[10px] px-[7px] text-black text-sm border-x-[3px] border-y-[2px] border-[#bdbdbd]",
      className
    )}
    {...props}
  />
));
WindowContent.displayName = "WindowContent";

const WindowFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-[10px] px-[7px] flex", className)}
    {...props}
  />
));
WindowFooter.displayName = "WindowFooter";

export { WindowRoot, WindowHeader, WindowContent, WindowFooter };
