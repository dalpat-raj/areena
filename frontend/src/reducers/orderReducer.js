import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading : true,
}


export const orderReducer = createReducer(initialState, {

    // ger all orders for user
    getAllOrdersUserRequest: (state) => {
        state.isLoading = true;
    },
    getAllOrdersUserSuccess: (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
    },
    getAllOrdersUserFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
    },

    // ger selected order for user
    getSelectedOrderUserRequest: (state) => {
        state.isLoading = true;
    },
    getSelectedOrderUserSuccess: (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
    },
    getSelectedOrderUserFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
    },

    // order Refund for user
    orderRefundRequest: (state) => {
        state.isLoading = true;
    },
    orderRefundSuccess: (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.message = action.payload.message;
    },
    orderRefundFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
    },

    // get all order of shop 
    getAllOrdersShopRequest: (state) => {
        state.isLoading = true;
    },
    getAllOrdersShopSuccess: (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
    },
    getAllOrdersShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
    },

    // get selected order of shop 
    getSelectedOrdersShopRequest: (state) => {
        state.isLoading = true;
    },
    getSelectedOrdersShopSuccess: (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
    },
    getSelectedOrdersShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
    },

    // update order status 
    updateOrderStatusRequest: (state) => {
        state.isLoading = true;
    },
    updateOrderStatusSuccess: (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.message = action.payload.message;
    },
    updateOrderStatusFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
    },
    
    // update order status 
    updateRefundOrderStatusRequest: (state) => {
        state.isLoading = true;
    },
    updateRefundOrderStatusSuccess: (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.message = action.payload.message;
    },
    updateRefundOrderStatusFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
    },
    
    // get all order of admin 
    getAllOrdersAdminRequest: (state) => {
        state.isLoading = true;
    },
    getAllOrdersAdminSuccess: (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
    },
    getAllOrdersAdminFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
    },


    clearErrors: (state) => {
        state.error = null;
    }

})