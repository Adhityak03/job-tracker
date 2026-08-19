import React from "react";

const map = {
  Applied: { bg: "bg-blue-50", text: "text-blue-600" },
  Interview: { bg: "bg-amber-50", text: "text-amber-600" },
  Offer: { bg: "bg-emerald-50", text: "text-emerald-600" },
  Rejected: { bg: "bg-red-50", text: "text-red-600" },
  Saved: { bg: "bg-purple-50", text: "text-purple-600" },
};

const StatusPill = ({ status }) => {
  const cls = map[status] || map.Applied;
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${cls.bg} ${cls.text}`}>
      <span className={`w-2 h-2 rounded-full ${cls.text}`} />
      <span className="font-medium">{status}</span>
    </span>
  );
};

export default StatusPill;
