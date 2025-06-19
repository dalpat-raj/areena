import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import Loader from "../../layout/loader/Loader";
import { getAllOrdersShop } from "../../../actions/orderAction";
import { backend__url } from "../../../Server";
import "./shopAllOrder.scss";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

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
                  {orders?.length >= 1 ?
                    orders?.map((item, i) => {
                      return(
                        <Link to={`/shop/order/${item?.orderId}/${seller?._id}`}>
                        <div className="row center" key={i}>
                          <div className="img_name">
                            {item?.items?.map((item, i) => {
                              return (
                                <div className="img_name_row" key={i}>
                                
                                <div key={i}>
                                  <img
                                    src={`${backend__url}/${item?.images[0]}`}
                                    alt="raj"
                                  />
                                  <p>
                                    {item?.title?.length >= 25
                                      ? `${item?.title?.slice(0, 25)}...`
                                      : item?.title}
                                  </p>
                                </div>
                                  
                                
                              </div>
                              )
                            })}
                          </div>
                          <div className="price">
                            <p>₹ {item?.totals?.total}</p>
                          </div>
                          <div className="status">
                            <p>{item?.status}</p>
                          </div>

                          <div className="status">
                            <p>{new Date(item?.createdAt).toLocaleString()}</p>
                          </div>
                          <div className="update__btn">
                              <button className="btn-sec">
                                Check Status
                              </button>
                          </div>
                        </div>
                      </Link>
                      )
                    }) : (
                      <div className="no__orders">
                        <div className="icon">
                          <MdOutlineRemoveShoppingCart size={100}/>
                        </div>
                        <p>You have no Order's this time</p>
                      </div>
                    )}
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

 