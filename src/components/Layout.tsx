
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { TooltipProvider } from "@/components/ui/tooltip";

const Layout = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <MobileNav />
          <main className="flex-1 p-4 md:p-8 overflow-auto bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
