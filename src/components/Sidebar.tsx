
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  LayoutDashboard, 
  ListTodo, 
  Settings, 
  PlusCircle,
  User,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: <ListTodo className="h-5 w-5" />,
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex flex-col h-screen bg-card border-r border-border w-64 p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden">
          <img 
            src="https://cdn.dribbble.com/userupload/14829815/file/original-d05645c81738964b4691696ac5390967.jpg?format=webp&resize=400x300&vertical=center" 
            alt="Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-semibold text-lg">Task Management</h1>
      </div>

      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent transition-colors",
              location.pathname === item.href && "bg-accent text-foreground font-medium"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 px-3">
        <Button className="w-full flex gap-2 bg-primary hover:bg-primary/90" 
                onClick={() => navigate("/tasks")}>
          <PlusCircle className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="mt-auto">
        <div className="px-2">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700">
              <User className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name || "Guest User"}</span>
              <span className="text-xs text-muted-foreground">{user?.email || "guest@example.com"}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 mt-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
