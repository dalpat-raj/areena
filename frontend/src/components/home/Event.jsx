import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteEvent, getAllEventUser } from "../../actions/eventAction";
import { backend__url } from "../../Server";
import "./event.scss";
import { toast } from "react-toastify";
import { addTocart } from "../../actions/cart";

const Event = () => {
  const { event } = useSelector((state) => state.events);
  const { cart } = useSelector((state) => state.cart);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetailsHandler = (id) => {
    navigate(`/product/${id}?isEvent=true`);
  };

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock <= 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    const getTime = () => {
      const time = Date.parse(event && event[0]?.end_date) - Date.now();
      setDays(Math.floor(time > 0 ? (time / (1000 * 60 * 60 * 24)) : 0));
      setHours(Math.floor( time > 0 ? ((time / (1000 * 60 * 60)) % 24) : 0 ));
      setMinutes(Math.floor(time > 0 ? ((time / 1000 / 60) % 60) : 0));
      setSeconds(Math.floor(time > 0 ? ((time / 1000) % 60) : 0));
    };
    
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, [event]);

  useEffect(()=>{
    const time = Date.parse(event && event[0]?.end_date) - Date.now();
    if(time <= 0){
      dispatch(deleteEvent(event && event[0]?._id));
      dispatch(getAllEventUser());
    }
  },[event, dispatch])

  useEffect(() => {
    dispatch(getAllEventUser());
  }, [dispatch]);

  return (
    event?.length !== 0 ? (
      <div className="event__main">
      <div className="container">
        <div className="row">
          <div className="img__box col">
            <img
              src={`${backend__url}/${event && event[0]?.images[0]}`}
              alt=""
            />
          </div>
          <div className="details__box col">
            <p className="seller">
              <Link to={`/shop/preview/${event && event[0]?.shop?._id}`}>
                {event && event[0]?.shop?.shopName}
              </Link>
            </p>
            <div className="heading">
              <h2>{event && event[0]?.name}</h2>
            </div>

            <div className="description">
              <p>{event && event[0]?.description}</p>
            </div>

            <div className="counter__button">
              <div className="counter">
                <div className="day">
                  <span>Day's</span>
                  {days && days < 10 ? `0${days}` : days}
                </div>
                <div className="hour">
                  <span>hour</span>
                  {hours && hours < 10 ? `0${hours}` : hours}
                </div>
                <div className="minutes">
                  <span>minut</span>
                  {minutes && minutes < 10 ? `0${minutes}` : minutes}
                </div>
                <div className="second">
                  <span>sec</span>
                  {seconds && seconds < 10 ? `0${seconds}` : seconds}
                </div>
              </div>

              <div className="button">
                <button
                  className="btn-sec"
                  onClick={() => productDetailsHandler(event && event[0]?._id)}
                >
                  See Details
                </button>
                <button
                  className="btn-sec"
                  onClick={() => addToCartHandler(event && event[0])}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ) : null
  );
};

export default Event;
