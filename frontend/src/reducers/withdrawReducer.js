import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
}

export const withdrawReducer = createReducer(initialState, {

    // update User Info
    getAllWithdrawRequest: (state) => {
        state.isLoading = true;
    },
    getAllWithdrawSuccess: (state, action) => {
        state.isLoading = false;
        state.withdraw = action.payload;
    },
    getAllWithdrawFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },


    clearErrors: (state) => {
        state.error = null;
    }
})