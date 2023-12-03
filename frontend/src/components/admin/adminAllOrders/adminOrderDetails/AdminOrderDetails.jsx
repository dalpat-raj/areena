import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiBeachBag } from "react-icons/gi";
import {
  getSelectedOrderDetails,
  updateOrderStatus,
  updateRefundOrderStatus,
} from "../../../../actions/orderAction";
import { useNavigate, useParams } from "react-router";
import { HiBadgeCheck } from "react-icons/hi";
import { backend__url } from "../../../../Server";
import Loader from "../../../layout/loader/Loader";
import "./adminOrderDetails.scss";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "../ComponentToPrint";

const AdminOrderDetails = () => {
  const { order, isLoading } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const updateOrderStatusHandler = () => {
    dispatch(updateOrderStatus(id, status));
  };

  const refundUpdateOrderHandler = () => {
    if (status === "") {
      dispatch(updateRefundOrderStatus(id, "Processing Refund"));
    } else {
      dispatch(updateRefundOrderStatus(id, status));
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(getSelectedOrderDetails(id));
  }, [dispatch, id]);

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
                    <h5>{item?.name.slice(0, 15)}...</h5>
                    <h5>₹ {item?.sellingPrice}</h5>
                    {item?.qty && <h5>Quantity: {item?.qty}</h5>}
                    {item?.color && <h5>Color: {item?.color}</h5>}
                    {item?.size && <h5>Size: {item?.size}</h5>}
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
            {order?.status !== "Delivered" &&
            order?.status !== "Refund Success" ? (
              <>
                {order?.status !== "Processing Refund" &&
                order?.status !== "Refund Success" ? (
                  <select
                    value={status}
                    className="btn-sel"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {["Processing", "Delivered"]
                      .slice(["Processing", "Delivered"].indexOf(order?.status))
                      .map((option, i) => (
                        <option value={option} key={i}>
                          {option}
                        </option>
                      ))}
                  </select>
                ) : (
                  <select
                    value={status}
                    className="btn-sel"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {["Processing Refund", "Refund Success"]
                      .slice(
                        ["Processing Refund", "Refund Success"].indexOf(
                          order?.status
                        )
                      )
                      .map((option, i) => (
                        <option value={option} key={i}>
                          {option}
                        </option>
                      ))}
                  </select>
                )}

                <button
                  className="btn-main"
                  onClick={
                    order?.status !== "Processing Refund" &&
                    order?.status !== "Refund Success"
                      ? updateOrderStatusHandler
                      : refundUpdateOrderHandler
                  }
                >
                  Update Status
                </button>
              </>
            ) : (
              <span>{order?.status}</span>
            )}
          </div>
        </div>

        <div className="order__info">
          <div className="shipping__info">
            <h4>Shop Information</h4>

            {order?.cart[0]?.shop && <p>{order?.cart[0]?.shop?.name}</p>}
            {order?.cart[0]?.shop && <p>{order?.cart[0]?.shop?.shopName}</p>}
            {order?.cart[0]?.shop && <p>{order?.cart[0]?.shop?.email}</p>}
            {order?.cart[0]?.shop && <p>{order?.cart[0]?.shop?.phone}</p>}
            {order?.cart[0]?.shop && <p>{order?.cart[0]?.shop?.zipCode}</p>}
            {order?.cart[0]?.shop && <p>{order?.cart[0]?.shop?.address}</p>}
          </div>

          <div className="shipping__info">
            <h4>Shipping Address</h4>
            {order?.user?.name && (
              <p>
                Name: <span>{order?.user?.name}</span>
              </p>
            )}
            {order?.user?.email && (
              <p>
                Email: <span>{order?.user?.email}</span>
              </p>
            )}
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
            <p>Pin Code. {order?.shippingAddress?.zipCode}</p>
            <p>+91 {order?.user?.phoneNumber}</p>
          </div>
          <div className="price__box">
            <h4>Payment Details</h4>
            <div className="total_price">
              {order?.shippingPrice && (
                <p>Shipping : ₹ {order?.shippingPrice}</p>
              )}
              {order?.discountPrice && (
                <p>
                  Discount : ₹{" "}
                  {order?.discountPrice !== null ? order?.discountPrice : 0}
                </p>
              )}
              {order?.subTotalPrice && (
                <p>SubTotal : ₹ {order?.subTotalPrice}</p>
              )}
              {order?.totalPrice && <p>Total Price : ₹ {order?.totalPrice}</p>}
              <div className="Component__to__print">
                <ComponentToPrint ref={componentRef} />
              </div>
              <button className="btn-main" onClick={handlePrint}>
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
