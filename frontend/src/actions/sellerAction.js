import axios from "axios";

// Load Seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`/api/v2/getseller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// Login Seller
export const LoginSeller = (shop) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginSellerRequest",
    });
    dispatch({
      type: "LoginSellerSuccess",
      payload: shop,
    });
  } catch (error) {
    dispatch({
      type: "LoginSellerFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// logout seller
export const LogoutSeller = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v2/shop-logout`, {
      withCredentials: true,
    });
    dispatch({
      type: "LogoutSellerSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "LogoutSellerFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// update seller
export const updateSellerInfo = (seller) => async (dispatch) => {
  try {
    dispatch({
      type: "updateShopInfoRequest",
    });
    const { data } = await axios.put(`/api/v2/update-shop`, seller, {
      withCredentials: true,
    });
    dispatch({
      type: "updateShopInfoSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "updateShopInfoFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// get all sellers for admin
export const getAllSellerForAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellerForAdminRequest",
    });
    const {data} = await axios.get(`/api/v2/admin-get-all-seller`, {withCredentials: true});
    dispatch({
      type: "getAllSellerForAdminSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellerForAdminFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};

// delete seller by admin
export const deleteSellerByAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteSellerByAdminRequest",
    });
    const {data} = await axios.delete(`/api/v2/delete-seller-by-admin/${id}`, {withCredentials: true});
    dispatch({
      type: "deleteSellerByAdminSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteSellerByAdminFail",
      payload: error?.response?.data?.error?.message,
    });
  }
};