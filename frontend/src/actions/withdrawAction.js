import axios from "axios";
import { server } from "../Server";

// get all withdraw request
export const getAllWithdrawRequest = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllWithdrawRequest",
    });
    const { data } = await axios.get(`${server}/get-all-withdraw-request`, { withCredentials: true });
    dispatch({
      type: "getAllWithdrawSuccess",
      payload: data.withdraws,
    });
  } catch (error) {
    dispatch({
      type: "getAllWithdrawFail",
      payload: error.response.data.error.message,
    });
  }
};