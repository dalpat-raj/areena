import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },

  // Login User
  LoginSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoginSellerSuccess: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoginSellerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },

  // Logout Seller
  LogoutSellerSuccess: (state) => {
    state.isSeller = false;
    state.isLoading = false;
    state.seller = null;
  },
  LogoutSellerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },

  // update seller Info
  updateShopInfoRequest: (state) => {
    state.isLoading = true;
  },
  updateShopInfoSuccess: (state, action) => {
    state.isLoading = false;
    state.seller = action.payload;
  },
  updateShopInfoFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all sellers for admin
  getAllSellerForAdminRequest: (state) => {
    state.isLoading = true;
  },
  getAllSellerForAdminSuccess: (state, action) => {
    state.isLoading = false;
    state.allSellers = action.payload;
  },
  getAllSellerForAdminFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete sellers by admin
  deleteSellerByAdminRequest: (state) => {
    state.isLoading = true;
  },
  deleteSellerByAdminSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteSellerByAdminFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
