import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
}


export const reviewReducer = createReducer(initialState, {
    createNewReviewRequest: (state) => {
        state.isLoading = true;
    },
    createNewReviewSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
    },
    createNewReviewFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
})