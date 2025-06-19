import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../../actions/orderAction";
import { backend__url } from "../../../Server";
import Loader from "../../layout/loader/Loader";
import "./trackOrder.scss";

const TrackOrder = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user?._id));
  }, [dispatch, user._id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="order__mains">
          <div className="box">
            {orders &&
              orders?.map((order, i) => (
                // <Link to={`/user/track-order/${order?.orderId}`}>
                  <div className="row" key={i}>
                    <div className="subOrders">
                      {order?.subOrders?.map((data,i) => (
                        <div className="subOrders_row" key={i}>
                          {
                            data?.items?.map((item,i)=>(
                              <div className="img_name_row" key={i}>
                              <img
                                src={`${backend__url}/${item?.images?.[0]}`}
                                alt="areenaa.in"
                              />
                              <p>
                                {item?.title?.length >= 25
                                  ? `${item?.title?.slice(0, 25)}...`
                                  : item?.title}
                              </p>
                              <p>
                                ₹ {item?.sellingPrice} * {item?.qty} = {item?.sellingPrice * item?.qty}
                              </p>
                            </div>
                            ))
                          }
                          <div className="status">
                            <p>status: {data?.payment?.status}</p>
                            <p>sub total: ₹{data?.payment?.subTotal}</p>
                            <p>shipping: ₹{data?.payment?.sellingPrice}</p>
                            <p>Total: ₹{data?.payment?.total}</p>
                            
                          </div>
                          <div className="status">
                            <p>{data?.status}</p>
                          </div>
                        </div>
                        
                      ))}
                    </div>
                  </div>
                // </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TrackOrder;
