import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import StatusPill from "../components/StatusPill";
import { updateJob } from "../features/jobs/jobslice";

const ViewApplication = () => {
  const { id } = useParams();
  const jobs = useSelector((s) => s.jobs.jobs || []);
  const job = jobs.find((j) => (j._id || j.id) === id);
  const dispatch = useDispatch();

  const handleStatus = async (status) => {
    try {
      await dispatch(updateJob({ id, jobData: { status } })).unwrap();
      // no navigation; state updated via slice
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  if (!job) {
    return (
      <Layout title="Application not found">
        <div>Application not found.</div>
      </Layout>
    );
  }

  return (
    <Layout title="Application">
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="text-sm text-gray-600">{job.company}</div>
          </div>
          <div>
            <StatusPill status={job.status} />
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleStatus('Applied')} className="px-2 py-1 text-xs rounded bg-green-50 text-green-700">Applied</button>
              <button onClick={() => handleStatus('Interview')} className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-700">Interview</button>
              <button onClick={() => handleStatus('Rejected')} className="px-2 py-1 text-xs rounded bg-red-50 text-red-700">Rejected</button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-700">Applied: {job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : '-'}</p>
          <p className="text-sm text-gray-700">Notes: {job.notes || '-'}</p>
        </div>

        <div className="mt-6 flex gap-2">
          <Link to={`/applications/${id}/edit`} className="px-4 py-2 bg-indigo-600 text-white rounded">Edit</Link>
          <Link to="/applications" className="px-4 py-2 border rounded">Back</Link>
        </div>
      </div>
    </Layout>
  );
};

export default ViewApplication;
