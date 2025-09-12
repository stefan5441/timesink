import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "@/components/functional/MainSidebar";
import { useState, type ReactNode } from "react";

interface LayoutWithSidebarProps {
  children: ReactNode;
}

export const LayoutWithSidebar = ({ children }: LayoutWithSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
        <MainSidebar />
        <main className="flex-1 flex flex-col">{children}</main>
      </SidebarProvider>
    </div>
  );
};
