import React, { useEffect, useState } from "react";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import "./adminAllOrders.scss";
import { getAllOrdersAdmin } from "../../../actions/orderAction";
import { backend__url } from "../../../Server";
import Loader from "../../layout/loader/Loader";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const AdminAllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const [active, setActive] = useState(3);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Areena Orders</title>
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

              <div className="col__2 admin__orders">
                <div className="latest_orders">
                  <div className="order_container">
                    <div className="order__main">
                      <div className="box">
                        {orders?.length > 0 ?
                          orders.map((item, i) => (
                            <Link to={`/admin/order/${item?._id}`}>
                              <div className="row" key={i}>
                                <div className="img_name">
                                  {item?.cart.map((item, i) => (
                                    <div className="img_name_row" key={i}>
                                      <img
                                        src={`${backend__url}/${item?.images[0]}`}
                                        alt="raj"
                                      />
                                      <p>
                                        {item?.name.length >= 25
                                          ? `${item?.name.slice(0, 25)}...`
                                          : item?.name}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <div className="price">
                                  <p>₹ { item.totalPrice }</p>
                                </div>
                                <div className="status">
                                  <p>{item?.status}</p>
                                </div>
                              </div>
                            </Link>
                          )) : (
                            <div className="no__orders">
                              <div className="icon">
                                <MdOutlineRemoveShoppingCart size={100}/>
                              </div>
                              <p>You have a no order's this time</p>
                            </div>
                          )}
                      </div>
                    </div>
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

export default AdminAllOrders;
