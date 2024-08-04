import React, { useEffect } from 'react'
import "./RefundPolicy.scss";
import Footer from '../../components/layout/footer/Footer'
import { Helmet } from 'react-helmet';

const RefundPolicy = () => {

    useEffect(()=>{
        window.scrollTo(0, 0); 
    },[])

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Areenaa EnterPrise:- Cancllation & Refund Policy</title>
        <meta
          name="description"
          content="We have a 7-day return policy, which means you have 7 days after receiving your item to request a refund."
        />
        <link rel="canonical" href="https://areenaa.in/cancllation-refund-policy" />
      </Helmet>
    <div className="refund__policy__main container">
    <h2 className="container__heading">
        Refund Policy
    </h2>
    <div className="refund__content">
        <p>We have a 7-day return policy, which means you have 7 days after receiving your item to request a refund.</p>
        <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase</p>
        <p>To start a return, you can contact us at https://areenaa.in/contact Please note that returns will need to be sent to the following address: 478 Mali Was, Tokra Road Reodar, Sirodi - Sirohi (Rajsthan) - 307511</p>
        <p>If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>
        <p>You can always contact us for any return question at https://areenaa.in/contact</p>

        <h4>Damages and issues</h4>
        <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>

        <h4>Exceptions / non-returnable items</h4>
        <p>Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.</p>

        <h4>Exchanges</h4>
        <p>No exchange any products</p>
        
        <h4>Refunds</h4>
        <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
If more than 15 business days have passed since we’ve approved your return, please contact us at https://areenaa.in/contact</p>
    </div>

    </div>
    <Footer/>
    </>
  )
}

export default RefundPolicy