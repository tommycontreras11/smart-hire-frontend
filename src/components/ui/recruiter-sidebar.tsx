'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from './user-nav';

const navItems = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Vacantes', href: '/vacantes', icon: Briefcase },
  { name: 'Candidatos', href: '/candidatos', icon: Users },
  { name: 'Entrevistas', href: '/entrevistas', icon: Calendar },
  { name: 'Reportes', href: '/reportes', icon: Clipboard },
  { name: 'Configuración', href: '/configuracion', icon: Settings },
];

export function RecruiterSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-background/95 backdrop-blur-sm transition-all lg:relative lg:z-0",
          expanded ? "w-64" : "w-[70px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Close button for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Logo area */}
        <div className={cn("flex h-16 items-center border-b px-4", 
          expanded ? "justify-between" : "justify-center")}>
          {expanded && (
            <span className="text-xl font-semibold">
              RH<span className="text-primary">Recruit</span>
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={() => setExpanded(!expanded)}
            aria-label="Toggle sidebar"
          >
            {expanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground",
                    !expanded && "justify-center"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", 
                    expanded && "mr-3")} />
                  {expanded && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User & theme area */}
        <div className={cn(
          "flex items-center border-t p-4",
          expanded ? "justify-between" : "justify-center"
        )}>
          {expanded && <UserNav />}
          {/* <ThemeSwitcher /> */}
        </div>
      </aside>
    </>
  );
}