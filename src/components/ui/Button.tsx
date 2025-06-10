import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "relative border-[2px] bg-primary-window-background border-white border-r-primary-button-border border-b-primary-button-border text-black",
  {
    variants: {
      variant: {
        primary:
          "active:translate-y-[2px] active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border",
        secondary:
          "bg-primary-background text-white active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border",
        tertiary:
          "bg-[#000181] text-white active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border",
        info: "bg-[#00bf9a] text-white active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border",
        success:
          "bg-[#1e90ff] text-white active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border",
        warning:
          " bg-[#f5b759] text-white active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border",
        danger:
          " bg-[#FA5252] text-white active:border-primary-button-border active:border-r-secondary-button-border active:border-b-secondary-button-border",
        disabled: "",
      },
      size: {
        default: "px-[1.6rem] py-[0.4rem] text-[0.53rem]",
        small: "px-[1.6rem] py-[0.4rem] text-[0.53rem]",
        regular: "",
        large: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
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
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
