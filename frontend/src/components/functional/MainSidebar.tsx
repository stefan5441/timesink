import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ChartNoAxesCombined, House, LogOut, Moon, Pencil, Play, Sun, User } from "lucide-react";
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
  const navigate = useNavigate();

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
            <SidebarMenuButton className="whitespace-nowrap overflow-hidden" onClick={() => navigate("/")}>
              <House />
              Home
            </SidebarMenuButton>
            <SidebarMenuButton
              className="whitespace-nowrap overflow-hidden"
              onClick={() => navigate("/record-activity")}
            >
              <Play />
              Record activity
            </SidebarMenuButton>
            <SidebarMenuButton
              className="whitespace-nowrap overflow-hidden"
              onClick={() => navigate("/manage-activities")}
            >
              <Pencil /> Manage activities
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
        <SidebarMenuButton className="whitespace-nowrap overflow-hidden">
          <LogOut /> Log out
        </SidebarMenuButton>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};
