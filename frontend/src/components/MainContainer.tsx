import type { PropsWithChildren } from "react";
import { MainNavBar } from "./MainNavBar/MainNavBar";

type Props = {
  className?: string;
};

export const MainContainer = ({ children, className = "" }: PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col h-screen px-10 py-8 md:px-20 md:py-8">
      <div className="shrink-0">
        <MainNavBar />
      </div>
      <hr />
      <main className={`flex-1 min-h-0 pt-8 pb-8 ${className}`}>{children}</main>
      <hr />
      <footer className="mt-4 shrink-0 text-xs md:text-md">
        An app to measure time spent on things you care about. Great job being here! :)
      </footer>
    </div>
  );
};
