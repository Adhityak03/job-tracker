import React, { useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addJob, updateJob, fetchJobs } from "../features/jobs/jobslice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.jobs);

  const { id } = useParams();

  const [form, setForm] = useState({
    company: "",
    title: "",
    position: "",
    status: "Applied",
    location: "",
    salary: "",
    appliedDate: "",
    website: "",
    notes: "",
  });

  const jobs = useSelector((s) => s.jobs.jobs || []);
  const editing = Boolean(id);

  useEffect(() => {
    if (editing && jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [editing, jobs.length, dispatch]);

  useEffect(() => {
    if (editing && jobs.length > 0) {
      const job = jobs.find((j) => (j._id || j.id) === id);
      if (job) {
        setForm({
          company: job.company || "",
          title: job.title || "",
          position: job.position || "",
          status: job.status || "Applied",
          location: job.location || "",
          salary: job.salary || "",
          appliedDate: job.appliedDate ? job.appliedDate.split("T")[0] : "",
          website: job.website || "",
          notes: job.notes || "",
        });
      }
    }
  }, [editing, jobs, id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.company.trim() || !form.title.trim() || !form.position.trim()) return alert("Company, role and position are required");
    try {
      const payload = {
        title: form.title,
        company: form.company,
        position: form.position,
        status: form.status,
        appliedDate: form.appliedDate || undefined,
        notes: form.notes,
      };

      if (editing) {
        await dispatch(updateJob({ id, jobData: payload })).unwrap();
      } else {
        await dispatch(addJob(payload)).unwrap();
      }

      navigate("/applications");
    } catch (err) {
      console.error(err);
      alert(err || "Failed to save");
    }
  };

  return (
    <Layout title="Add New Job">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-700">← Back</button>
        <h1 className="text-2xl font-bold mt-2">{editing ? 'Edit Job Application' : 'Add Job Application'}</h1>
        <p className="text-sm text-gray-500">Track a new job opportunity in your pipeline</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-xs uppercase text-gray-400 font-semibold mb-4">Job Details</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">Company *</label>
                <input name="company" value={form.company} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" placeholder="e.g. Stripe" />
              </div>
              <div>
                <label className="text-sm font-semibold">Role / Position *</label>
                <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" placeholder="e.g. Senior Engineer" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-semibold">Status *</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1">
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold">Position *</label>
                <input name="position" value={form.position} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" placeholder="e.g. Senior Frontend" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-semibold">Salary Range</label>
                <input name="salary" value={form.salary} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" placeholder="$150k – $200k" />
              </div>
              <div>
                <label className="text-sm font-semibold">Applied Date</label>
                <input name="appliedDate" value={form.appliedDate} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" type="date" />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold">Company Website</label>
              <input name="website" value={form.website} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" placeholder="company.com" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-xs uppercase text-gray-400 font-semibold mb-4">Notes & Tags</div>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1 min-h-[120px]" placeholder="Application notes, contacts, prep tips..." />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-sm font-semibold mb-2">Resume</div>
            <div className="border-dashed border-2 border-gray-200 rounded p-6 text-center">
              <div className="text-gray-500">Click to upload</div>
              <div className="text-xs text-gray-400 mt-2">PDF, DOC up to 10 MB</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-sm font-semibold mb-2">Follow-up Reminder</div>
            <input name="reminder" className="w-full border rounded px-3 py-2 mt-1" placeholder="dd-mm-yyyy" />
          </div>

          <div>
            <button onClick={handleSave} disabled={loading} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg mb-2">{loading ? 'Saving...' : 'Save Application'}</button>
            <button onClick={() => navigate('/applications')} className="w-full bg-white border text-gray-600 px-4 py-2 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddJob;
