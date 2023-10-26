import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./topSeller.scss";
import { useSelector } from "react-redux";

const TopSeller = () => {
  const [data, setData] = useState();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const sortedProduct =
      products && products.slice(0,4).sort((a, b) => b.sold_out - a.sold_out);
      setData(sortedProduct);
  }, [products]);

  return (
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
  );
};

export default TopSeller;
