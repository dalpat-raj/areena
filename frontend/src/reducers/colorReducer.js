import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading : true,
}

export const colorReducer = createReducer(initialState, {
    // get all coupon of shop 
    allColorRequest: (state) => {
        state.isLoading = true;
    },
    allColorSuccess: (state, action) => {
        state.isLoading = false;
        state.colors = action.payload;
    },
    allColorFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
})
