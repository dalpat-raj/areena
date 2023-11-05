import React, { useState } from "react";
import "./checkout.scss";
import { useSelector } from "react-redux";
import {MdKeyboardArrowDown} from "react-icons/md"
import { Country, State, City } from "country-state-city";
import { backend__url } from "../../../Server";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  
  const [country, setCountry] = useState(user?.addresses[0]?.country);
  const [state, setState] = useState(user?.addresses[0]?.state);
  const [city, setCity] = useState(user?.addresses[0]?.city);
  const [name, setName] = useState(user?.name);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [address1, setAddress1] = useState(user?.addresses[0]?.address1);
  const [address2, setAddress2] = useState(user?.addresses[0]?.address2);
  const [zipCode, setZipCode] = useState(user?.addresses[0]?.zipCode);
  
  const [chooseAddress, setChooseAddress ] = useState(false);
  const [couponCode, setCouponCode ] = useState(null);
  const [couponCodeData, setCouponCodeData ] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  const navigate = useNavigate();

  const handleChooseAddresses=(e)=>{
    const newAddress = user?.addresses.find((item)=>item.addressType === e.target.value)
    setCountry(newAddress?.country);
    setState(newAddress?.state);
    setCity(newAddress?.city);
    setAddress1(newAddress?.address1);
    setAddress2(newAddress?.address2);
    setZipCode(newAddress?.zipCode);
  }

  const subtotalPrice = cart.reduce((acc, item)=>acc + item.qty * item.sellingPrice, 0);

  const shippingPrice = subtotalPrice * 0.1;

  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData ? (subtotalPrice + shippingPrice - discountPercentage).toFixed(2) : (subtotalPrice + shippingPrice).toFixed(2);

  const checkCouponCodeValid=async(e)=>{
    e.preventDefault();
    const name = couponCode;
    await axios.get(`/api/v2/get-coupon-value/${name}`).then((res)=>{
      const productName = res.data?.couponCode?.selectedProducts;
      const couponCodeValue = res.data?.couponCode?.value;

      if(res.data.couponCode !== null){
        const isCouponValid = cart && cart.filter((item)=>item.name === productName);
        if(isCouponValid.length === 0){
          toast.error("coupon invalid for this product");
          setCouponCode("");
        }else{
          const eligiblePrice = isCouponValid.reduce((acc, item)=>acc + item.qty * item.sellingPrice,0);
          const discountPrices = ((eligiblePrice * couponCodeValue) / 100);
          setDiscountPrice(discountPrices)
          setCouponCodeData(res.data.couponCode);
        }
      }
      if(res.data.couponCode === null){
        toast.error("Coupon Code Doesn't Exists!")
        setCouponCode("");
      }
    }).catch((err)=>{
      toast.error(err.response.data.error.message)
      setCouponCode("");
    })
  }

  const countinueToPayment=()=>{
    if(country === "" || state === "" || city === "" || address2 === "" || zipCode === null){
      toast.error("please choose your delivery address!");
    }else{
      const shippingAddress = {
        country,
        state,
        city,
        address1,
        address2,
        zipCode,
      }
      const orderData = {
        cart,
        totalPrice,
        subtotalPrice,
        shippingPrice,
        discountPrice,
        shippingAddress,
        user,
      }
      // oreder item save on local storage 
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  }


  return (
    <div className="checkout__main">
      <div className="row">
        <div className="box address__col">
          <div className="heading">
            <h2>Shipping Address</h2>
            <div className="account">
              <p>
                Have an account? <Link to={"/login"}>Log in</Link>
              </p>
            </div>
          </div>

          <div className="input__main__container">
            <div className="box">
              {/* <label htmlFor="country">Choose Country</label> */}
              <select
                name=""
                id="country"
                value={country && country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">choose Your country</option>
                {Country &&
                  Country.getAllCountries().map((item, i) => (
                    <option key={i} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="input__row">
              <div className="box">
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="box">
                <input type="number" placeholder="Phone number" 
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="box">
              <input
                type="text"
                placeholder="Apartment, suit, etc. (optional)"
                value={address1}
                onChange={(e)=>setAddress1(e.target.value)}
              />
            </div>
            <div className="box">
              <input type="text" placeholder="Address" 
              value={address2}
              onChange={(e)=>setAddress2(e.target.value)}
              />
            </div>

            <div className="input__row">
              <div className="box">
                <select
                  name=""
                  id="country"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item, i) => (
                      <option key={i} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="box">
                <select
                  name=""
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">City</option>
                  {City &&
                    City.getCitiesOfState(country, state).map((item, i) => (
                      <option key={i} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="box">
                <input type="text" value={zipCode} placeholder="PIN code" onChange={(e)=>setZipCode(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="choose__address">
            <div className="saved__address" onClick={()=>setChooseAddress(!chooseAddress)}>
              <div className="open_saved_address">
                <p>Choose Addresses</p>
                <p className="icon"><MdKeyboardArrowDown/></p>
              </div>
              <div className="payment-btn">
                  <button onClick={countinueToPayment} className="btn-main">Countinue To Payment</button>
              </div>
            </div>

          {
            chooseAddress &&
            user?.addresses?.map((item, i)=>(
              <div className="address__box" key={i}>
                <input 
                  id={item?.city} 
                  type="checkbox"
                  value={item?.addressType}
                  onChange={handleChooseAddresses}  
                />
                <label htmlFor={item?.city}>{item?.addressType
                }</label>
              </div>
            ))
          }
          </div>


        </div>

        <div className="box coupon__col">
          <div className="cart__products">
            {cart &&
              cart.map((item, i) => (
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
                <input type="text" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} placeholder="Discount Code" />
                <button onClick={checkCouponCodeValid} type="submit" className="btn-main">Apply</button>
              </div>
            </form>

            <div className="price">
              <div className="subtotal row">
                <p>Subtotal</p>
                <p>₹ {subtotalPrice && subtotalPrice}</p>
              </div>
              <div className="shipping row">
                <p>Shipping </p>
                <p className="shipping__price">₹ {shippingPrice && shippingPrice.toLocaleString()}</p>
              </div>
              <div className="estimate__tax row">
                <p>Estimate taxes </p>
                <p>₹ 0.0</p>
              </div>
              <div className="discount row">
                <p>Discount</p>
                <p>₹ {discountPrice ? discountPrice.toLocaleString() : "0.0"}</p>
              </div>
              <div className="total row">
                <p className="total__text">Total</p>
                <p className="total__price">
                  ₹ {totalPrice && totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
