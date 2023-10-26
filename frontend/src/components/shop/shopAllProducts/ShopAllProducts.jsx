import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import DashboardSidebar from '../dashboardSidebar/DashboardSidebar'
import { getAllProductsShop } from '../../../actions/productAction';
import Loader from '../../layout/loader/Loader';
import "./shopAllProduct.scss";
import ProductCard from '../../home/ProductCard';

const ShopAllProducts = () => {
  const { seller} = useSelector((state)=>state.seller);
  const { products, isLoading, isDeleted} = useSelector((state)=>state.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllProductsShop(seller?._id));
  },[seller, dispatch, isDeleted])
           
  return (
    <div className="dashboard__container">
    <div className="container">
      <div className="dashboard__row">
        <div className="col__2 dashboard__sidebar">
          <DashboardSidebar active={3}/>
        </div>
        
        {isLoading ? (
           <Loader />
        ) : (
        <div className="col__2">
            <div className="shop__all__products">
                {
                  products && products?.map((item, i)=>(
                    <ProductCard products={item} key={i} shopProduct={true}/>
                  ))
                }
            </div>
        </div>
        )}

      </div>
    </div>
  </div>
  )
}

export default ShopAllProducts
