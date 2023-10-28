import axios from "axios";

export const createNewReview = ({user, rating, comment, productId, orderId}) => async (dispatch) => {
  try {
    dispatch({
      type: "createNewReviewRequest",
    });

    const { data } = await axios.put(
      `/create-new-review`,
      { user, rating, comment, productId, orderId },
      { withCredentials: true }
    );
    dispatch({
      type: "createNewReviewSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "createNewReviewFail",
      payload: error.response.data.message,
    });
  }
};
