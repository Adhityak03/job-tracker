import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import StatusPill from "../components/StatusPill";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Pagination from "../components/ui/Pagination";
import { Plus, Eye, Edit3, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchJobs, deleteJob, updateJob } from "../features/jobs/jobslice";

const Applications = () => {
  const dispatch = useDispatch();
  const jobsState = useSelector((state) => state.jobs);
  const jobs = jobsState.jobs || [];

  const [rawSearch, setRawSearch] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const debounceRef = useRef();
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(rawSearch.trim()), 300);
    setPage(1);
    return () => clearTimeout(debounceRef.current);
  }, [rawSearch, statusFilter]);

  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlight = (text = "", q = "") => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark key={i} className="bg-yellow-100 px-0.5">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;
    try {
      await dispatch(deleteJob(id)).unwrap();
      // refetch or rely on slice removing locally
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateJob({ id, jobData: { status } })).unwrap();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  // derived filtered lists and pagination
  const q = search.toLowerCase();
  const filteredAll = jobs.filter((app) => {
    const matchesSearch = !q || ((app.company || "").toLowerCase().includes(q) || (app.title || app.role || "").toLowerCase().includes(q));
    const matchesStatus = statusFilter === 'All' || (app.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredAll.length / pageSize));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * pageSize;
  const pageItems = filteredAll.slice(start, start + pageSize);

  return (
    <Layout title="Job Applications">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-80">
            <Input placeholder="Search company or role..." value={rawSearch} onChange={(e) => setRawSearch(e.target.value)} />
          </div>
          <div>
            <Select options={['All','Applied','Interview','Offer','Rejected','Saved']} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
          </div>
        </div>

        <div>
            <Link to="/applications/new" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg">
              <Plus /> Add Job
            </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="md:hidden p-4 space-y-3">
          {pageItems.length === 0 ? (
            <div className="text-center text-gray-500">No jobs found</div>
          ) : (
            pageItems.map((app) => (
              <div key={app._id || app.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{app.company}</div>
                    <div className="text-sm text-gray-600">{app.title}</div>
                    <div className="text-sm text-gray-500 mt-2">{app.location || '-'}</div>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => handleStatusChange(app._id || app.id, 'Applied')} className="px-2 py-1 text-xs rounded bg-green-50 text-green-700">Applied</button>
                      <button onClick={() => handleStatusChange(app._id || app.id, 'Interview')} className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-700">Interview</button>
                      <button onClick={() => handleStatusChange(app._id || app.id, 'Rejected')} className="px-2 py-1 text-xs rounded bg-red-50 text-red-700">Rejected</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2"><StatusPill status={app.status} /></div>
                    <div className="flex gap-2">
                      <Link to={`/applications/${app._id || app.id}`} className="p-2 text-gray-500 hover:text-indigo-600"><Eye size={16} /></Link>
                      <Link to={`/applications/${app._id || app.id}/edit`} className="p-2 text-gray-500 hover:text-indigo-600"><Edit3 size={16} /></Link>
                      <button onClick={() => handleDelete(app._id || app.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="hidden md:block">
          <table className="w-full">
          <thead className="text-xs text-gray-400 uppercase font-semibold">
            <tr className="border-b">
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Salary</th>
              <th className="p-4 text-left">Applied</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">No jobs found</td>
              </tr>
            ) : (
              pageItems.map((app) => (
                <tr key={app._id || app.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-md flex items-center justify-center font-bold">{(app.company || "")[0]}</div>
                    <div>
                      <div className="font-semibold">{highlight(app.company || "", search)}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">{highlight(app.title || app.role || "", search)}</td>
                <td className="p-4"><StatusPill status={app.status} /></td>
                <td className="p-4 text-gray-600">{app.location || "-"}</td>
                <td className="p-4">{app.salary || "-"}</td>
                <td className="p-4">{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "-"}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleStatusChange(app._id || app.id, 'Applied')} className="px-2 py-1 text-xs rounded bg-green-50 text-green-700">Applied</button>
                      <button onClick={() => handleStatusChange(app._id || app.id, 'Interview')} className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-700">Interview</button>
                      <button onClick={() => handleStatusChange(app._id || app.id, 'Rejected')} className="px-2 py-1 text-xs rounded bg-red-50 text-red-700">Rejected</button>
                    </div>
                    <Link to={`/applications/${app._id || app.id}`} className="p-2 text-gray-500 hover:text-indigo-600"><Eye size={16} /></Link>
                    <Link to={`/applications/${app._id || app.id}/edit`} className="p-2 text-gray-500 hover:text-indigo-600"><Edit3 size={16} /></Link>
                            <button onClick={() => handleDelete(app._id || app.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-gray-500">{(() => `${filteredAll.length} results`)()}</div>
          <Pagination page={page} total={filteredAll.length} pageSize={pageSize} onPageChange={(p) => setPage(p)} />
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Applications;
