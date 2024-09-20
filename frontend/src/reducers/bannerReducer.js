import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading : false,
}

export const bannerReducer = createReducer(initialState, {
    // create
    createExploreBannerRequest: (state) => {
        state.isLoading = true;
    },
    createExploreBannerSuccess: (state, action) => {
        state.isLoading = false;
        state.exploreBanner = action.payload;
    },
    createExploreBannerFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // get explore top banner 
    getExploreBannerRequest: (state) => {
        state.isLoading = true;
    },
    getExploreBannerSuccess: (state, action) => {
        state.isLoading = false;
        state.exploreBanner = action.payload;
    },
    getExploreBannerFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // delete explore top banner 
    deleteExploreBannerRequest: (state) => {
        state.isLoading = true;
    },
    deleteExploreBannerSuccess: (state, action) => {
        state.isLoading = false;
        state.exploreBanner = action.payload;
    },
    deleteExploreBannerFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },


    clearErrors: (state) => {
        state.error = null;
    }
})
