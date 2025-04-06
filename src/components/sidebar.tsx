"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Leaf, Map, Plus, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className={`flex flex-col items-center justify-center py-4 ${isCollapsed ? "px-2" : "px-4"}`}>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-emerald-600" />
          </div>
          {!isCollapsed && <span className="font-bold text-xl">Hacienda</span>}
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarMenu className={isCollapsed ? "items-center" : ""}>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/dashboard")}
              tooltip="Dashboard"
            >
              <Link href="/dashboard" className={isCollapsed ? "justify-center w-full" : ""}>
                <Home className="h-4 w-4" />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/farms")}
              tooltip="Farms"
            >
              <Link href="/farms" className={isCollapsed ? "justify-center w-full" : ""}>
                <Map className="h-4 w-4" />
                {!isCollapsed && <span>Farms</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/settings")}
              tooltip="Settings"
            >
              <Link href="/settings" className={isCollapsed ? "justify-center w-full" : ""}>
                <Settings className="h-4 w-4" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className={`p-4 ${isCollapsed ? "px-2" : ""}`}>
        <div className="flex flex-col gap-4">
          <Button
            asChild
            className={`w-full bg-emerald-600 hover:bg-emerald-700 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Link href="/farms/onboard">
              <Plus className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`} />
              {!isCollapsed && "Add New Farm"}
            </Link>
          </Button>
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start"} w-full`}>
            <SidebarTrigger className="cursor-pointer" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
