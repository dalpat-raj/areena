import React, { useEffect, useState } from "react";
import "./checkout.scss";
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { backend__url } from "../../../Server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [country, setCountry] = useState(
    user?.addresses[0]?.country ? user?.addresses[0]?.country : "India"
  );
  const [state, setState] = useState(
    user?.addresses[0]?.state ? user?.addresses[0]?.state : ""
  );
  const [city, setCity] = useState(
    user?.addresses[0]?.city ? user?.addresses[0]?.city : ""
  );
  const [name, setName] = useState(user?.name ? user?.name : "");
  const [phoneNumber, setPhoneNumber] = useState(
    user?.phoneNumber ? user?.phoneNumber : ""
  );
  const [address1, setAddress1] = useState(
    user?.addresses[0]?.address1 ? user?.addresses[0]?.address1 : ""
  );
  const [address2, setAddress2] = useState(user?.addresses[0]?.address2);
  const [zipCode, setZipCode] = useState(
    user?.addresses[0]?.zipCode ? user?.addresses[0]?.zipCode : null
  );

  const [chooseAddress, setChooseAddress] = useState(false);
  const [couponCode, setCouponCode] = useState(null);
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [data, setData] = useState([]);
  
  const navigate = useNavigate();

  const handleChooseAddresses = (e) => {
    const newAddress = user?.addresses.find(
      (item) => item.addressType === e.target.value
    );
    setCountry(newAddress?.country);
    setState(newAddress?.state);
    setCity(newAddress?.city);
    setAddress1(newAddress?.address1);
    setAddress2(newAddress?.address2);
    setZipCode(newAddress?.zipCode);
  };

  let subTotalPrice =
    data?.length !== 0
      ? data?.reduce((acc, item) => acc + item?.qty * item?.sellingPrice, 0)
      : cart?.reduce((acc, item) => acc + item?.qty * item?.sellingPrice, 0);

      const shippingPrice = subTotalPrice < 1000 ? ((subTotalPrice / 100) * 5) : 0;

  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shippingPrice - discountPercentage).toFixed(2)
    : (subTotalPrice + shippingPrice).toFixed(2);

  const checkCouponCodeValid = async (e) => {
    e.preventDefault();
    const name = couponCode;
    await axios
      .get(`/api/v2/get-coupon-value/${name}`)
      .then((res) => {
        const productName = res.data?.couponCode?.selectedProducts;
        const couponCodeValue = res.data?.couponCode?.value;

        if (res.data.couponCode !== null) {
          const isCouponValid =
            cart && cart.filter((item) => item.name === productName);
          if (isCouponValid.length === 0) {
            toast.error("coupon invalid for this product");
            setCouponCode("");
          } else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.qty * item.sellingPrice,
              0
            );
            const discountPrices = (eligiblePrice * couponCodeValue) / 100;
            setDiscountPrice(discountPrices);
            setCouponCodeData(res.data.couponCode);
          }
        }
        if (res.data.couponCode === null) {
          toast.error("Coupon Code Doesn't Exists!");
          setCouponCode("");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
        setCouponCode("");
      });
  };

  const countinueToPayment = () => {
    if (
      country === "" ||
      state === "" ||
      city === "" ||
      address2 === "" ||
      zipCode === null
    ) {
      toast.error("please choose your delivery address!");
    } else {
      const shippingAddress = {
        country,
        state,
        city,
        address1,
        address2,
        zipCode,
      };
      const orderData = {
        data,
        totalPrice,
        subTotalPrice,
        shippingPrice,
        discountPrice,
        shippingAddress,
        user,
      };

      if (data?.length !== 0) {
        // oreder item save on local storage
        localStorage.setItem("latestOrder", JSON.stringify(orderData));
        navigate("/payment");
      } else {
        alert("Product Not Deliver With Your Address");
      }
    }
  };

  useEffect(()=>{
    if(!user)
      navigate('/login')
  },[user, navigate])

  useEffect(() => {
    setData(
      cart?.filter((item) =>
        item?.shop?.pinCode.find((item) => +item === +zipCode)
      )
    );
  }, [cart, zipCode]);
  
  return (
    <div className="checkout__main">
      <div className="row">
        <div className="box address__col">
          <div className="heading">
            <h2>Shipping Address</h2>
            <div className="account">
            </div>
          </div>

          <div className="input__main__container">
            <div className="box">
              <input type="text" value={country} disabled />
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
                <input
                  type="number"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="box">
              <input
                type="text"
                placeholder="Apartment, suit, etc. (optional)"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            <div className="box">
              <input
                type="text"
                placeholder="Address"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            <div className="input__row">
              <div className="box">
                <input
                  type="text"
                  name="state"
                  value={state}
                  placeholder="State"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="box">
                <input
                  type="text"
                  name="state"
                  value={city}
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="box">
                <input
                  type="text"
                  value={zipCode}
                  placeholder="PIN code"
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="choose__address">
            <div
              className="saved__address"
              onClick={() => setChooseAddress(!chooseAddress)}
            >
              <div className="open_saved_address">
                <p>Choose Addresses</p>
                <p className="icon">
                  <MdKeyboardArrowDown />
                </p>
              </div>
              <div className="payment-btn">
                <button onClick={countinueToPayment} className="btn-main">
                  Countinue To Payment
                </button>
              </div>
            </div>

            {chooseAddress &&
              user?.addresses?.map((item, i) => (
                <div className="address__box" key={i}>
                  <input
                    id={item?.city}
                    type="checkbox"
                    value={item?.addressType}
                    onChange={handleChooseAddresses}
                  />
                  <label htmlFor={item?.city}>{item?.addressType}</label>
                </div>
              ))}
          </div>
        </div>

        <div className="box coupon__col">
          <div className="cart__products">
            {data?.length !== 0 ? <h4><span>note:-</span> only this products is deliverable on your pin Code</h4> : null}
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
      </div>
    </div>
  );
};

export default Checkout;
