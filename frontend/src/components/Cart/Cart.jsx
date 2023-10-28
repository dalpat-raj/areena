import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  documentTextOutline,
  giftOutline,
  pricetagOutline,
} from "ionicons/icons";
import { BsCartX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../actions/cart";

const Cart = ({ setCartComponent }) => {
  const { cart } = useSelector((state) => state.cart);

  const [messageComponent, setMessageComponent] = useState(false);
  const [couponComponent, setCouponComponent] = useState(false);
  const [giftComponent, setGiftComponent] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ViewCartPage = () => {
    // setSearchComponent(false);
    navigate("/cart");
  };

  const viewCheckoutHandler = () => {
    setCartComponent(false);
    navigate("/checkout");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.sellingPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="cart__main">
      <div className="free__shipping">
        {/* <LocalShippingOutlined /> */}
        <p>
          SPENT <b>$129.00</b> MORE TO GET FREE SHIPPING
        </p>
      </div>

      <div className="row cart__item__card">
        {cart.length >= 1 ? (
          cart &&
          cart.map((item, i) => (
            <CartItemCard
              item={item}
              key={i}
              quantityChangeHandler={quantityChangeHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))
        ) : (
          <div className="cart__empty">
            <BsCartX />
          </div>
        )}
      </div>

      <div className="cart__service__bottom">
        <div className="cart__service">
          <div className="row">
            <div className="box">
              <IonIcon
                icon={documentTextOutline}
                onClick={() => setMessageComponent(true)}
              />
              <div
                className={
                  messageComponent
                    ? "giftComponentView active coupon__code"
                    : "giftComponentView"
                }
              >
                <span>Currently not available !</span>
                <div className="coupon_code_header">
                  <IonIcon icon={documentTextOutline} />
                  <p>Add Special instructions for your order</p>
                </div>
                <p>
                  Add a Gift to your order, For <br /> $5.00{" "}
                </p>
                <input type="text" readOnly />
                <div className="btn_group">
                  <button className="btn-main">SAVE</button>
                  <button
                    onClick={() => setMessageComponent(false)}
                    className="btn-sec"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
              <p
                onClick={() => setMessageComponent(false)}
                className={messageComponent ? "overlay" : ""}
              ></p>
            </div>

            <div className="box">
              <IonIcon
                icon={pricetagOutline}
                onClick={() => setCouponComponent(true)}
              />
              <div
                className={
                  couponComponent
                    ? "giftComponentView coupon__code active"
                    : "giftComponentView"
                }
              >
                <span>Currently not available !</span>
                <div className="coupon_code_header">
                  <IonIcon icon={pricetagOutline} />
                  <h2>Coupon Code</h2>
                </div>
                <p>Coupon code will be applied on the checkout page</p>
                <input type="text" readOnly />
                <div className="btn_group">
                  <button className="btn-main">SAVE</button>
                  <button
                    onClick={() => setCouponComponent(false)}
                    className="btn-sec"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
              <p
                onClick={() => setCouponComponent(false)}
                className={couponComponent ? "overlay" : ""}
              ></p>
            </div>

            <div className="box">
              <IonIcon
                icon={giftOutline}
                onClick={() => setGiftComponent(true)}
              />
              <div
                className={
                  giftComponent
                    ? "giftComponentView active"
                    : "giftComponentView"
                }
              >
                <span>Currently not available !</span>
                <p>
                  Add a Gift to your order, For <br /> $5.00{" "}
                </p>
                <div className="btn_group">
                  <button className="btn-main">ADD A GIFT WRAP</button>
                  <button
                    onClick={() => setGiftComponent(false)}
                    className="btn-sec"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
              <p
                onClick={() => setGiftComponent(false)}
                className={giftComponent ? "overlay" : ""}
              ></p>
            </div>
          </div>
        </div>

        <div className="cart__total">
          <div className="row">
            <h2>Total</h2>
            <h2>$ {totalPrice}</h2>
          </div>
          <p>Taxes and shipping calculated at checkout</p>
          <div className="btn_group">
            {cart?.length !== 0 && (
              <>
                <button className="btn-main" onClick={viewCheckoutHandler}>
                  PROCESS TO CHECKOUT
                </button>
                <button onClick={() => ViewCartPage()} className="btn-sec">
                  VIEW CART
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
