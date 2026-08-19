import React, { useState, useEffect } from "react";
import JobForm from "./JobForm";
import Button from "../ui/Button";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
  padding: 16,
};

const modalStyle = {
  width: "100%",
  maxWidth: 760,
  background: "white",
  borderRadius: 8,
  padding: 16,
  boxShadow: "0 10px 30px rgba(2,6,23,0.2)",
};

const AddButtonStyle = {
  padding: "8px 14px",
  borderRadius: 8,
  background: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const JobAdd = ({ buttonLabel = "Add Job" }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>

      {open && (
        <div style={overlayStyle} onMouseDown={() => setOpen(false)}>
          <div style={modalStyle} onMouseDown={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>Add Job</h3>
              <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <JobForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAdd;
