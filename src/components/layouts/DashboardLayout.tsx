import React, { ReactNode } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { FilePlus, FileText, LogOut, Settings, User, Coins } from "lucide-react";

interface SidebarNavProps {
  items: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ items }) => {
  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )
          }
        >
          {item.icon}
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
};

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const sidebarNavItems = [
    {
      title: "Meus Currículos",
      href: "/dashboard",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Criar Novo Currículo",
      href: "/dashboard/create",
      icon: <FilePlus className="h-5 w-5" />,
    },
    {
      title: "Créditos",
      href: "/dashboard/credits",
      icon: <Coins className="h-5 w-5" />,
    },
    {
      title: "Perfil",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Configurações",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r bg-background/95 backdrop-blur md:block">
          <div className="flex h-16 items-center border-b px-6">
            <NavLink to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">GlowUp Resume</span>
            </NavLink>
          </div>
          <div className="flex-1 overflow-auto py-6 px-4">
            <SidebarNav items={sidebarNavItems} />
          </div>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.fullName || "Usuário"}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 md:pl-64">
          <div className="container py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
