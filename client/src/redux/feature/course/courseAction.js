import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosIntance } from "../../../components/helpers/axiosIntance";
import Cookies from "js-cookie";

export const courseGetAction = createAsyncThunk("course/courseGetAction", async (req, thunkAPI) => {
    try {

        const response = await axiosIntance.get(`course`, {
            headers: {
                Authorization: Cookies.get("token") && JSON.parse(Cookies.get("token"))
            }
        });
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            return data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})

export const courseUpdateAction = createAsyncThunk("course/courseUpdateAction", async (req, thunkAPI) => {
    try {

        const response = await axiosIntance.put(`course/${req?.id}`, req?.formData, {
            headers: {
                Authorization: Cookies.get("token") && JSON.parse(Cookies.get("token"))
            }
        });
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            return data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})