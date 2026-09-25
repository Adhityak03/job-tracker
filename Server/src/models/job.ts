import mongoose from "mongoose";
interface Job {
  title: string;
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  appliedDate: Date;
  notes?: string;
  userId: mongoose.Types.ObjectId;
}
const jobSchema = new mongoose.Schema<Job>(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model<Job>("Job", jobSchema);
export default Job;