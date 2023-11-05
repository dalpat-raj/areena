import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading : true,
}

export const eventReducer = createReducer(initialState, {
    // get all event of shop 
    allEventShopRequest: (state) => {
        state.isLoading = true;
    },
    allEventShopSuccess: (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
    },
    allEventShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // delete shop event
    deleteShopEventRequest: (state) => {
        state.isLoading = true;
    },
    deleteShopEventSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteShopEventFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // delete event event
    deleteEventRequest: (state) => {
        state.isLoading = true;
    },
    deleteEventSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteEventFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },


    // get all event of User 
    allEventUserRequest: (state) => {
        state.isLoading = true;
    },
    allEventUserSuccess: (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
    },
    allEventUserFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
})