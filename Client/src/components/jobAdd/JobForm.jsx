import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../../features/jobs/jobslice";
import Input from "../ui/Input";
import Button from "../ui/Button";

const JobForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.jobs);

  const [form, setForm] = useState({
    title: "",
    company: "",
    position: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const validate = () => {
    if (!form.title.trim() || !form.company.trim() || !form.position.trim()) {
      setErrorMessage("Title, Company and Position are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(addJob(form)).unwrap();
      setSuccessMessage("Job added successfully.");
      setForm({ title: "", company: "", position: "", status: "Applied", appliedDate: "", notes: "" });
      setTimeout(() => {
        setSuccessMessage("");
        if (onClose) onClose();
      }, 800);
    } catch (err) {
      setErrorMessage(err || "Failed to add job.");
    }
  };

  return (
    <div style={{ maxWidth: 720 }}>
      {successMessage && (
        <div style={{ color: "#065f46", background: "#ecfdf5", padding: 8, borderRadius: 6, marginBottom: 12 }}>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ color: "#b91c1c", background: "#fef2f2", padding: 8, borderRadius: 6, marginBottom: 12 }}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Job title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Frontend Engineer" required />
          <Input label="Company" name="company" value={form.company} onChange={handleChange} placeholder="e.g. Acme Inc" required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Position" name="position" value={form.position} onChange={handleChange} placeholder="e.g. Senior React Developer" required />
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="border rounded-md px-3 py-2 w-full">
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Applied Date" name="appliedDate" value={form.appliedDate} onChange={handleChange} type="date" />
          <div>
            <label className="text-sm font-medium mb-1 block">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="border rounded-md px-3 py-2 w-full min-h-20" placeholder="Optional notes about the application" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="danger" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Job'}</Button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
