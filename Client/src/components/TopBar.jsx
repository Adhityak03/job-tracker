import React from "react";
import { Search, Bell } from "lucide-react";

const TopBar = ({ title, onToggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-transparent">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2 rounded-md bg-white border" onClick={onToggleSidebar}>☰</button>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <span className="absolute left-3 top-2 text-gray-400"><Search size={16} /></span>
          <input placeholder="Search jobs..." className="pl-9 pr-4 py-2 rounded-full border bg-white w-72" />
        </div>

        <div className="relative">
          <button className="p-2 rounded-full bg-white border">
            <Bell />
          </button>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">AJ</div>
      </div>
    </header>
  );
};

export default TopBar;
