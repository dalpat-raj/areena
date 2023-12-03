import axios from "axios";

export const getAllOrdersUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `/api/v2/get-all-orders-user/${userId}`,
      config
    );
    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFail",
      payload: error.response.data.message,
    });
  }
};

export const getSelectedOrdersUser = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "getSelectedOrderUserRequest",
    });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `/api/v2/get-selected-order-user/${orderId}`,
      config
    );
    dispatch({
      type: "getSelectedOrderUserSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "getSelectedOrderUserFail",
      payload: error.response.data.message,
    });
  }
};

export const orderRefund = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "orderRefundRequest",
    });

    const { data } = await axios.put(`/api/v2/order-refund/${orderId}`, {
      status: "Processing Refund",
    });
    dispatch({
      type: "orderRefundSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "orderRefundFail",
      payload: error.response.data.message,
    });
  }
};

// shop
export const getAllOrdersShop = (ShopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersShopRequest",
    });
    const { data } = await axios.get(
      `/api/v2/get-all-orders-shop/${ShopId}`,
      {withCredentials:true}
    );
    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFail",
      payload: error.response.data.error.message,
    });
  }
};

export const getSelectedOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "getSelectedOrdersShopRequest",
    });

    const { data } = await axios.get(
      `/api/v2/get-selected-order-details/${orderId}`,
      { withCredentials: true }
    );
    dispatch({
      type: "getSelectedOrdersShopSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "getSelectedOrdersShopFail",
      payload: error.response.data.error.message,
    });
  }
};
export const getSelectedOrderShop = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "getSelectedOrdersShopRequest",
    });

    const { data } = await axios.get(
      `/api/v2/get-selected-order-shop/${orderId}`,
      { withCredentials: true }
    );
    dispatch({
      type: "getSelectedOrdersShopSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "getSelectedOrdersShopFail",
      payload: error.response.data.error.message,
    });
  }
};

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    dispatch({
      type: "updateOrderStatusRequest",
    });

    const { data } = await axios.put(
      `/api/v2/update-order-status/${orderId}`,
      { status },
      { withCredentials: true }
    );
    dispatch({
      type: "updateOrderStatusSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateOrderStatusFail",
      payload: error.response.data.message,
    });
  }
};

export const updateRefundOrderStatus =
  (orderId, status) => async (dispatch) => {
    try {
      dispatch({
        type: "updateRefundOrderStatusRequest",
      });

      const { data } = await axios.put(
        `/api/v2/shop-order-refund-success/${orderId}`,
        { status },
        { withCredentials: true }
      );
      dispatch({
        type: "updateRefundOrderStatusSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "updateRefundOrderStatusFail",
        payload: error.response.data.message,
      });
    }
  };

// shop
export const getAllOrdersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersAdminRequest",
    });

    const { data } = await axios.get(
      `/api/v2/get-all-orders-admin`, {withCredentials: true}
    );
    dispatch({
      type: "getAllOrdersAdminSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersAdminFail",
      payload: error.response.data.message,
    });
  }
};