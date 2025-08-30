import React, { type ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconType;
  content?: string;
  size?: "small" | "medium" | "large";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", size = "large", icon: Icon, content, ...props }, ref) => {
    let sizeClasses = "";
    let iconSize = 16;

    const isIconOnly = Icon && !content;

    switch (size) {
      case "small":
        sizeClasses = isIconOnly ? "p-1" : "text-xs px-3 font-semibold";
        iconSize = 14;
        break;
      case "medium":
        sizeClasses = isIconOnly ? "p-1" : "text-sm px-3 font-semibold";
        iconSize = 16;
        break;
      case "large":
        sizeClasses = isIconOnly ? "p-1" : "text-lg px-5 font-medium";
        iconSize = 20;
        break;
    }

    return (
      <button
        ref={ref}
        className={`${className} ${sizeClasses} ${
          !isIconOnly && "pt-1 pb-1.5"
        } rounded-full flex justify-center items-center gap-1 bg-sky-100 text-zinc-800 hover:bg-sky-200`}
        {...props}
      >
        {Icon && <Icon size={iconSize} />}
        {content && <span>{content}</span>}
      </button>
    );
  }
);
