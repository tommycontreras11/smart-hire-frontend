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
import { UserRoleEnum } from "@/enums/common.enum";
import { useAuth } from "@/contexts/auth-context";

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
      name: "Candidates",
      url: "/admin/candidates",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Categories",
      url: "/admin/categories",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Countries",
      url: "/admin/countries",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Departments",
      url: "/admin/departments",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Employees",
      url: "/admin/employees",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Evaluation Methods",
      url: "/admin/evaluation-methods",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Institutions",
      url: "/admin/institutions",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Job Positions",
      url: "/admin/job-positions",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },    
    {
      name: "Languages",
      url: "/admin/languages",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },  
    {
      name: "Position Types",
      url: "/admin/position-types",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Recruiters",
      url: "/admin/recruiters",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Training",
      url: "/recruiter/training",
      icon: Home,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.RECRUITER,
      },
    }
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <MainNav
          items={data.mainNav.filter((nav) =>
            !user?.uuid
              ? nav.visibleProps?.default
              : nav.visibleProps?.userRole == user.role ||
                nav.visibleProps?.bothRoles
          )}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
