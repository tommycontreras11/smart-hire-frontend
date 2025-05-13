"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { IAppSidebarProps } from "@/interfaces/sidebar.interface";
import {
  Home
} from "lucide-react";
import * as React from "react";
import { MainNav } from "./nav-main";

import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data: IAppSidebarProps = {
  mainNav: [
    {
      name: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      visibleProps: {
        bothRoles: true,
        default: true,
      },
    },
    {
      name: "Countries",
      url: "/admin/countries",
      icon: Home,
      isActive: true,
      visibleProps: {
        bothRoles: true,
        default: true,
      },
    }
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <MainNav
          // items={data.mainNav.filter((nav) =>
          //   !user?.uuid
          //     ? nav.visibleProps?.default
          //     : nav.visibleProps?.userRole == user.role ||
          //       nav.visibleProps?.bothRoles
          // )}
          items={data.mainNav}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
