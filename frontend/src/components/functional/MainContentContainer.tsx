import { type ReactNode } from "react";

interface MainContentContainerProps {
  children: ReactNode;
  className?: string;
}

export const MainContentContainer = ({ children, className = "" }: MainContentContainerProps) => {
  return <div className={`px-8 py-6 ${className}`}>{children}</div>;
};
