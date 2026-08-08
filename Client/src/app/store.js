import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authslice"
import jobReducer from "../features/jobs/jobslice"

export const store=configureStore({
    reducer:
    {
        auth:authReducer,
        jobs:jobReducer
    }
})