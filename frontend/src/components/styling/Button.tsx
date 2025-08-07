import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className = "", ...props }, ref) => {
  return (
    <button ref={ref} className={`${className} bg-teal-600 px-3 py-2 rounded-xl hover:bg-teal-700`} {...props}>
      {children}
    </button>
  );
});

export default Button;
