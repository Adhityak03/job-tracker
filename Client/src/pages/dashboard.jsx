// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJobs } from "../features/jobs/";

// const Dashboard = () => {
//   const dispatch = useDispatch();

//   const { jobs, loading, error } = useSelector(
//     (state) => state.jobs
//   );

//   useEffect(() => {
//     dispatch(fetchJobs());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-3xl font-bold mb-6">
//         Job Dashboard
//       </h1>

//       {loading && (
//         <h2 className="text-blue-500">Loading Jobs...</h2>
//       )}

//       {error && (
//         <h2 className="text-red-500">{error}</h2>
//       )}

//       {!loading && jobs.length === 0 && (
//         <h2>No Jobs Found</h2>
//       )}

//       <div className="grid gap-4">
//         {jobs.map((job) => (
//           <div
//             key={job._id}
//             className="border rounded-lg p-4 shadow"
//           >
//             <h2 className="text-xl font-bold">
//               {job.title}
//             </h2>

//             <p>
//               <strong>Company:</strong> {job.company}
//             </p>

//             <p>
//               <strong>Status:</strong> {job.status}
//             </p>

//             <p>
//               <strong>Applied Date:</strong>{" "}
//               {new Date(job.appliedDate).toLocaleDateString()}
//             </p>

//             <p>
//               <strong>Notes:</strong> {job.notes}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobs/jobslice";
import JobAdd from "../components/jobAdd";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Job Dashboard</h1>

      <JobAdd />

      {loading && <h2 className="text-blue-500">Loading Jobs...</h2>}

      {error && <h2 className="text-red-500">{error}</h2>}

      {!loading && jobs.length === 0 && <h2>No Jobs Found</h2>}

      <div className="grid gap-4 mt-6">
        {jobs.map((job) => (
          <div key={job._id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-bold">{job.title}</h2>

            <p>
              <strong>Company:</strong> {job.company}
            </p>

            <p>
              <strong>Position:</strong> {job.position}
            </p>

            <p>
              <strong>Status:</strong> {job.status}
            </p>

            <p>
              <strong>Applied Date:</strong>{" "}
              {job.appliedDate
                ? new Date(job.appliedDate).toLocaleDateString()
                : "-"}
            </p>

            <p>
              <strong>Notes:</strong> {job.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;