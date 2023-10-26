import React, { useEffect } from "react";
import "./newArrival.scss";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { useNavigate } from "react-router";

const NewArrival = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="arrival__main">
      <div className="container__heading">
        <h2>New Arrivals</h2>
        <p>We have your occasion covered</p>
      </div>
      <div className="product__container">
        <div className="products__row">
          {products && products.length !== 0 ? (
            products.map((item, i) => <ProductCard products={item} key={i} />)
          ) : (
            <div className="container__heading">
              <h2>No Products Please Add Products</h2>
            </div>
          )}
        </div>
      </div>

      <div className="button">
        <button className="btn-main" onClick={() => navigate("/products")}>
          DISCOVER MORE
        </button>
      </div>
    </div>
  );
};

export default NewArrival;
