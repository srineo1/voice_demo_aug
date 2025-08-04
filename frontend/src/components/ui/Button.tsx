import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/components/ui/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        ghost:
          "text-gray-800 disabled:text-gray-300 hover:bg-gray-100 hover:text-black dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:text-gray-600",
        primary: "bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:hover:text-black dark:disabled:bg-gray-700",
        outline:
          "border border-2 border-gray-100 text-gray-800 hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white",
        stop: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300 dark:bg-red-700 dark:text-white dark:hover:bg-red-800 dark:disabled:bg-red-900",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 w-10 rounded-full [&_svg]:size-6",
        iconSmall: "h-8 w-8 rounded-full [&_svg]:size-6",
        iconTiny: "h-6 w-6 rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
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
