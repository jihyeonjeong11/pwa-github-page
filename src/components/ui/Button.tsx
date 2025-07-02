import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, outerBorderActiveClass, outerBorderClass } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  cn(
    "relative  bg-primary-window-background border-2 text-black",
    outerBorderClass
  ),
  {
    variants: {
      variant: {
        primary: outerBorderActiveClass,
        secondary: cn(
          "bg-primary-background text-white",
          outerBorderActiveClass
        ),
        tertiary: cn("bg-[#000181] text-white", outerBorderActiveClass),
        info: cn("bg-[#00bf9a] text-white", outerBorderActiveClass),
        success: cn("bg-[#1e90ff] text-white", outerBorderActiveClass),
        warning: cn("bg-[#f5b759] text-white", outerBorderActiveClass),
        danger: cn("bg-[#FA5252] text-white", outerBorderActiveClass),
        disabled: "",
        focused:
          "bg-[#dadada] border-primary-button-border border-r-white border-b-white",
      },
      size: {
        small: "px-[1.6rem] py-[0.15rem] text-xs",
        regular: "",
        large: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "small",
    },
  }
);

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
        type="button"
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
