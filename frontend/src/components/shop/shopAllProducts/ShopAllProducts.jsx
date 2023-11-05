import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import { getAllProductsShop } from "../../../actions/productAction";
import Loader from "../../layout/loader/Loader";
import "./shopAllProduct.scss";
import ProductCard from "../../home/ProductCard";
import { useNavigate } from "react-router";

const ShopAllProducts = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading, isDeleted } = useSelector(
    (state) => state.products
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsShop(seller?._id));
  }, [seller, dispatch, isDeleted]);

  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={3} />
          </div>

          {isLoading ? (
            <Loader />
          ) : products.length !== 0 ? (
            <div className="col__2 shop__all__products">
              <div className="products__row">
                {products &&
                  products?.map((item, i) => (
                    <ProductCard products={item} key={i} shopProduct={true} />
                  ))}
              </div>
            </div>
          ) : (
            <div className="not_products">
              <p>
                You have not created a product yet. Click on the button to
                create a product.
              </p>
              <button onClick={()=>navigate("/shop-dashboard-create-product")} className="btn-main">Create Products</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
