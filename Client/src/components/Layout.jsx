import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Layout = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <TopBar title={title} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
