import React, { useEffect, useState } from "react";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import "./adminAllProducts.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";
import ProductCard from "../../home/ProductCard";
import { Helmet } from "react-helmet";
import { getProduct } from "../../../actions/productAction";
import Pagination from "react-js-pagination";

const AdminAllProducts = () => {
  const { products, productsCount, isLoading } = useSelector((state) => state.products);

  const [active, setActive] = useState(2);
  const [page, setPage] = useState(1);
  const limit = 100;
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getProduct(limit, page))
  },[dispatch, limit, page])
 
  
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
                      {
                        productsCount > 100 && (
                          <div className="pagination">
                          <Pagination
                            activePage={page}
                            itemsCountPerPage={limit}
                            totalItemsCount={productsCount}
                            onChange={setPage}
                            nextPageText="Next"
                            prevPageText="Prev"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                          />
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
