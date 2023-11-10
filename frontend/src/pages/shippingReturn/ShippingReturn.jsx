import React, { useEffect } from 'react'
import "./shippingReturn.scss";
import Footer from '../../components/layout/footer/Footer'
import { Helmet } from "react-helmet";

const ShippingReturn = () => {
    useEffect(()=>{
        window.scrollTo(0, 0); 
    },[])
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>FREE SHIPPING when you spend over ₹1000</title>
        <meta
          name="description"
          content="The shipping process of our company is approximately 3-4 days or in some areas it may take 6-7 days for us to deliver."
        />
        <link rel="canonical" href="https://areenaa.in/shipping-return" />
      </Helmet>
    <div className="shipping__return__main container">
        <h2 className="container__heading">
        Shipping policy
        </h2>
        <p>FREE STANDARD SHIPPING when you spend over ₹1000</p>
        <p>Orders under ₹1000 are a flat rate charge of 9% for Shipping.</p>

        <h4>Delivery Time:</h4>
        <p>The shipping process of our company is approximately 3-4 days or in some areas it may take 6-7 days for us to deliver. If within 7 days your products have not reached your place then you can contact us https://areenaa.in/contact</p>

        <h4>Processing Time:</h4>
        <li>If your order is placed before 1pm AEST on a weekday, your order will be sent out to you the same day.</li>
        <li>For orders placed over the weekend, your order will be sent out to you Monday afternoon</li>
        <li>For orders placed on a Public Holiday, your order will be sent out to you in the afternoon of the next business day.</li>
        <li>During busier sale and gifting periods same day dispatch is not guaranteed. We’ll keep you posted with a shipping confirmation email as soon as your order is on its way. If you have a query about your delivery at any time, contact us at https://areenaa.in/contact</li>
        <p>Please keep an eye out for your shipping confirmation email, which will be sent to you in a separate email.</p>
        <p>If you believe you have not received your shipping confirmation email, please check your spam/junk folders before emailing us :)</p>

        <h4>INTERNATIONAL SHIPPING </h4>
        <p>International shipping not availble</p>

        <h4>ADDITIONAL INFORMATION</h4>
        <p>Areenaa is not responsible for lost or stolen packages or orders delayed in transit. The above timeframes are not guaranteed and delays may occur beyond our control.</p>
        <p>If you have incorrectly entered the nominated delivery address on your order, please contact our friendly customer service team within one hour of placing your order to ensure we can change the delivery address accordingly.</p>
        <p></p>
    </div>
    <Footer/>
    </>
  )
}

export default ShippingReturn