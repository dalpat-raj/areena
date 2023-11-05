import React from "react";
import "./filterSidebar.scss";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const FilterSidebar = ({
  categoryData,
  setCategory,
  colorData,
  brandData,
  setColor,
  minPrice,
  maxPrice,
  setPrice,
  setBrand
}) => {

  return (
    <div className="filter__main__box">
      <div className="filter__box categories__filter">
        <div className="filter__heading">
          <h4>CATEGORIES</h4>
        </div>
        <ul className="filter__type">
          {categoryData &&
            categoryData.map((item, i) => (
              <li onClick={() => setCategory(item) || setColor("")} key={i}>
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
            colorData?.map((item,i) => (
              <li
              key={i}
                style={{ backgroundColor: `${item?.hex}` }}
                onClick={() => setColor(item?.name)}
              >
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
            <RangeSlider max={80000} onInput={setPrice} />
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

      <div className="filter__box product__brand__filter">
        <div className="filter__heading">
          <h4>Brand</h4>
        </div>
          {
            <ul className="brand_filter">
            {brandData &&
              brandData.map((item, i) => (
                <li onClick={() => setBrand(item)} key={i}>
                  {item}
                </li>
              ))}
          </ul>
          }
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
