
import React, { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Upload, 
  BookOpen, 
  FileEdit, 
  Users, 
  BarChart, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon, 
  label, 
  isCollapsed, 
  isActive 
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 ease-in-out",
        isActive 
          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <span className="text-lg">{icon}</span>
      <span className={cn("transition-all duration-300", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
        {label}
      </span>
    </Link>
  );
};

const getRoleSpecificLinks = (role: UserRole, pathname: string) => {
  const baseLinks = [
    {
      to: "/",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      isActive: pathname === "/",
      forRoles: ["writer", "editor", "admin"] as UserRole[]
    }
  ];

  const writerLinks = [
    {
      to: "/upload",
      icon: <Upload size={20} />,
      label: "Upload Script",
      isActive: pathname === "/upload",
      forRoles: ["writer"] as UserRole[]
    },
    {
      to: "/my-scripts",
      icon: <BookOpen size={20} />,
      label: "My Scripts",
      isActive: pathname === "/my-scripts",
      forRoles: ["writer"] as UserRole[]
    },
    {
      to: "/messages",
      icon: <MessageSquare size={20} />,
      label: "Messages",
      isActive: pathname === "/messages",
      forRoles: ["writer", "editor"] as UserRole[]
    },
  ];

  const editorLinks = [
    {
      to: "/assignments",
      icon: <FileEdit size={20} />,
      label: "Assignments",
      isActive: pathname === "/assignments",
      forRoles: ["editor"] as UserRole[]
    }
  ];

  const adminLinks = [
    {
      to: "/manuscripts",
      icon: <BookOpen size={20} />,
      label: "Manuscripts",
      isActive: pathname === "/manuscripts",
      forRoles: ["admin"] as UserRole[]
    },
    {
      to: "/editors",
      icon: <Users size={20} />,
      label: "Editors",
      isActive: pathname === "/editors",
      forRoles: ["admin"] as UserRole[]
    },
    {
      to: "/reports",
      icon: <BarChart size={20} />,
      label: "Reports",
      isActive: pathname === "/reports",
      forRoles: ["admin"] as UserRole[]
    },
  ];

  const settingsLink = [
    {
      to: "/settings",
      icon: <Settings size={20} />,
      label: "Settings",
      isActive: pathname === "/settings",
      forRoles: ["writer", "editor", "admin"] as UserRole[]
    }
  ];

  const allLinks = [...baseLinks, ...writerLinks, ...editorLinks, ...adminLinks, ...settingsLink];
  return allLinks.filter((link) => link.forRoles.includes(role));
};

const MainSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  if (!user) return null;

  const links = getRoleSpecificLinks(user.role, location.pathname);
  
  const roleColor = {
    writer: "bg-writer-primary",
    editor: "bg-editor-primary",
    admin: "bg-admin-primary"
  }[user.role];

  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-sidebar sticky top-0 border-r transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center w-full")}>
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", roleColor)}>
            {user.role === "writer" && "W"}
            {user.role === "editor" && "E"}
            {user.role === "admin" && "A"}
          </div>
          {!isCollapsed && (
            <span className="font-semibold font-nunito">Script Master</span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("p-1 h-auto", isCollapsed && "hidden")}
        >
          <ChevronLeft size={16} />
        </Button>
      </div>

      {isCollapsed && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mx-auto my-2 p-1 h-auto"
        >
          <ChevronRight size={16} />
        </Button>
      )}

      <div className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map((link) => (
          <SidebarLink
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isCollapsed={isCollapsed}
            isActive={link.isActive}
          />
        ))}
      </div>

      <div className="mt-auto border-t p-3">
        <div className={cn(
          "flex items-center gap-3 mb-3", 
          isCollapsed ? "flex-col" : "flex-row"
        )}>
          <div className="relative">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {user.name.charAt(0)}
              </div>
            )}
            <span 
              className={cn(
                "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-sidebar", 
                "bg-success"
              )} 
            />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => logout()}
          className={cn(
            "w-full text-muted-foreground gap-2 hover:bg-destructive/10 hover:text-destructive",
            isCollapsed && "p-2 h-9"
          )}
        >
          <LogOut size={16} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default MainSidebar;
