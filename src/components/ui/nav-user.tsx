"use client";

import {
  User
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();

  // const { user, isLoggedIn } = useAuth();

  // const fullNameInitials = user?.name?.split(" ").map((name) => name[0]).join("");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger onClick={() => {}} asChild>           
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
              
                  <User className="rounded-lg"></User>
                
              </Avatar>

              {/* <div className={"grid flex-1 text-left text-sm leading-tight"}>
                <span className="truncate font-semibold">
                  {isLoggedIn ? user?.name : "Sign In"}
                </span>
                <span className="truncate text-xs">
                  {isLoggedIn ? user?.email : "Login to your account"}
                </span>
              </div> */}
                           <div className={"grid flex-1 text-left text-sm leading-tight"}>
                <span className="truncate font-semibold">
                  Sign In
                </span>
                <span className="truncate text-xs">
                  Login to your account
                </span>
              </div>
 
              {/* {isLoggedIn && <ChevronsUpDown className="ml-auto" />} */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>              

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
