import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./orders.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../../actions/orderAction";
import Loader from "../../layout/loader/Loader";

const Orders = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllOrdersUser(user?._id));
  }, [dispatch, user?._id]);
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="order__main">
          <div className="box">
            {orders?.length >= 1 ?
              <>
              {
                orders?.map((item, i) => (
                <Link to={`/user/order/${item?.orderId}`} key={i}>
                  <div className="row" key={i}>
                    <div className="sippin" >
                      <h4>Shipping</h4>
                      <p>{item?.subOrders[0]?.shipping?.address?.name}</p>
                      <p>{item?.subOrders[0]?.shipping?.address?.phone}</p>
                      <p><span>{item?.subOrders[0]?.shipping?.address?.address1}, {item?.subOrders[0]?.shipping?.address?.city}</span></p>
                      <p><span>{item?.subOrders[0]?.shipping?.address?.state}, {item?.subOrders[0]?.shipping?.address?.pincode}</span></p>
                    </div>
                    <div className="price">
                      <h4>Charges</h4>
                      <p>sub total ₹ {item?.totals?.grandTotal - item?.totals?.shippingPrice}</p>
                      <p>shipping ₹ {item?.totals?.shippingPrice}</p>
                      <p>Total ₹ {item?.totals?.grandTotal + item?.totals?.shippingPrice}</p>
                    </div>
                    <div className="action">
                      <button className="btn-main">View Order</button>
                    </div>
                  </div>
                </Link>
              ))
              }
              </> : (
                <div>
                  no orders 
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
