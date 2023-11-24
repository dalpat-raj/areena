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
  setBrand,
  sizeData,
  setSize,
  setFilterBar,
  handleClear,
}) => {

  return (
    <div className="filter__main__box">
      <div className="filter__box categories__filter">
        <div className="filter__heading">
          <h4>CATEGORIES</h4>
        </div>
        <div className="filter__type">
          {categoryData &&
            categoryData.map((item, i) => (
              <div className="input__radio" key={i}>
                <input
                  type="radio"
                  name="category"
                  value={item}
                  onChange={(e) => setCategory(e.target.value) || setColor("")}
                />
                <label htmlFor="category">{item}</label>
              </div>
            ))}
        </div>
      </div>
      
      <div className="filter__box color__filter">
        <div className="filter__heading">
          <h4>COLOR</h4>
        </div>
        <ul className="filter__type">
          {colorData &&
            colorData
              ?.slice(0, 12)
              ?.map((item, i) => (
                <li
                  key={i}
                  style={{ backgroundColor: `${item?.hex}` }}
                  onClick={() => setColor(item?.name)}
                ></li>
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
            {sizeData?.length !== 0 &&
              sizeData?.map((item, i) => (
                <div className="input__radio" key={i}>
                  <input
                    type="radio"
                    name="category"
                    value={item}
                    onChange={(e) => setSize(e.target.value) || setColor("")}
                  />
                  <label htmlFor="category">{item}</label>
                </div>
              ))}
          </div>
        </ul>
      </div>

      <div className="filter__box product__brand__filter">
        <div className="filter__heading">
          <h4>Brand</h4>
        </div>
          {
            <div className="brand_filter">
            {brandData &&
              brandData.map((item, i) => (
                <div className="input__radio" key={i}>
                <input type="radio" name="category" value={item} onChange={(e)=>setBrand(e.target.value)}  />
                <label htmlFor="category">{item}</label>
              </div>
              ))}
          </div>
          }
      </div>

      <div className="filter__box availability__filter">
        <div className="filter__heading">
          <h4>AVAILABILITY</h4>
        </div>
        <ul className="filter__type">
            <div className="size__input__box">
              <input type="radio" name="stock"/>
              <label>In Stock</label>
            </div>
            <div className="size__input__box">
              <input type="radio" name="stock"/>
              <label>Out Of Stock</label>
            </div>
        </ul>
      </div>

      <div className="filter__box btn__group">
        <button className="btn-sec" onClick={handleClear}>Clear</button>
        <button className="btn-main" onClick={()=>setFilterBar(false)}>Apply</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
