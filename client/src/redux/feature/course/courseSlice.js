import { createSlice } from "@reduxjs/toolkit";
import {  courseGetAction, courseUpdateAction } from "./courseAction";


const getInitialState = () => {
    return {
        isLoading: false,
        isSuccess: false,
        isError: false,
        successMsg: null,
        errorMsg: null,
        errorResponse: null,
    };
}

const initialState = {
    courseCreateAct: getInitialState(),
    courseGetAct: getInitialState(),
    courseUpdateAct: getInitialState(),
    courseData: {}
};


const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        resetCourse: (state) => {
            state.courseCreateAct = getInitialState()
            state.courseGetAct = getInitialState()
            state.courseUpdateAct = getInitialState()
        },
        resetCourseValue: (state) => {
            state.courseCreateAct = getInitialState()
            state.courseGetAct = getInitialState()
            state.courseUpdateAct = getInitialState()
            state.courseData = getInitialState()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(courseGetAction.pending, (state) => {
            state.courseGetAct = getInitialState()
            state.courseGetAct.isLoading = true
        })
        builder.addCase(courseGetAction.rejected, (state, action) => {
            state.courseGetAct = getInitialState()
            state.courseGetAct.isError = true
            state.courseGetAct.errorResponse = action.payload
        })
        builder.addCase(courseGetAction.fulfilled, (state, action) => {
            state.courseGetAct = getInitialState()
            state.courseGetAct.isSuccess = true
            state.courseData = action.payload?.data || {}
        })

        builder.addCase(courseUpdateAction.pending, (state) => {
            state.courseUpdateAct = getInitialState()
            state.courseUpdateAct.isLoading = true
        })
        builder.addCase(courseUpdateAction.rejected, (state, action) => {
            state.courseUpdateAct = getInitialState()
            state.courseUpdateAct.isError = true
            state.courseUpdateAct.errorResponse = action.payload
        })
        builder.addCase(courseUpdateAction.fulfilled, (state, action) => {
            state.courseUpdateAct = getInitialState()
            state.courseUpdateAct.isSuccess = true
            state.courseData = action.payload?.data || {}
        })
    }
})

export const { resetCourse, resetCourseValue } = courseSlice.actions

export default courseSlice.reducer