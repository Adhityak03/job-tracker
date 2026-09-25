import Job from "../models/job";

const createJob = async (
    title: string,
    company: string,
    position: string,
    status: "Applied" | "Interview" | "Offer" | "Rejected",
    appliedDate: string,
    notes: string | undefined,
    userId: string
) => {

    if (!company && !title) {
    throw new Error("Title and company name is required");
}

const validStatus = ["Applied", "Interview", "Offer", "Rejected"];

if (status && !validStatus.includes(status)) {
    throw new Error("Invalid job status");
}

const job = await Job.create({
    title,
    company,
    position,
    status,
    appliedDate,
    notes,
    userId
});

return job;

};


export { createJob };