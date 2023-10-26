import React, { useEffect, useState } from "react";
import "./filterSidebar.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { server } from "../../../Server";
import { useDispatch } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const FilterSidebar = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [colorData, setColorData] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState();
  const [sortBy, setSortBy] = useState();
  const [price, setPrice] = useState([0, 3000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);

  const dispatch = useDispatch();

  useEffect(() => {
    setMinPrice(price[0]);
    setMaxPrice(price[1]);
  }, [price]);

  useEffect(() => {
    axios
      .get(`${server}/products?fields=category`)
      .then((res) => {
        const result = new Set(res.data.product.map((item) => item.category));
        setCategoryData(Array.from(result));
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${server}/products?fields=color`)
      .then((res) => {
        const result = new Set(res.data.product.map((item) => item.color));
        setColorData(Array.from(result));
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message);
      });
  }, []);

  useEffect(() => {
    if (category) {
      dispatch(getProduct(limit, page, category, minPrice, maxPrice));
    } else if (sortBy) {
      dispatch(getProduct(limit, page, sortBy, minPrice, maxPrice));
    } else {
      dispatch(getProduct(limit, page, "", "", minPrice, maxPrice));
    }
  }, [limit, page, category, sortBy, minPrice, maxPrice]);

  return (
    <div className="filter__main__box">
      <div className="filter__box categories__filter">
        <div className="filter__heading">
          <h4>CATEGORIES</h4>
        </div>
        <ul className="filter__type">
          {categoryData &&
            categoryData.map((item, i) => (
              <li onClick={() => setCategory(item)} key={i}>
                {item}
              </li>
            ))}
        </ul>
      </div>

      <div className="filter__box color__filter">
        <div className="filter__heading">
          <h4>COLOR</h4>
        </div>
        <ul className="filter__type">
          {colorData &&
            colorData?.map((item) => (
              <li
                style={{ backgroundColor: `${item}` }}
                onClick={() => setSortBy("color")}
              >
                <NavLink></NavLink>
              </li>
            ))}
        </ul>
      </div>

      <div className="filter__box price__filter">
        <div className="filter__heading">
          <h4>PRICE</h4>
        </div>
        <ul className="filter__type">
          <div className="price__input__box">
            <div className="price__input">
              <input type="text" value={minPrice} />
              <span>₹</span>
            </div>
            <div className="price__input">
              <input type="text" value={maxPrice} />
              <span>₹</span>
            </div>
          </div>
          <div className="slider">
            <RangeSlider max={3000} onInput={setPrice} />
          </div>
        </ul>
      </div>

      <div className="filter__box size__filter">
        <div className="filter__heading">
          <h4>SIZE</h4>
        </div>
        <ul className="filter__type">
          <div className="alpabate__size">
            <div className="size__input__box">
              <input type="checkbox" />
              <span>XS</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>XS</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>XS</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>XS</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>XS</span>
            </div>
          </div>

          <div className="number__size">
            <div className="size__input__box">
              <input type="checkbox" />
              <span>2</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>2</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>2</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>2</span>
            </div>
          </div>
        </ul>
      </div>

      <div className="filter__box product__type__filter">
        <div className="filter__heading">
          <h4>PPRODUCT TYPE</h4>
        </div>
        <ul className="filter__type">
          <div className="alpabate__size">
            <div className="size__input__box">
              <input type="checkbox" />
              <span>Accessories</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>bAG</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>Shoes</span>
            </div>
          </div>

          <div className="number__size">
            <div className="size__input__box">
              <input type="checkbox" />
              <span>Sunglasses</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>watch</span>
            </div>
          </div>
        </ul>
      </div>

      <div className="filter__box availability__filter">
        <div className="filter__heading">
          <h4>AVAILABILITY</h4>
        </div>
        <ul className="filter__type">
          <div className="alpabate__size">
            <div className="size__input__box">
              <input type="checkbox" />
              <span>In Stock</span>
            </div>
            <div className="size__input__box">
              <input type="checkbox" />
              <span>Out Of Stock</span>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
