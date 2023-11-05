import React, { useState } from "react";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import "./adminAllProducts.scss";
import { useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";
import ProductCard from "../../home/ProductCard";

const AdminAllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);

  const [active, setActive] = useState(2);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="admin__container">
          <div className="container">
            <div className="dashboard__row">
              <div className="col__2 dashboard__sidebar">
                <AdminSidebar active={active} setActive={setActive} />
              </div>

              <div className="col__2 admin__products">
                <div className="products__container">
                  <div className="products__row">
                    {products &&
                      products?.map((item, i) => (
                        <ProductCard
                          products={item}
                          key={i}
                          adminProduct={true}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAllProducts;
