import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosIntance } from "../../../components/helpers/axiosIntance";


export const feesGetExamAction = createAsyncThunk("fees/feesGetExamAction", async (req, thunkAPI) => {
    try {
        const response = await axiosIntance.get("fee/exam");
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            return data;
        }

    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})


export const feesGetApplicationAction = createAsyncThunk("fees/feesGetApplicationAction", async (req, thunkAPI) => {
    try {
        const response = await axiosIntance.get("fee/application");
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            return data;
        }

    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})