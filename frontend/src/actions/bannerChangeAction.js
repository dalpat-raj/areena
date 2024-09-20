import axios from "axios";

export const createExploreTopBanner = (exploreBannerData) => async (dispatch) => {
    try {
        dispatch({
          type: "createExploreBannerRequest"
        });
    
        const {data} = await axios.post(`/api/v2/admin/expolre-top-banner`, exploreBannerData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
      
        dispatch({
          type: "createExploreBannerSuccess",
          payload: data?.banner,
        })
      } catch (error) {
        dispatch({
          type: "createExploreBannerFail",
          payload: error?.response.data?.error?.message,
        });
      }
}


// get 
export const getExploreTopBanner = () => async (dispatch) => {
  try {
      dispatch({
        type: "getExploreBannerRequest"
      });
  
      const {data} = await axios.get(`/api/v2/get-expolre-top-banner`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      
      dispatch({
        type: "getExploreBannerSuccess",
        payload: data?.banner,
      })
    } catch (error) {
      dispatch({
        type: "getExploreBannerFail",
        payload: error?.response.data?.error?.message,
      });
    }
}


// delete
export const deleteExploreTopBanner = (id) => async (dispatch) => {
  try {
      dispatch({
        type: "deleteExploreBannerRequest"
      });
  
      const {data} = await axios.delete(`/api/v2/admin/delete-expolre-top-banner/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      
      dispatch({
        type: "deleteExploreBannerSuccess",
        payload: data?.banner,
      })
    } catch (error) {
      dispatch({
        type: "deleteExploreBannerFail",
        payload: error?.response.data?.error?.message,
      });
    }
}