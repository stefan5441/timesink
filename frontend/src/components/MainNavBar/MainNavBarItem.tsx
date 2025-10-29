import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const MainNavBarItem = ({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button className="text-text text-3xl hover:text-primary transition-all duration-150" {...props}>
      {children}
    </button>
  );
};
