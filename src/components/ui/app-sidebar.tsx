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
  Home,
  Users,
  FolderKanban,
  BarChart3,
  Globe,
  Building2,
  BriefcaseBusiness,
  ListChecks,
  GraduationCap,
  BadgeCheck,
  Languages,
  Shapes,
  UserCog,
  Dumbbell,
  BriefcaseIcon,
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
      url: `${UserRoleEnum.RECRUITER ? "/recruiter" : "/admin"}`,
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
      icon: Users,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Categories",
      url: "/admin/categories",
      icon: FolderKanban,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Competencies",
      url: "/admin/competencies",
      icon: BarChart3,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Countries",
      url: "/admin/countries",
      icon: Globe,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Departments",
      url: "/admin/departments",
      icon: Building2,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Employees",
      url: "/admin/employees",
      icon: BriefcaseBusiness,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Evaluation Methods",
      url: "/admin/evaluation-methods",
      icon: ListChecks,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Institutions",
      url: "/admin/institutions",
      icon: GraduationCap,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Job Positions",
      url: "/admin/job-positions",
      icon: BadgeCheck,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Languages",
      url: "/admin/languages",
      icon: Languages,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Position Types",
      url: "/admin/position-types",
      icon: Shapes,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Recruiters",
      url: "/admin/recruiters",
      icon: UserCog,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.EMPLOYEE,
      },
    },
    {
      name: "Training",
      url: "/recruiter/training",
      icon: Dumbbell,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.RECRUITER,
      },
    },    
    {
      name: "Vacancies",
      url: "/recruiter/vacancies",
      icon: BriefcaseIcon,
      isActive: true,
      visibleProps: {
        userRole: UserRoleEnum.RECRUITER,
      },
    },    
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
