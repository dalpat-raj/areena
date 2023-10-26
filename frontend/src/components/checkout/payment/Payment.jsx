import React, { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./payment.scss";
import { backend__url, server } from "../../../Server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const { user } = useSelector((state) => state.user);

  const [orderData, setOrderData] = useState([]);
  const [selected, setSelected] = useState(1);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${server}/create-order`, order, config)
            .then((res) => {
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDelivery = async () => {

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`${server}/create-order`, order, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <div className="payment__main">
      <div className="row">
        <div className="box payment__col">
          <div className="input__col">
            <div className="select__box" onClick={() => setSelected(1)}>
              <div className="round__box">
                <span className={selected === 1 && "active"}></span>
              </div>
              <p>Pay with Debit/credit card</p>
            </div>
            <div className="input__details">
              <form onSubmit={paymentHandler}>
                <div className="box">
                  <input
                    type="text"
                    value={user?.name}
                    placeholder="Name On Card (Optional)"
                  />
                  <CardExpiryElement
                    className="input"
                    options={{
                      style: {
                        base: {
                          fontSize: "13px",
                          lineHeight: 1.5,
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#333",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="box">
                  <CardNumberElement
                    className="input"
                    options={{
                      style: {
                        base: {
                          fontSize: "13px",
                          lineHeight: 1.5,
                        },
                        empty: {
                          color: "#333",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#333",
                          },
                        },
                      },
                    }}
                  />

                  <CardCvcElement
                    className="input"
                    options={{
                      style: {
                        base: {
                          fontSize: "13px",
                          lineHeight: 1.5,
                        },
                        empty: {
                          color: "#333",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#333",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="btn__box">
                  <button type="submit" className="btn-main">
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="select__box" onClick={() => setSelected(2)}>
              <div className="round__box" onClick={cashOnDelivery}>
                <span className={selected === 2 && "active"}></span>
              </div>
              <p>Cash On Delivery</p>
            </div>
          </div>
        </div>

        <div className="box coupon__col">
          <div className="cart__products">
            {orderData?.cart &&
              orderData?.cart.map((item, i) => (
                <div className="product__row" key={i}>
                  <div className="col img__row">
                    <div className="img">
                      <img
                        src={`${backend__url}/${item?.images[0]}`}
                        alt="df"
                      />
                      <span className="product__qty">{item?.qty}</span>
                    </div>
                    <div className="product__name">
                      <p>{item?.name}</p>
                      <span>
                        {item?.size} {`/ ${item?.color}`}
                      </span>
                    </div>
                  </div>
                  <div className="col col_price">
                    <p>₹ {item?.sellingPrice * item?.qty}</p>
                  </div>
                </div>
              ))}

            <form>
              <div className="discount__code">
                <input type="text" placeholder="Coupon Code" />
                <button type="submit" className="btn-main">
                  Apply
                </button>
              </div>
            </form>

            <div className="price">
              <div className="subtotal row">
                <p>Subtotal</p>
                <p>₹ {orderData?.subtotalPrice}</p>
              </div>
              <div className="shipping row">
                <p>Shipping </p>
                <p className="shipping__price">
                  ₹ {orderData?.shippingPrice?.toLocaleString()}
                </p>
              </div>
              <div className="estimate__tax row">
                <p>Estimate taxes </p>
                <p>₹ 0.0</p>
              </div>
              <div className="discount row">
                <p>Discount</p>
                <p>
                  ₹{" "}
                  {orderData?.discountPrice
                    ? orderData?.discountPrice?.toLocaleString()
                    : "0.0"}
                </p>
              </div>
              <div className="total row">
                <p className="total__text">Total</p>
                <p className="total__price">₹ {orderData?.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
