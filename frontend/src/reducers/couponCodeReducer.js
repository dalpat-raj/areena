import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading : true,
}

export const couponReducer = createReducer(initialState, {
    // get all coupon of shop 
    allCouponRequest: (state) => {
        state.isLoading = true;
    },
    allCouponSuccess: (state, action) => {
        state.isLoading = false;
        state.coupons = action.payload;
    },
    allCouponFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
})
