import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

// ================= FETCH JOBS =================

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

// ================= ADD JOB =================

export const addJob = createAsyncThunk(
  "jobs/addJob",
  async (jobData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(API_URL, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add job"
      );
    }
  }
);

// ================= UPDATE JOB =================

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/${id}`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update job"
      );
    }
  }
);

// ================= DELETE JOB =================

export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete job"
      );
    }
  }
);

// ================= SLICE =================

const jobsSlice = createSlice({
  name: "jobs",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= FETCH =================

      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })

      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= ADD =================

      .addCase(addJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })

      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= UPDATE =================

      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;

        state.jobs = state.jobs.map((job) =>
          job._id === action.payload._id
            ? action.payload
            : job
        );
      })

      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DELETE =================

      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;

        state.jobs = state.jobs.filter(
          (job) => job._id !== action.payload
        );
      })

      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;