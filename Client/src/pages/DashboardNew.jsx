import React, { useEffect, useMemo, useState, useRef } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import StatusPill from "../components/StatusPill";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobs/jobslice";

const colors = { Applied: "#3B82F6", Interview: "#F59E0B", Offer: "#10B981", Rejected: "#EF4444", Saved: "#8B5CF6" };

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DashboardNew = () => {
  const dispatch = useDispatch();
  const jobsState = useSelector((state) => state.jobs);
  const jobs = jobsState.jobs || [];

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // track current time to trigger recompute on month rollover
  const [now, setNow] = useState(new Date());
  const rolloverTimerRef = useRef();
  useEffect(() => {
    // compute millis until start of next month (+1s buffer)
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const delay = nextMonth.getTime() - Date.now() + 1000;
    rolloverTimerRef.current = setTimeout(() => setNow(new Date()), Math.max(0, delay));
    return () => clearTimeout(rolloverTimerRef.current);
  }, [now]);

  const statsComputed = useMemo(() => {
    const total = jobs.length;
    const interviews = jobs.filter((j) => j.status === "Interview").length;
    const offers = jobs.filter((j) => j.status === "Offer").length;
    const rejected = jobs.filter((j) => j.status === "Rejected").length;
    return [
      { id: 1, value: total, label: "Total Applications", delta: "+12 this month", color: "purple" },
      { id: 2, value: interviews, label: "Interviews", delta: "+3 this week", color: "amber" },
      { id: 3, value: offers, label: "Offers Received", delta: "Same as last month", color: "emerald" },
      { id: 4, value: rejected, label: "Rejected", delta: "-5 vs last month", color: "red" },
    ];
  }, [jobs]);
  const [rangeMonths, setRangeMonths] = useState(6);

  const chartDataComputed = useMemo(() => {
    // last 6 months from now
    // use `now` state so recompute happens when month rolls over
    const current = now || new Date();
    const months = [];
    for (let i = rangeMonths - 1; i >= 0; i--) {
      const d = new Date(current.getFullYear(), current.getMonth() - i, 1);
      months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, month: monthNames[d.getMonth()], applied: 0, interview: 0, offer: 0 });
    }

    jobs.forEach((j) => {
      if (!j.appliedDate) return;
      const d = new Date(j.appliedDate);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const m = months.find((x) => x.key === key);
      if (m) {
        if (j.status === "Applied") m.applied += 1;
        if (j.status === "Interview") m.interview += 1;
        if (j.status === "Offer") m.offer += 1;
      }
    });
    return months;
  }, [jobs, now, rangeMonths]);

  const statusBreakdown = useMemo(() => {
    const map = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0, Saved: 0 };
    jobs.forEach((j) => {
      if (map[j.status] !== undefined) map[j.status] += 1;
    });
    return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
  }, [jobs]);

  const recentApplications = useMemo(() => {
    return [...jobs].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)).slice(0, 5);
  }, [jobs]);

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsComputed.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">Application Activity</h3>
              <p className="text-sm text-gray-500">Last {rangeMonths === 12 ? '1 year' : `${rangeMonths} months`} — applied, interviews & offers</p>
            </div>
            <select className="border rounded px-3 py-1" value={rangeMonths} onChange={(e) => setRangeMonths(Number(e.target.value))}>
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={12}>1 year</option>
            </select>
          </div>

          <div className="mt-4">
            <AreaChart width={700} height={240} data={chartDataComputed}>
              <defs>
                <linearGradient id="colorApplied" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInterview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOffer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="applied" stroke="#3B82F6" fill="url(#colorApplied)" />
              <Area type="monotone" dataKey="interview" stroke="#F59E0B" fill="url(#colorInterview)" />
              <Area type="monotone" dataKey="offer" stroke="#10B981" fill="url(#colorOffer)" />
            </AreaChart>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="inline-flex items-center gap-2"><span className="w-6 h-1 bg-indigo-600 inline-block" />Applied</div>
            <div className="inline-flex items-center gap-2"><span className="w-6 h-1 bg-amber-500 inline-block" />Interview</div>
            <div className="inline-flex items-center gap-2"><span className="w-6 h-1 bg-emerald-500 inline-block" />Offer</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold">Status Breakdown</h3>
          <p className="text-sm text-gray-500">All-time distribution</p>
          <div className="flex justify-center mt-4">
            <PieChart width={240} height={200}>
              <Pie data={statusBreakdown} dataKey="value" innerRadius={60} outerRadius={80}>
                {statusBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.name] || "#8884d8"} />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="mt-4 space-y-2">
            {statusBreakdown.map((s) => (
              <div key={s.name} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span style={{ background: colors[s.name] }} className="w-3 h-3 rounded-full inline-block" />
                  <span className="text-sm">{s.name}</span>
                </div>
                <div className="font-bold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent applications */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent Applications</h3>
            <Link className="text-indigo-600" to="/applications">View all →</Link>
          </div>

          <div className="mt-4 space-y-4">
            {recentApplications.length === 0 && <p className="text-sm text-gray-500">No recent applications</p>}
            {recentApplications.map((r) => (
              <div key={r._id || r.id} className="flex items-center justify-between border-b py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-md flex items-center justify-center font-bold">{(r.company || "")[0]}</div>
                  <div>
                    <div className="font-semibold">{r.title || r.role}</div>
                    <div className="text-sm text-gray-500">{r.company}</div>
                  </div>
                </div>
                <div>
                  <StatusPill status={r.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-bold">Track a New Job</h4>
                <p className="text-sm mt-2 opacity-90">Add a new application and stay on top of your search.</p>
              </div>
              <div>
                <Link to="/applications/new" className="bg-white text-indigo-700 px-4 py-2 rounded-full font-semibold">Add Application</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardNew;
