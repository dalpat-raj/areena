import { server } from "../Server";
import axios from "axios";

export const getAllCoupon = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "allCouponRequest"
    });

    const {data} = await axios.get(`${server}/get-coupon/${id}`, {withCredentials: true});
    dispatch({
      type: "allCouponSuccess",
      payload: data.couponCodes
    })
  } catch (error) {
    dispatch({
      type: "allCouponFail",
      payload: error.response.data.error.message,
    });
  }
}


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};