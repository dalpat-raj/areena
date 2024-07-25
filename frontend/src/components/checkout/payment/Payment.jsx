import React, { useEffect, useState } from "react";
import "./payment.scss";
import { backend__url } from "../../../Server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const { user } = useSelector((state) => state.user);

  const [orderData, setOrderData] = useState([]);
  const [selected, setSelected] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);
  
  const amount = orderData?.totalPrice
  const order = {
    cart: orderData?.data,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    shippingPrice: orderData?.shippingPrice,
    discountPrice: orderData?.discountPrice,
    subTotalPrice: orderData?.subTotalPrice,
    totalPrice: orderData?.totalPrice,
  };

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  const proceedToPayment = async () => {    
    try {
      const {data} = await axios.post(`/api/v2/payment/orders-id-generating`,{amount},config);
     
      if(data){
        handlePaymentVerify(data?.data)
        console.log(data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: "rzp_test_KPEfWuTPzusg7A",
      amount: data?.amount,
      currency: data?.currency,
      name: "MS_VIRAT_INDIA",
      description: "Test Mode",
      order_id: data?.id,
      handler: async (response) => {
          try {
            const order = {
              cart: orderData?.data,
              shippingAddress: orderData?.shippingAddress,
              user: user && user,
              shippingPrice: orderData?.shippingPrice,
              discountPrice: orderData?.discountPrice,
              subTotalPrice: orderData?.subTotalPrice,
              totalPrice: orderData?.totalPrice,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const dataa = await axios.post(`/api/v2/payment/payment-verify-process`,order, config)
            if(dataa?.data){
                order.paymentInfo = {
                  type: dataa?.data?.paymmentData?.method,
                  status: "Paid",
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  created_at: data?.created_at,
                  wallet: dataa?.data?.paymmentData?.walllet,
                  bank: dataa?.data?.paymmentData?.bank,
                  card_id: dataa?.data?.paymmentData?.card_id,
                  upi: dataa?.data?.paymmentData?.upi,
                }
                
                await axios
                .post(`/api/v2/create-order`, order, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((res) => {
                  navigate("/order/success")
                  localStorage.removeItem("cartItems");
                });
              }
          } catch (error) {
            toast.error(error?.response?.data?.error)
          }
      },
      theme: {
          color: "#5f63b8"
      }
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
  }

  const cashOnDelivery = async () => {
    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
      .post(`/api/v2/create-order`, order, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        navigate("/order/success");
      });
  };

  return (
    <div className="payment__main">
      <div className="row">
        <div className="box payment__col">
          <div className="input__col">
            <div className="select__box" onClick={() => setSelected(1)}>
              <div className="round__box" >
                <span className={selected === 1 && "active"}></span>
              </div>
              <p>Pay Online</p>
              <button onClick={proceedToPayment} className="btn-main" style={{background: "green", marginLeft: "20px"}}>Pay</button>
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
                <p>₹ {orderData?.subTotalPrice}</p>
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
