import React, { useEffect, useState } from "react";
import { backend__url } from '../../../Server'

const CheckoutItem = ({data, cart, couponCode, setCouponCode, checkCouponCodeValid, discountPrice, shippingPrice, subTotalPrice, totalPrice}) => {
        
  return (
    <div className="box coupon__col">
        <div className="cart__products">
        {data?.length !== 0
            ? data?.map((item, i) => (
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
                    <p>{item.title}</p>
                    {
                        (item?.size || item?.color) && (
                            <span>
                                {item?.size} {`/ ${item?.color}`}
                            </span>
                        )
                    }
                    </div>
                </div>
                <div className="col col_price">
                    <p>₹ {item?.sellingPrice * item?.qty}</p>
                </div>
                </div>
            ))
            : cart?.map((item, i) => (
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
            <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Discount Code"
            />
            <button
                onClick={checkCouponCodeValid}
                type="submit"
                className="btn-main"
            >
                Apply
            </button>
            </div>
        </form>

        <div className="price">
            <div className="subtotal row">
            <p>Subtotal</p>
            <p>₹ {subTotalPrice && subTotalPrice}</p>
            </div>
            <div className="shipping row">
            <p>Shipping </p>
            <p className="shipping__price">
                ₹ {shippingPrice && shippingPrice.toLocaleString()}
            </p>
            </div>
            <div className="estimate__tax row">
            <p>Estimate taxes </p>
            <p>₹ 0.0</p>
            </div>
            <div className="discount row">
            <p>Discount</p>
            <p>
                ₹ {discountPrice ? discountPrice.toLocaleString() : "0.0"}
            </p>
            </div>
            <div className="total row">
            <p className="total__text">Total</p>
            <p className="total__price">₹ {totalPrice && totalPrice}</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CheckoutItem