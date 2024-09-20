import axios from "axios";


// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "createProductsRequest",
    });

    const {data} =  await axios.post(`/api/v2/create-product`, newForm, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
    
    dispatch({
      type: "createProductsSuccess",
      payload: data.product
    })
  } catch (error) {
    dispatch({
      type: "createProductsail",
      payload: error?.response?.data?.error?.message,
    });
  }

}

// Get All Products
export const getProduct =
  (limit = 8, page = 1, minPrice = 0, maxPrice = 80000, sortBy="", category="", brand="", size="", color="") =>
  async (dispatch) => {
    category = category?.split(" ").join("+")
    category = category?.split("&").join("-");
    
    try {
      dispatch({ type: "ProductRequest" });

      let link = `/api/v2/products?limit=${limit}&page=${page}&sellingPrice[lte]=${maxPrice}&sellingPrice[gte]=${minPrice}${sortBy && `&sort=${sortBy}`}${category && `&category=${category}`}${brand && `&brand=${brand}`}${size && `&size=${size}`}${color && `&color=${color}`}`

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

  // Get All Products counts
export const getProductCounts =
() =>
async (dispatch) => {  
  try {    
    dispatch({ type: "ProductCountRequest" });
    const { data } = await axios.get(`/api/v2/products-count`, {withCredentials: true});
    
    dispatch({
      type: "ProductCountSuccess",
      payload: data?.productCount,
    });
  } catch (error) {
    dispatch({
      type: "ProductCountFail",
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