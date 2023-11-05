import axios from "axios";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`/api/v2/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// Create User
export const CreateUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "createUserRequest",
    });
    const {data} = axios.post(`/api/v2/create-user`, userData, {headers: { "Content-Type": "multipart/form-data"}, withCredentials: true})
    dispatch({
      type: "createUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "createUserFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// Login user
export const LoginUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginUserRequest",
    });
    const { data } = await axios.post(`/api/v2/login`, user, {
      withCredentials: true,
    });
    dispatch({
      type: "LoginUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginUserFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

export const LogoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v2/user-logout`, {
      withCredentials: true,
    });
    dispatch({
      type: "LogoutUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

export const updateUserInfo = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });
    const { data } = await axios.put(`/api/v2/update-user`, user, {
      withCredentials: true,
    });
    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateUserInfoFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// export const updateUserAvatar = (formData) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "updateUserAvatarRequest",
//     });
//     const { data } = await axios.put(`${server}/update-user-avatar`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       withCredentials: true,
//     });
//     dispatch({
//       type: "updateUserAvatarSuccess",
//       payload: data.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: "updateUserAvatarFail",
//       payload: error.response.data.error.message,
//     });
//   }
// };


// update user address 
export const updateUserAddress = (country, state, city, zipCode, address1, address2, addressType) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserAddressRequest",
    });
    const { data } = await axios.put(`/api/v2/update-user-address`, {
      country, 
      state,
      city, 
      zipCode, 
      address1, 
      address2, 
      addressType
    }, {
      withCredentials: true,
    });
    dispatch({
      type: "updateUserAddressSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateUserAddressFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// delete user address 
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });
    const { data } = await axios.delete(`/api/v2/delete-user-address/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "deleteUserAddressSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// admin
// get all sellers for admin
export const getAllUsersForAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersForAdminRequest",
    });
    const {data} = await axios.get(`/api/v2/admin-get-all-users`, {withCredentials: true});
    dispatch({
      type: "getAllUsersForAdminSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersForAdminFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};