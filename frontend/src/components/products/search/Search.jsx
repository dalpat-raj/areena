import React, { useCallback } from "react";
import { IonIcon } from "@ionic/react";
import "./search.scss";
import { searchOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backend__url } from "../../../Server";
import { getProductDetails, getSearchProducts } from "../../../actions/productAction";

const Search = ({ setSearchComponent }) => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch(getSearchProducts(value));
  };
  const optimisedVersion = useCallback(debounce(handleChange), []);

  const detailsHandler=(id)=>{
    dispatch(getProductDetails(id));
    navigate(`product/${id}`)
  }

  return (
    <div className="search__main">
      <div className="search__input__bar">
        <input
          type="text"
          placeholder="search for items"
          onChange={optimisedVersion}
        />
        <button type="submit">
          <IonIcon icon={searchOutline} />
        </button>
      </div>
      <div className="search__text">
        <h2>Quick Search:</h2>
        <div className="search__tag">
          <p>t-shirt</p>
          <p>top</p>
          <p>black</p>
          <p>women</p>
        </div>
      </div>
      <div className="product__container">
        <div className="product_container_heading">
          <h2>You May Also Like</h2>
        </div>

        {products &&
          products.map((item, i) => {
            return (
              <div
                className="product__box"
                onClick={() => detailsHandler(item?._id) || setSearchComponent(false)}
                key={i}
              >
                <img
                  src={`${backend__url}/${item?.images[0]}`}
                  alt={item?.name}
                />
                <div className="product__details">
                  <p>{item?.name}</p>
                  <p>₹ {item?.sellingPrice}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
