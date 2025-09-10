import { useDarkMode } from "@/hooks/useDarkMode";
import { ChartNoAxesCombined, House, Moon, Pencil, Play, Sun, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "../ui/sidebar";
import { useState } from "react";

export const MainSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isDark, toggleTheme } = useDarkMode();

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <SidebarTrigger className="fixed top-4 right-4 z-50" />

      <Sidebar side="right" variant="sidebar" className="w-56">
        <SidebarHeader className="flex justify-center py-4">
          <SidebarMenuButton>
            <User /> Profile
          </SidebarMenuButton>
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <House />
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Play />
                  Record an activity
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Pencil /> Manage your activities
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ChartNoAxesCombined /> See stats
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <SidebarMenuSubButton onClick={toggleTheme}>{isDark ? <Sun /> : <Moon />} Change mode</SidebarMenuSubButton>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
