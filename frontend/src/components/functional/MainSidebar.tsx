import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ChartNoAxesCombined, Flame, House, LogOut, Moon, Sun } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
} from "../ui/sidebar";
import { useLogout } from "@/api/auth/authQueries";

export const MainSidebar = () => {
  const { isDark, toggleTheme } = useDarkMode();
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <Sidebar variant="floating" collapsible="icon" className="w-72">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            <SidebarMenuButton className="h-12 text-base justify-start gap-3 px-3" onClick={() => navigate("/")}>
              <House strokeWidth={2} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span>Home</span>
            </SidebarMenuButton>
            <SidebarMenuButton
              className="h-12 text-base justify-start gap-3 px-3"
              onClick={() => navigate("/activities")}
            >
              <Flame strokeWidth={2} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span>Activities</span>
            </SidebarMenuButton>
            <SidebarMenuButton className="h-12 text-base justify-start gap-3 px-3" onClick={() => navigate("/stats")}>
              <ChartNoAxesCombined strokeWidth={2} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span>See stats</span>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="space-y-1">
        <SidebarMenuButton className="h-12 text-base justify-start gap-3 px-3" onClick={toggleTheme}>
          {isDark ? (
            <Sun strokeWidth={2} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
          ) : (
            <Moon strokeWidth={2} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
          )}
          <span>Change mode</span>
        </SidebarMenuButton>
        <SidebarMenuButton className="h-12 text-base justify-start gap-3 px-3" onClick={() => logout.mutate()}>
          <LogOut strokeWidth={2} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
          <span>Log out</span>
        </SidebarMenuButton>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};
