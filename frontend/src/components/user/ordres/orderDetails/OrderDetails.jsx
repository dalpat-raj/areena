import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiBeachBag } from "react-icons/gi";
import { useNavigate, useParams } from "react-router";
import { backend__url } from "../../../../Server";
import { getSelectedOrdersUser, orderRefund } from "../../../../actions/orderAction";
import "./orderDetails.scss";
import { HiBadgeCheck } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loader from "../../../layout/loader/Loader";
import { createNewReview } from "../../../../actions/reviewAction";

const OrderDetails = () => {
  const { user } = useSelector((state) => state.user);
  const { message, success, error } = useSelector((state) => state.review);
  const { order, isLoading } = useSelector((state) => state.order);
  const [selectedItem, setSelectedItem] = useState();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reviewHandler = async () => {
    dispatch(createNewReview({ user, rating, comment, productId: selectedItem._id, orderId: id }));
    if(success === true){
      alert(message);
      window.location.reload();
    }
  };

  const refundHandler=(id)=>{
    dispatch(orderRefund(id))
  }

  useEffect(() => {
    dispatch(getSelectedOrdersUser(id));
    if(error){
      dispatch({type: "clearErrors()"})
    }
  }, [dispatch, id, error]);


  return isLoading ? (
    <Loader />
  ) : (
    <div className="order_details">
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

          <div className="back-btn">
            <button onClick={() => navigate(-1)} className="btn-main">
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

        <div className="product_details">
          {order &&
            order?.cart?.map((item, i) => (
              <div className="product_main" key={i}>
                <div className="image__box" >
                  <img
                    src={`${backend__url}/${item?.images[0]}`}
                    alt="product details"
                  />
                  <div className="product_text">
                    <h5>{item?.name.slice(0, 15)}...</h5>
                    <h5>₹ {item?.sellingPrice}</h5>
                  </div>
                </div>

                <div className="payment_info">
                  {order && order?.paymentInfo?.status === "succeeded" ? (
                    <img src={"/payment.png"} alt="payment" />
                  ) : (
                    <>
                      <h5>Payment Info</h5>
                      <p>Not Paid</p>
                    </>
                  )}
                </div>

                {order?.status === "Delivered" ? (
                  item?.isReviewed === true ? (
                    null
                  ) : (
                    <button
                      onClick={() => setOpen(true) || setSelectedItem(item)}
                      className="btn-sec update_status"
                    >
                      Write a Review
                    </button>
                  )
                ) : (
                  <div className="update_stauts">
                    <h4>Order Status</h4>
                    <p>{order?.status}</p>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* review popup */}
        {open && (
          <>
            <div className="review_main">
              <span className="popup_close">
                <RxCross2 onClick={() => setOpen(false)} />
              </span>
              <div className="heading">
                <h4>Give a Review</h4>
              </div>
              <div className="write_comment">
                <label htmlFor="comment">
                  Write a comment
                  <span>(Optional)</span>
                </label>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  name="comment"
                  id="comment"
                  rows="15"
                  value={comment}
                  placeholder="write your expresion about product"
                />
              </div>
              <div className="rating_start_main">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="full_fill_icon"
                      onClick={() => setRating(i)}
                      color="rgb(246,186,0)"
                      size={25}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="full_fill_icon"
                      onClick={() => setRating(i)}
                      color="rgb(246,186,0)"
                      size={25}
                    />
                  )
                )}
              </div>
              <div className="btn">
                <button onClick={reviewHandler} className="btn-main">
                  Submit
                </button>
              </div>
            </div>
            <p onClick={() => setOpen(false)} className="overlay"></p>
          </>
        )}

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

        <div className="row btn_row">
          <button className="btn-main">Send Message To Seller</button>
          {
            order?.status === "Delivered" && (
              <button onClick={()=>refundHandler(order?._id)} className="btn-sec">Give a Refund</button>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
