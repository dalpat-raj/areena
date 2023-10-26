import { server } from "../Server";
import axios from "axios";

// get all events shop
export const getAllEventShop = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "allEventShopRequest",
    });

    const {data} = await axios.get(`${server}/get-all-event-shop/${id}`, {withCredentials: true});
    dispatch({
      type: "allEventShopSuccess",
      payload: data.events
    })
  } catch (error) {
    dispatch({
      type: "allEventShopFail",
      payload: error.response.data.error.message
    });
  }
}



// // delete shop Event 
export const deleteShopEvent = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "deleteShopEventRequest"
    });

    const {data} = await axios.delete(`${server}/delete-shop-event/${id}`, {withCredentials: true})
    dispatch({
      type: "deleteShopEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteShopEventFail",
      payload: error.response.data.error.message
    });
  }
}



// get all events user
export const getAllEventUser = () => async(dispatch) => {
  try {
    dispatch({
      type: "allEventUserRequest",
    });

    const {data} = await axios.get(`${server}/get-all-events-user`);
    dispatch({
      type: "allEventUserSuccess",
      payload: data.events
    })
  } catch (error) {
    dispatch({
      type: "allEventUserFail",
      // payload: error.response.data.error.message
    });
  }
}

