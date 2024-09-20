import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import { getAllProductsShop } from "../../../actions/productAction";
import Loader from "../../layout/loader/Loader";
import "./shopAllProduct.scss";
import ProductCard from "../../home/ProductCard";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router";
import ShopCreateProduct from "../shopCreateProduct/ShopCreateProduct";

const ShopAllProducts = () => {
  const { seller } = useSelector((state) => state.seller);
  const { shopProducts, isLoading, isDeleted } = useSelector(
    (state) => state.products
  );
  

  const [edit, setEdit] = useState(false)
  const [editProductData, setEditProductData] = useState("")
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit=(item)=>{
    setEdit(true);
    setEditProductData(item)
  }

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
          {
            isLoading ? (
            <Loader />
          ) : (
            edit === true ? (
             <ShopCreateProduct edit={edit} setEdit={setEdit} editProduct={editProductData}/>
            ) : (
              shopProducts?.length >= 1 ? (
            <div className="col__2 shop__all__products">
              <div className="products__row">
                {shopProducts &&
                  shopProducts?.map((item, i) => (
                    <div className="product__col" key={i}>
                    <ProductCard products={item} shopProduct={true} />
                    <div className="icon__edit"><FiEdit onClick={()=>handleEdit(item)}/></div>
                    </div>
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
          )
            ) 
          )
          }

        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
