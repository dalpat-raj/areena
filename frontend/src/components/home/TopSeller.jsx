import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./topSeller.scss";
import { useSelector } from "react-redux";

const TopSeller = () => {
  const [data, setData] = useState();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const sortedProduct = products?.filter((a) => a?.sold_out >= 20).slice(0,4);
    setData(sortedProduct);
  }, [products]);

  return (
    <>
    {
      data?.length !== 0 && (
        <div className="topseller">
          <div className="container__heading">
            <h2>Top Seller</h2>
          </div>
          <div className="topseller__container">
            <div className="products__row">
              {data &&
                data.map((item, i) =><ProductCard products={item} key={i} />)}
            </div>
          </div>
        </div>
      )
    }
    </>
  );
};

export default TopSeller;
