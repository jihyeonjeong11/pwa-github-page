import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

// color: #ffffff;
// background-color: #008081;
// border-color: #008081;

const buttonVariants = cva("inline-flex border-[2px]", {
  variants: {
    variant: {
      default:
        "border-t-white border-l-white border-r-[#858585] border-b-[#858585]",
      primary:
        "border-t-white border-l-white border-r-[#858585] border-b-[#858585] text-black",
      secondary: "bg-[var(--primary-background)] text-white",
      tertiary: "",
      info: "",
      success: "",
      warning: "",
      danger: "",
      disabled:
        "bg-[var(--primary-background)] border-t-white border-l-white border-r-[#858585] border-b-[#858585] text-white pointer-events-none cursor-not-allowed",
    },
    size: {
      default: "px-[1.6rem] py-[0.4rem] text-[0.53rem]",
      small: "px-[1.6rem] py-[0.4rem] text-[0.53rem]",
      regular: "",
      large: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
