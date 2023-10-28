import axios from "axios";

// get all withdraw request
export const getAllWithdrawRequest = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllWithdrawRequest",
    });
    const { data } = await axios.get(`/api/v2/get-all-withdraw-request`, { withCredentials: true });
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