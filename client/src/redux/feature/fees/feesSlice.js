import { createSlice } from "@reduxjs/toolkit";
import { feesGetApplicationAction, feesGetExamAction } from "./feesAction";


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
    feesGetExamAct: getInitialState(),
    feesGetApplicationAct: getInitialState(),
    examFees: {},
    applicationFess: {}
};

const feesSlice = createSlice({
    name: "fees",
    initialState,
    reducers: {
        resetFees: (state) => {
            state.feesGetExamAct = getInitialState()
            state.feesGetApplicationAct = getInitialState()
        },
        resetFeesValue: (state) => {
            state.feesGetExamAct = getInitialState()
            state.feesGetApplicationAct = getInitialState()
            state.examFees = {}
            state.applicationFess = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(feesGetExamAction.pending, (state) => {
            state.feesGetExamAct = getInitialState()
            state.feesGetExamAct.isLoading = true
        })
        builder.addCase(feesGetExamAction.rejected, (state, action) => {
            state.feesGetExamAct = getInitialState()
            state.feesGetExamAct.isError = true
            state.feesGetExamAct.errorResponse = action.payload
        })
        builder.addCase(feesGetExamAction.fulfilled, (state, action) => {
            state.feesGetExamAct = getInitialState()
            state.feesGetExamAct.isSuccess = true
            state.examFees = action.payload?.data || {}
        })

        builder.addCase(feesGetApplicationAction.pending, (state) => {
            state.feesGetApplicationAct = getInitialState()
            state.feesGetApplicationAct.isLoading = true
        })
        builder.addCase(feesGetApplicationAction.rejected, (state, action) => {
            state.feesGetApplicationAct = getInitialState()
            state.feesGetApplicationAct.isError = true
            state.feesGetApplicationAct.errorResponse = action.payload
        })
        builder.addCase(feesGetApplicationAction.fulfilled, (state, action) => {
            state.feesGetApplicationAct = getInitialState()
            state.feesGetApplicationAct.isSuccess = true
            state.applicationFess = action.payload?.data || {}
        })
    }
})
export const { resetFees, resetFeesValue } = feesSlice.actions
export default feesSlice.reducer