import React, { useEffect, useState } from 'react';
import ProductCard from '../../home/ProductCard';
import "./recomendedProduct.scss";
import { useSelector } from 'react-redux';

const RecomendedProduct = ({data, eventData}) => {
  const {products} = useSelector((state)=>state.products);
  const {event} = useSelector((state)=>state.events);

  const [productData, setProductData] = useState();

  useEffect(()=>{
    if(eventData !== null){
      const filterEvents = event && event.filter((item)=>item.category === data?.category);
      setProductData(filterEvents);
    }else{
      const filterProducts = products && products.slice(0,5).filter((item)=>item.category === data?.category);
      setProductData(filterProducts);
    }
  },[data, products, event, eventData])

  return (
    <div className="recomended__product">
        <div className="container__heading">
            <h2>Recomended Products</h2>
        </div>
        <div className="recomended__container">
            <div className="rows">
              {
                eventData !== true && (
                    productData && productData.map((item, i)=>(
                      <ProductCard products={item} key={i}/>
                    ))
                )
              }
              {
                eventData === true && (
                    productData && productData.map((item, i)=>(
                      <ProductCard products={item} isWishlist={false} isEvent={true} key={i}/>
                    ))
                )
              }
            </div>
        </div>
    </div>
  )
}

export default RecomendedProduct
