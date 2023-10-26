import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import Loader from "../../layout/loader/Loader";
import { getAllOrdersShop } from "../../../actions/orderAction";
import { backend__url } from "../../../Server";
import "./shopAllOrder.scss";

const ShopAllOrders = () => {
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller?._id));
  }, [seller, dispatch]);

  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={2} />
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="col__2 shop_all_orders">
              <div className="order__main">
                <div className="box">
                  {orders &&
                    orders.map((item, i) => (
                      <Link to={`/shop/order/${item?._id}`}>
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
                            <p>₹ {item?.totalPrice}</p>
                          </div>
                          <div className="status">
                            <p>{item?.status}</p>
                          </div>
                          <div className="update__btn">
                              <button className="btn-sec">
                                Update Status
                              </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
