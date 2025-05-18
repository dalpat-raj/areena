import React, { useEffect, useState } from "react";
import "./payment.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";


const Payment = () => {
  const { user } = useSelector((state) => state.user);

  const [orderData, setOrderData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);
  console.log(orderData);
  

  return (
    <div className="payment__main">
      <div className="row">
        <div className="box payment__col">
          <div className="input__col">
            {/* razorpay page add  */}

          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Payment;
//  <div className="box coupon__col">
//           <div className="cart__products">
//             {orderData?.cart &&
//               orderData?.cart.map((item, i) => (
//                 <div className="product__row" key={i}>
//                   <div className="col img__row">
//                     <div className="img">
//                       <img
//                         src={`${backend__url}/${item?.images[0]}`}
//                         alt="df"
//                       />
//                       <span className="product__qty">{item?.qty}</span>
//                     </div>
//                     <div className="product__name">
//                       <p>{item?.name}</p>
//                       <span>
//                         {item?.size} {`/ ${item?.color}`}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="col col_price">
//                     <p>₹ {item?.sellingPrice * item?.qty}</p>
//                   </div>
//                 </div>
//               ))}

//             <form>
//               <div className="discount__code">
//                 <input type="text" placeholder="Coupon Code" />
//                 <button type="submit" className="btn-main">
//                   Apply
//                 </button>
//               </div>
//             </form>

//             <div className="price">
//               <div className="subtotal row">
//                 <p>Subtotal</p>
//                 <p>₹ {orderData?.subTotalPrice}</p>
//               </div>
//               <div className="shipping row">
//                 <p>Shipping </p>
//                 <p className="shipping__price">
//                   ₹ {orderData?.shippingPrice?.toLocaleString()}
//                 </p>
//               </div>
//               <div className="estimate__tax row">
//                 <p>Estimate taxes </p>
//                 <p>₹ 0.0</p>
//               </div>
//               <div className="discount row">
//                 <p>Discount</p>
//                 <p>
//                   ₹{" "}
//                   {orderData?.discountPrice
//                     ? orderData?.discountPrice?.toLocaleString()
//                     : "0.0"}
//                 </p>
//               </div>
//               <div className="total row">
//                 <p className="total__text">Total</p>
//                 <p className="total__price">₹ {orderData?.totalPrice}</p>
//               </div>
//             </div>
//           </div>
//         </div>