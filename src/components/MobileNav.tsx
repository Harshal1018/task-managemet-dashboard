
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  LayoutDashboard, 
  ListTodo, 
  Settings, 
  Menu,
  X,
  PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
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

  return (
    <div className="md:hidden border-b border-border py-2 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden">
          <img 
            src="https://cdn.dribbble.com/users/857299/screenshots/5279698/tm-01_4x.jpg" 
            alt="Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-semibold text-lg">Task Management</h1>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://cdn.dribbble.com/users/857299/screenshots/5279698/tm-01_4x.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="font-semibold text-lg">Task Management</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent transition-colors",
                    location.pathname === item.href && "bg-accent text-foreground font-medium"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}

              <div className="mt-6">
                <Button className="w-full flex gap-2 bg-primary hover:bg-primary/90">
                  <PlusCircle className="h-4 w-4" />
                  New Task
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
