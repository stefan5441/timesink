import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type DesktopNavBarItemProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
  }
>;

export const DesktopNavBarItem = ({ children, active = false, ...props }: DesktopNavBarItemProps) => {
  return (
    <button
      className={`text-3xl hover:text-primary transition-all duration-150 ${active ? "text-primary" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
