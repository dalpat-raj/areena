import React, { useEffect, useState } from "react";
import "./checkout.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import CheckoutItem from "./CheckoutItem";
import { useNavigate } from "react-router";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);  

  const [data, setData] = useState([]);
  const [couponCode, setCouponCode] = useState(null);
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [address, setAddress] = useState({
    name: user?.name ? user?.name : "",
    email: user?.email ? user?.email : "",
    phoneNumber: user?.phoneNumber ? user?.phoneNumber : "",
    address1: user?.address?.address1 ? user?.address?.address1 : "",
    address2: user?.address?.address2 ? user?.address?.address2 : "",
    city: user?.address?.city ? user?.address?.city : "",
    state: user?.address?.state ? user?.address?.state : "",
    country: user?.address?.country ? user?.address?.country : "India",
    pincode: user?.address?.pincode ? user?.address?.pincode : null,
  })

  const navigate = useNavigate();


  let subTotalPrice =
  data?.length !== 0
    ? data?.reduce((acc, item) => acc + item?.qty * item?.sellingPrice, 0)
    : cart?.reduce((acc, item) => acc + item?.qty * item?.sellingPrice, 0);

    const shippingPrice = subTotalPrice < 1000 ? ((subTotalPrice / 100) * 5) : 0;
    const discountPercentage = couponCodeData ? discountPrice : "";
    const totalPrice = couponCodeData
      ? ((subTotalPrice - discountPercentage) + shippingPrice).toFixed(2)
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

  const Add__Address=(data)=>{
    console.log(data);
  }

  useEffect(() => {
    if (!user) {
      toast.info("Please login to continue");
      navigate("/login");
    }
    setData([...cart]);
  }, [cart, user, navigate]);
  
  return (
    <div className="checkout__main">
      <div className="row">
       
        <CheckoutForm onSubmit={Add__Address} user={user}/>
      
        <CheckoutItem 
          data={data} 
          cart={cart}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          checkCouponCodeValid={checkCouponCodeValid}
          discountPrice={discountPrice}
          shippingPrice={shippingPrice}
          subTotalPrice={subTotalPrice}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default Checkout;
