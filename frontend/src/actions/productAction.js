import { server } from "../Server";
import axios from "axios";


// Get All Products
export const getProduct =
  (limit = 8, page = 1, category, sortBy ,minPrice = 0, maxPrice = 80000) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ProductRequest" });

      let link = `${server}/products?limit=${limit}&page=${page}&sellingPrice[lte]=${maxPrice}&sellingPrice[gte]=${minPrice}`

      if(category){
        link = `${server}/products?limit=${limit}&page=${page}${category && `&category=${category}`}&sellingPrice[lte]=${minPrice}&sellingPrice[gte]=${maxPrice}`
      }

      if(sortBy){
        link = `${server}/products?limit=${limit}&page=${page}${sortBy && `&sort=${sortBy}`}&sellingPrice[lte]=${minPrice}&sellingPrice[gte]=${maxPrice}`
      }

      const { data } = await axios.get(link);

      dispatch({
        type: "ProductSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "ProductFail",
        payload: error.response.data.message,
      });
    }
  };

// get all products User
export const getSearchProducts = (searchKeyword) => async(dispatch) => {
  try {
    dispatch({
      type: "searchProductsRequest",
    });

    const {data} = await axios.get(`${server}/products-search?searchKeyword=${searchKeyword}`);
    dispatch({
      type: "searchProductsSuccess",
      payload: data.product
    })
  } catch (error) {
    dispatch({
      type: "searchProductsail",
      payload: error.response.data.error.message
    });
  }
}

// get all products shop
export const getAllProductsShop = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "allProductShopRequest",
    });

    const {data} = await axios.get(`${server}/get-all-product-shop/${id}`);
    dispatch({
      type: "allProductShopSuccess",
      payload: data.products
    })
  } catch (error) {
    dispatch({
      type: "allProductShopFail",
      payload: error.response.data.error.message
    });
  }
}

// get product details
export const getProductDetails = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "productDetailsRequest",
    });

    const {data} = await axios.get(`${server}/get-product-details/${id}`)
    dispatch({
      type: "productDetailtsSuccess",
      payload: data.product,
    });
    
  } catch (error) {
    dispatch({
      type: "productDetailsFail",
      payload: error.response.data.error.message,
    });
  }
}

// get all products shop
export const getSameProducts = (name) => async(dispatch) => {
  try {
    dispatch({
      type: "getSameProductsRequest",
    });

    const {data} = await axios.get(`${server}/get-same-products/${name}`, );
    dispatch({
      type: "getSameProductsSuccess",
      payload: data.products
    })
  } catch (error) {
    dispatch({
      type: "getSameProductsFail",
      payload: error?.response?.data?.error?.message
    });
  }
}