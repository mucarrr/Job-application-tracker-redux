import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    jobs:[],
    isLoading:true,
    error: null,
}
const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state.isLoading = false, state.error = action.payload;
        },
        setJobs: (state, action) => {
            state.isLoading = false, state.error = null, state.jobs = action.payload;
        },
        createJob:(state, action) => {
            state.jobs.push(action.payload);
        },
        deleteJob:(state, action) => {
            state.jobs = state.jobs.filter(job => job.id!== action.payload);
        },
        updateJob:(state, action) => {
            const index = state.jobs.findIndex((i)=> i.id === action.payload.id);
            state.jobs.splice(index, 1, action.payload);
    },}
})

export const { setLoading, setError, setJobs,createJob, deleteJob, updateJob } = jobSlice.actions;
export default jobSlice.reducer;