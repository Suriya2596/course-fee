import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosIntance } from "../../../components/helpers/axiosIntance";
import Cookies from "js-cookie";
export const userAuthSingUpAction = createAsyncThunk("userCreate/userAuthSingUpAction", async (req, thunkAPI) => {
    try {
        const response = await axiosIntance.post("user", req?.formData);
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            return data;
        }

    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})

export const userAuthLoginAction = createAsyncThunk("userAuth/userAuthLoginAction", async (req, thunkAPI) => {
    try {
        const response = await axiosIntance.post("login", req?.formData);
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            if (data && data?.token) {
                Cookies.set("token", JSON.stringify(data?.token))
            }
            return data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})

export const userAuthGetAction = createAsyncThunk("userAuth/userAuthGetAction", async (req, thunkAPI) => {
    try {

        const response = await axiosIntance.get("user", {
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

export const userAutUpdateAction = createAsyncThunk("userAuth/userAutUpdateAction", async (req, thunkAPI) => {
    try {

        const response = await axiosIntance.put("user", req?.formData, {
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