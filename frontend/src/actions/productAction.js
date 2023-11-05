import axios from "axios";


// Get All Products
export const getProduct =
  (limit = 8, page = 1, minPrice = 0, maxPrice = 80000, sortBy="", category="", brand="", color="") =>
  async (dispatch) => {
    category = category?.split(" ").join("+")
    category = category?.split("&").join("-");
    
    try {
      dispatch({ type: "ProductRequest" });

      let link = `/api/v2/products?limit=${limit}&page=${page}&sellingPrice[lte]=${maxPrice}&sellingPrice[gte]=${minPrice}${sortBy && `&sort=${sortBy}`}${category && `&category=${category}`}${brand && `&brand=${brand}`}${color && `&color=${color}`}`

      const { data } = await axios.get(link);

      dispatch({
        type: "ProductSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ProductFail",
        payload: error?.response?.data?.error?.message,
      });
    }
  };

// get all products User
export const getSearchProducts = (searchKeyword) => async(dispatch) => {
  try {
    dispatch({
      type: "searchProductsRequest",
    });

    const {data} = await axios.get(`/api/v2/products-search?searchKeyword=${searchKeyword}`);
    dispatch({
      type: "searchProductsSuccess",
      payload: data.product
    })
  } catch (error) {
    dispatch({
      type: "searchProductsail",
      payload: error?.response?.data?.error?.message,
    });
  }
}

// get all products shop
export const getAllProductsShop = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "allProductShopRequest",
    });

    const {data} = await axios.get(`/api/v2/get-all-product-shop/${id}`);
    dispatch({
      type: "allProductShopSuccess",
      payload: data.products
    })
  } catch (error) {
    dispatch({
      type: "allProductShopFail",
      payload: error?.response?.data?.error?.message,
    });
  }
}

// get product details
export const getProductDetails = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "productDetailsRequest",
    });

    const {data} = await axios.get(`/api/v2/get-product-details/${id}`)
    dispatch({
      type: "productDetailtsSuccess",
      payload: data.product,
    });
    
  } catch (error) {
    dispatch({
      type: "productDetailsFail",
      payload: error?.response?.data?.error?.message,
    });
  }
}

// get all products shop
export const getSameProducts = (name) => async(dispatch) => {
  try {
    dispatch({
      type: "getSameProductsRequest",
    });

    const {data} = await axios.get(`/api/v2/get-same-products/${name}`, );
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