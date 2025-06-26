import AppNavbar from "@/components/ui/app-navbar";
import { useAuth } from "@/contexts/auth-context";
import "./../globals.css";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header */}
      <AppNavbar />
      {/* Main content */}
      { children }
    </main>
  );
}
