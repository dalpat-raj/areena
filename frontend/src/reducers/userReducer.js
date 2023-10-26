import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
}

export const userReducer = createReducer(initialState, {
    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.isAuthenticated = false;
    },

    // Register User 
    createUserRequest: (state) => {
        state.loading = true;
    },
    createUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.message = "Registaer success";
        state.user = action.payload;
    },
    createUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
        state.isAuthenticated = false;
    },

    // Login User 
    LoginUserRequest: (state) => {
        state.loading = true;
    },
    LoginUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.message = "Login Success";
        state.user = action.payload;
    },
    LoginUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
        state.isAuthenticated = false;
    },

    // Logout User
    LogoutUserSuccess: (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.message = null;
        state.user = null
    },
    LogoutUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    // update User Info
    updateUserInfoRequest: (state) => {
        state.loading = true;
    },
    updateUserInfoSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    updateUserInfoFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // update User Info
    // updateUserAvatarRequest: (state) => {
    //     state.loading = true;
    // },
    // updateUserAvatarSuccess: (state, action) => {
    //     state.loading = false;
    //     state.user = action.payload;
    // },
    // updateUserAvatarFail: (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // },


    // update User Addresses
    updateUserAddressRequest: (state) => {
        state.loading = true;
    },
    updateUserAddressSuccess: (state, action) => {
        state.loading = false;
        state.success = "address added success";
        state.user = action.payload;
    },
    updateUserAddressFail: (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload;
    },

    // delete User Addresses
    deleteUserAddressRequest: (state) => {
        state.loading = true;
    },
    deleteUserAddressSuccess: (state, action) => {
        state.loading = false;
        state.success = "address deleted";
        state.user = action.payload;
    },
    deleteUserAddressFail: (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload;
    },

    // get all users for admin
  getAllUsersForAdminRequest: (state) => {
    state.isLoading = true;
  },
  getAllUsersForAdminSuccess: (state, action) => {
    state.isLoading = false;
    state.allUsers = action.payload;
  },
  getAllUsersForAdminFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


    clearErrors: (state) => {
        state.error = null;
    }
})