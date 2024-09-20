import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  // create product seller
  createProductsRequest: (state) => {
    state.isLoading = true;
  },
  createProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
  },
  createProductsail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all product of shop
  allProductShopRequest: (state) => {
    state.isLoading = true;
  },
  allProductShopSuccess: (state, action) => {
    state.isLoading = false;
    state.shopProducts = action.payload;
  },
  allProductShopFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete shop product
  deleteShopProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteShopProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
    state.isDeleted = true;
  },
  deleteShopProductFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  deleteShopProductReset: (state) => {
    state.isDeleted = false;
  },

  // ger all product
  ProductRequest: (state) => {
    state.isLoading = true;
  },
  ProductSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload.product;
    state.productsCount = action.payload.productsCount
  },
  ProductFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all product of user
  searchProductsRequest: (state) => {
    state.isLoading = true;
  },
  searchProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  searchProductsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get product details
  productDetailsRequest: (state) => {
    state.isLoading = true;
  },
  productDetailtsSuccess: (state, action) => {
    state.isLoading = false;
    state.productDetails = action.payload;
    state.success = true;
  },
  productDetailsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get same product
  getSameProductsRequest: (state) => {
    state.isLoading = true;
  },
  getSameProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.sameProducts = action.payload;
  },
  getSameProductsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get product count
  ProductCountRequest: (state) => {
    state.isLoading = true;
  },
  ProductCountSuccess: (state, action) => {
    state.isLoading = false;
    state.productCount = action.payload;
  },
  ProductCountFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
    state.success = false;
  },
});
