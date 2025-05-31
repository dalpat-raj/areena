import React, { useEffect, useState } from "react";
import "./checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import CheckoutItem from "./CheckoutItem";
import { useNavigate } from "react-router";
import { loadUser } from "../../../actions/userAction";
import { useMemo } from "react";
import { getShippingRate } from "../../../service/shipRocket";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);  
  const dispatch = useDispatch()


  const [data, setData] = useState([]);
  const [couponCode, setCouponCode] = useState(null);
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  const [groupedByVendor, setGroupedByVendor] = useState({});
  const [totalShippingCharge, setTotalShippingCharge] = useState(0);

   const navigate = useNavigate();

  
  let subTotalPrice =
  data?.length !== 0
    ? data?.reduce((acc, item) => acc + item?.qty * item?.sellingPrice, 0)
    : cart?.reduce((acc, item) => acc + item?.qty * item?.sellingPrice, 0);

    const shippingPrice = totalShippingCharge;
    const totalPrice = couponCodeData
      ? ((subTotalPrice - discountPrice) + shippingPrice).toFixed(2)
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (formData) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const response = await axios.post('/api/v2/payment/create-razorpay-order', {
        amount: totalPrice * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `order_${Date.now()}`,
      });
      
      const {id: orderId } = response?.data?.order;

      const options = {
        key: `rzp_test_4npThNhKg8Db3u`,
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'Areenaa',
        description: 'Order Payment',
        order_id: orderId,
        handler: async function(response) {
          try {
            
            // Save order to database after successful payment
            const orderData = {
              userId: user ? user._id : null,
              buyer: formData,
              vendors: Object.entries(groupedByVendor).map(([vendorId, group]) => ({
                vendorId,
                items: group.items,
                subTotal: group.subTotal,
                shippingCharge: group.shippingCharge,
                totalPrice: group.totalPrice,
              })),
              totalAmount: totalPrice,
              shippingPrice: shippingPrice,
              discountPrice: discountPrice,
              paymentMethod: 'razorpay',
              razorpay_order_id: response?.razorpay_order_id,
            };

            const verification = await axios.post('/api/v2/payment/verify-payment', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderData
            });
            if(verification){
              toast.success('Payment Successful! Order placed.');
              
              navigate('/order/success');
            }else{
              toast.error(`payment failed! `)
            }
          } catch (error) {
            toast.error('Error saving order');
            console.error(error);
          }
        },
        prefill: {
          name: formData?.name,
          email: formData?.email,
          contact: formData?.phoneNumber,
        },
        theme: {
          color: '#333333',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Error processing payment');
    }
  };


  const onSubmit=async(formData)=>{
    await handleRazorpayPayment(formData);
  }

  useEffect(() => {
    setData([...cart]);
    dispatch(loadUser());
    const calculateShipping = async () => {
    const grouped = {};
    cart?.forEach(item => {
      const shopId = item?.shop?._id;
      if (!grouped[shopId]) {
        grouped[shopId] = {
          items: [],
          pickupPincode: item?.shop?.zipCode,
          subTotal: 0,
          totalWeight: 0,
          shippingCharge: 0,
          totalPrice: 0,
        };
      }
      grouped[shopId].items.push(item);
    });

    Object.values(grouped).forEach(group => {
      group.totalWeight = group.items.reduce((sum, item) =>
        sum + (((item?.dimension?.weightValue / 1000) || 0) * item?.qty), 0);
      group.subTotal = group.items.reduce((sum, item)=> sum + (item.sellingPrice * item?.qty) ,0)
    });

    let totalShipping = 0;

    for (const vendorId in grouped) {
      const vendor = grouped[vendorId];
      
      const data = await getShippingRate(
        vendor.pickupPincode,
        user?.address?.pincode, 
        vendor.totalWeight
      );
       
      vendor.etd = data?.estimated_delivery_days;
      vendor.shippingCharge = data?.rate;
      vendor.totalPrice = vendor.subTotal + data?.rate;

      totalShipping += data?.rate;
    }

    setGroupedByVendor(grouped);
    setTotalShippingCharge(totalShipping);
  };

  if (user && cart?.length > 0) {
    calculateShipping();
  }
  
  }, [cart]);

  return (
    <div className="checkout__main">
      <div className="row">
       
        <CheckoutForm onSubmit={onSubmit} user={user}/>
      
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