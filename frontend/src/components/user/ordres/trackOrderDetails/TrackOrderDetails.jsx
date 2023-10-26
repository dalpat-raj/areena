import React, { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSelectedOrdersUser } from "../../../../actions/orderAction";
import "./trackOrderDetails.scss";
import Loader from "../../../layout/loader/Loader";

const TrackOrderDetails = () => {
  const { order, isLoading } = useSelector((state) => state.order);
  //   const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSelectedOrdersUser(id));
  }, [id, dispatch]);

  return isLoading ? (
    <Loader/>
  ) : (
    <div className="track_order_details">
      <div className="processing_order_center">
        {order && order?.status === "Processing" ? (
          <h1>Your Order is Processing in shop.</h1>
        ) : order?.status === "Transferred to delivery partner" ? (
          <h1>Your Order is on the way</h1>
        ) : order?.status === "Shipping" ? (
          <h1>Your Order is comming with our delivery partner</h1>
        ) : order?.status === "Received" ? (
          <h1>Your Order is in your city. Our Delivery man will deliver it.</h1>
        ) : order?.status === "On the way" ? (
          <h1>Our Delivry man going to deliver your order.</h1>
        ) : order?.status === "Delivered" ? (
          <h1>Your Order is delivered!</h1>
        ) : order?.status === "Processing Refund" ? (
          <h1>Your refund is processing</h1>
        ) : order?.status === "Refund Success" ? (
          <h1>Your refund is success</h1>
        ) : null}
      </div>
    </div>
  )
};

export default TrackOrderDetails;
