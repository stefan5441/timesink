import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  square?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", size = "medium", square, ...props }, ref) => {
    let sizeClasses = "";
    switch (size) {
      case "small":
        sizeClasses = "text-sm";
        break;
      case "medium":
        sizeClasses = "text-lg";
        break;
      case "large":
        sizeClasses = "text-xl";
        break;
    }

    return (
      <button
        ref={ref}
        className={`${className} ${sizeClasses} ${
          square ? "px-1" : "px-2"
        } py-1 bg-sky-100 rounded-full hover:bg-sky-200`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
