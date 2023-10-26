import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiBeachBag } from "react-icons/gi";
import {
  getSelectedOrderShop,
  updateOrderStatus,
  updateRefundOrderStatus,
} from "../../../../actions/orderAction";
import { useNavigate, useParams } from "react-router";
import { HiBadgeCheck } from "react-icons/hi";
import { backend__url } from "../../../../Server";
import Loader from "../../../layout/loader/Loader";
import "./shopOrderDetails.scss";

const ShopOrderDetails = () => {
  const { order, isLoading, error } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(isLoading);

  const updateOrderStatusHandler = () => {
    console.log("update status");
    dispatch(updateOrderStatus(id, status));
  };

  const refundUpdateOrderHandler=()=>{
    console.log("Refund success");
    if(status === ""){
      dispatch(updateRefundOrderStatus(id, "Processing Refund"))
    }else{
      dispatch(updateRefundOrderStatus(id, status))
    }
  }

  useEffect(() => {
    dispatch(getSelectedOrderShop(id));
    if (error) {
      dispatch({ type: "clearErrors()" });
    }
  }, [dispatch, id, error]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="shop_order_details">
      <div className="container">
        <div className="row">
          {order?.status === "Delivered" ? (
            <div className="heading heading_row">
              <span>
                <HiBadgeCheck />
              </span>
              <h4>Delivered</h4>
            </div>
          ) : (
            <div className="heading">
              <span>
                <GiBeachBag />
              </span>
              <h4>Order Details</h4>
            </div>
          )}
          <div>
            <button className="btn-main" onClick={() => navigate(-1)}>
              All Orders
            </button>
          </div>
        </div>

        <div className="order_id">
          <p>
            Order ID : <span>{order?._id?.slice(0, 9)}...</span>
          </p>
          <p>
            Placed on : <span>{order?.createdAt?.slice(0, 10)}</span>
          </p>
        </div>

        <div className="row product_details">
          <div className="shop_product_main">
            {order &&
              order?.cart.map((item, i) => (
                <div className="image__box" key={i}>
                  <img
                    src={`${backend__url}/${item?.images[0]}`}
                    alt="product details"
                  />
                  <div className="product_text">
                    <h5>{item?.name.slice(0, 10)}...</h5>
                    <h5>₹ {item?.sellingPrice}</h5>
                  </div>
                </div>
              ))}
          </div>
          <div className="payment_info">
            {order && order?.paymentInfo?.status === "succeeded" ? (
              <img src={"/payment.png"} alt="payment" />
            ) : (
              <>
                <h5>Payment Info</h5>
                <p>{order?.paymentInfo?.type}</p>
              </>
            )}
          </div>

          <div className="update_stauts">
            <h4>Order Status</h4>
            {
              order?.status !== "Delivered" && order?.status !== "Refund Success" ? (
                <>
                {order?.status !== "Processing Refund" && order?.status !== "Refund Success" ? (
              <select
              value={status}
                className="btn-sel"
                onChange={(e) => setStatus(e.target.value)}
              >
                {[
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ]
                  .slice(
                    [
                      "Processing",
                      "Transferred to delivery partner",
                      "Shipping",
                      "Received",
                      "On the way",
                      "Delivered",
                    ].indexOf(order?.status)
                  )
                  .map((option, i) => (
                    <option value={option} key={i}>
                      {option}
                    </option>
                  ))}
              </select>
            ) : (
              <select value={status} className="btn-sel" onChange={(e) => setStatus(e.target.value)}>
                 {[
                  "Processing Refund",
                  "Refund Success",
                ].slice(
                    [
                      "Processing Refund",
                      "Refund Success",
                    ].indexOf(order?.status)
                  ).map((option, i) => (
                    <option value={option} key={i}>
                      {option}
                    </option>
                  ))}
              </select>
            )}

            <button
              className="btn-main"
              onClick={order?.status !== "Processing Refund" && order?.status !== "Refund Success" ? updateOrderStatusHandler : refundUpdateOrderHandler}
            >
              Update Status
            </button>
                </>
              ) : (
                <span>{order?.status}</span>
              )
            }

          </div>
        </div>

        <div className="order__info">
          <div className="shipping__info">
            <h4>Shipping Address</h4>
            <p>
              {order?.shippingAddress?.address1 +
                ", " +
                order?.shippingAddress?.address2 +
                ", " +
                order?.shippingAddress?.city}
            </p>
            <p>
              {order?.shippingAddress?.state +
                " (" +
                order?.shippingAddress?.country}
              )
            </p>
            <p>Zip Code. {order?.shippingAddress?.zipCode}</p>
            <p>+91 {order?.user?.phoneNumber}</p>
          </div>
          <div className="price__box">
            <div className="total_price">
              <p>
                Total Price : <span>₹ {order?.totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOrderDetails;
