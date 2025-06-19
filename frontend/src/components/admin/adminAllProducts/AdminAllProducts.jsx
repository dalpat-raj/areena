import React, { useEffect, useState } from "react";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import "./adminAllProducts.scss";
import Loader from "../../layout/loader/Loader";
import ProductCard from "../../home/ProductCard";
import { Helmet } from "react-helmet";
import { getProduct } from "../../../actions/productAction";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const AdminAllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);

  const [active, setActive] = useState(2);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
    
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Areena Products</title>
      </Helmet>
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
                  {
                    products?.length > 1 ? (
                      <div className="products__row">
                        {products?.map((item, i) => (
                            <ProductCard
                              products={item}
                              key={i}
                              adminProduct={true}
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="no__products">
                        <div className="icon">
                          <MdOutlineRemoveShoppingCart size={100}/>
                        </div>
                        <p>You have no Product's this time</p>
                      </div>
                    )
                  }
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
                         