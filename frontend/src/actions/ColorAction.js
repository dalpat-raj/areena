import axios from "axios";

export const getAllColor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "allColorRequest"
    });

    const {data} = await axios.get(`/api/v2/get-all-color`);
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

