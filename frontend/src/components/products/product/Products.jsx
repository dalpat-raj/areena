import React, { useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { funnelOutline, gridOutline, listOutline } from "ionicons/icons";
import "./products.scss";
import FilterSidebar from "../filterSidebar/FilterSidebar";
import ProductCard from "../../home/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";

const Products = () => {
 
  const { products, isLoading } = useSelector((state) => state.products);
 


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="product__container">
      <img width={"100%"} src="/arrival.webp" alt="arrival" />
      <div className="container">
        <div className="product__row">
          <div className={"filter__sidebar"}>
            <FilterSidebar />
          </div>

          <div className="product__bar">
            {/* top filter  */}
            <div className="top__filter">
              <div className="filter__open__icon">
                <IonIcon icon={funnelOutline} />
                <span>Filter</span>
              </div>
              <div className="total__items">
                <span>{products && products.length} items</span>
              </div>
              <div className="top__right__filter">
                <div className="grid__icon">
                  <IonIcon icon={gridOutline} />
                </div>
                <div className="list__icon">
                  <IonIcon icon={listOutline} />
                </div>
                <select name="feature" id="">
                  <option value="feature">Feature</option>
                </select>
              </div>
            </div>

            {/* product show  */}
            <div className="product__container">
              <div className="products__row">
              {products && products.map((item, i) =>
                    isLoading ? (
                      <Loader />
                    ) : (
                        <ProductCard products={item} key={i} />
                    )
                  )
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
