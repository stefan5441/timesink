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
  SidebarTrigger,
} from "../ui/sidebar";

export const MainSidebar = () => {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <Sidebar variant="floating" collapsible="icon" className="w-56">
      <SidebarHeader className="flex justify-center py-4">
        <SidebarMenuButton>
          <User /> Profile
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton className="whitespace-nowrap overflow-hidden">
              <House />
              Home
            </SidebarMenuButton>
            <SidebarMenuButton className="whitespace-nowrap overflow-hidden">
              <Play />
              Record an activity
            </SidebarMenuButton>
            <SidebarMenuButton className="whitespace-nowrap overflow-hidden">
              <Pencil /> Manage your activities
            </SidebarMenuButton>
            <SidebarMenuButton className="whitespace-nowrap overflow-hidden">
              <ChartNoAxesCombined /> See stats
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton className="whitespace-nowrap overflow-hidden" onClick={toggleTheme}>
          {isDark ? <Sun /> : <Moon />} Change mode
        </SidebarMenuButton>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};
