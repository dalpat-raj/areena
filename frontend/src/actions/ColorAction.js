import { server } from "../Server";
import axios from "axios";

export const getAllColor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "allColorRequest"
    });

    const {data} = await axios.get(`${server}/get-all-color`);
    dispatch({
      type: "allColorSuccess",
      payload: data.color
    })
  } catch (error) {
    dispatch({
      type: "allColorFail",
      payload: error?.response.data?.error?.message,
    });
  }
}

