import { createSlice } from "@reduxjs/toolkit";
import { userAuthSingUpAction, userAuthGetAction, userAuthLoginAction } from "./userAuthActions";

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
    userAuthSingUpAct: getInitialState(),
    userAuthGetAct: getInitialState(),
    userAuthLoginAct: getInitialState(),
    userData: {}
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        resetUserAuth: (state) => {
            state.userAuthSingUpAct = getInitialState();
            state.userAuthGetAct = getInitialState()
            state.userAuthLoginAct = getInitialState()
        },
        resetUserAuthValue: (state) => {
            state.userAuthSingUpAct = getInitialState();
            state.userAuthGetAct = getInitialState()
            state.userAuthLoginAct = getInitialState()
            state.userData = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userAuthLoginAction.pending, (state) => {
            state.userAuthLoginAct = getInitialState()
            state.userAuthLoginAct.isLoading = true
        })
        builder.addCase(userAuthLoginAction.fulfilled, (state) => {
            state.userAuthLoginAct = getInitialState()
            state.userAuthLoginAct.isSuccess = true
        })
        builder.addCase(userAuthLoginAction.rejected, (state, action) => {
            state.userAuthLoginAct = getInitialState()
            state.userAuthLoginAct.isError = true
            state.userAuthLoginAct.errorResponse = action.payload
        })

        builder.addCase(userAuthSingUpAction.pending, (state) => {
            state.userAuthSingUpAct = getInitialState()
            state.userAuthSingUpAct.isLoading = true
        })
        builder.addCase(userAuthSingUpAction.fulfilled, (state, action) => {
            state.userAuthSingUpAct = getInitialState()
            state.userAuthSingUpAct.isSuccess = true
            state.userData = action.payload?.data || {}
        })
        builder.addCase(userAuthSingUpAction.rejected, (state, action) => {
            state.userAuthSingUpAct = getInitialState()
            state.userAuthSingUpAct.isError = true
            state.userAuthSingUpAct.errorResponse = action.payload
        })

        builder.addCase(userAuthGetAction.pending, (state) => {
            state.userAuthGetAct = getInitialState()
            state.userAuthGetAct.isLoading = true
        })
        builder.addCase(userAuthGetAction.fulfilled, (state, action) => {
            state.userAuthGetAct = getInitialState()
            state.userAuthGetAct.isSuccess = true
            state.userData = action.payload?.data || {}
        })
        builder.addCase(userAuthGetAction.rejected, (state, action) => {
            state.userAuthGetAct = getInitialState()
            state.userAuthGetAct.isError = true
            state.userAuthGetAct.errorResponse = action.payload
        })

    }
})

export const { resetUserAuth, resetUserAuthValue } = userAuthSlice.actions

export default userAuthSlice.reducer