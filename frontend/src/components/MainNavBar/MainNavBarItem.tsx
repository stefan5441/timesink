import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type MainNavBarItemProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
  }
>;

export const MainNavBarItem = ({ children, active = false, ...props }: MainNavBarItemProps) => {
  return (
    <button
      className={`text-3xl hover:text-primary transition-all duration-150 ${active ? "text-primary" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
