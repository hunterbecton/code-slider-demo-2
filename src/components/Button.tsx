import { cn } from "../utils/utils";
import { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "brand" | "ghost";
};

export const Button: FC<ButtonProps> = ({
  variant = "brand",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "h-10 rounded-md px-3 text-sm font-medium text-white-alpha-950 ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-brand-600 hover:bg-brand-500": variant === "brand",
          "border-[1.5px] border-white-alpha-200 bg-transparent hover:bg-white-alpha-100":
            variant === "ghost",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
