import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, Grid, Plus, BarChart2, User, Settings } from "lucide-react";

const IconButton = ({ to, active, children }) => (
  <Link to={to} className={`w-12 h-12 flex items-center justify-center rounded-lg ${active ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"}`}>
    {children}
  </Link>
);

const Sidebar = ({ mobileOpen, onClose }) => {
  const loc = useLocation();

  return (
    <>
      <aside className="hidden md:flex w-16 bg-slate-900 text-white flex-col items-center py-6 gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Briefcase />
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          <IconButton to="/dashboard" active={loc.pathname === "/dashboard"}>
            <Grid />
          </IconButton>

          <IconButton to="/applications" active={loc.pathname.startsWith("/applications") && loc.pathname !== "/applications/new"}>
            <Briefcase />
          </IconButton>

          <IconButton to="/applications/new" active={loc.pathname === "/applications/new"}>
            <Plus />
          </IconButton>

          <IconButton to="#" active={false}>
            <BarChart2 />
          </IconButton>

          <IconButton to="#" active={false}>
            <User />
          </IconButton>

          <div className="mt-auto mb-2">
            <IconButton to="#" active={false}>
              <Settings />
            </IconButton>
          </div>
        </nav>
      </aside>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 text-white p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center"><Briefcase /></div>
              <button onClick={onClose} className="text-white">Close</button>
            </div>
            <nav className="flex flex-col gap-3">
              <Link to="/dashboard" onClick={onClose} className="px-3 py-2 rounded hover:bg-slate-800">Dashboard</Link>
              <Link to="/applications" onClick={onClose} className="px-3 py-2 rounded hover:bg-slate-800">Applications</Link>
              <Link to="/applications/new" onClick={onClose} className="px-3 py-2 rounded hover:bg-slate-800">Add Job</Link>
              <Link to="#" className="px-3 py-2 rounded hover:bg-slate-800">Analytics</Link>
              <Link to="#" className="px-3 py-2 rounded hover:bg-slate-800">Profile</Link>
              <Link to="#" className="px-3 py-2 rounded hover:bg-slate-800">Settings</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
