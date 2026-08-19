import React from "react";

const colorMap = {
  purple: "bg-purple-50 text-purple-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  red: "bg-red-50 text-red-600",
};

const StatCard = ({ icon, value, label, delta, color = "purple" }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center ${colorMap[color] || colorMap.purple}`}>
          {/* placeholder icon */}
          <span className="text-white opacity-80">★</span>
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
