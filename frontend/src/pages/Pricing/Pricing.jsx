import React from "react";
import "./pricing.scss";
import Footer from "../../components/layout/footer/Footer";

const Pricing = () => {
  return (
    <>
      <div className="pricing">
        <h2>Pricing</h2>
        <h4>How do I pay for a Areenaa purchase?</h4>
        <p>
          Areenaa offers you multiple payment methods. Whatever your online mode
          of payment, you can rest assured that Areenaa's trusted payment
          gateway partners use secure encryption technology to keep your
          transaction details confidential at all times. You may use Internet
          Banking, Cash on Delivery to make your purchase.
        </p>
        <p>
          Areenaa also accepts payments made using Visa, MasterCard, Maestro and
          credit/debit cards in India.
        </p>
        <h4>
          Are there any hidden charges when I make a
          purchase on areenaa?
        </h4>
        <p>
          There are NO hidden charges when you make a purchase on Areenaa. The
          prices listed for all the items are final and all-inclusive. The price
          you see on the product page is exactly what you pay. Delivery charges
          may be extra depending on the seller policy. Please check individual
          seller for the same. In case of seller WS Retail, the ₹50 delivery
          charge is waived off on orders worth ₹500 and over.
        </p>
        <h4>What is Cash on Delivery?</h4>
        <p>
          If you are not comfortable making an online payment on Areenaa.com,
          you can opt for the Cash on Delivery (C-o-D) payment method instead.
          With C-o-D you can pay in cash at the time of actual delivery of the
          product at your doorstep, without requiring you to make any advance
          payment online.
        </p>
        <p>
          The maximum order value for a Cash on Delivery (C-o-D) payment is
          ₹5000. It is strictly a cash-only payment method.
          store credit cannot be used for C-o-D orders. Foreign currency cannot
          be used to make a C-o-D payment. Only Indian Rupees accepted.
        </p>
        <h4>How do I pay using a credit/debit card?</h4>
        <p>
          We accept payments made by credit/debit cards issued in India.
        </p>
        <h4>Credit cards</h4>
        <p>
          We accept payments made using Visa, MasterCard credit cards
        </p>
        .<h4>Debit cards</h4>
        <p>
          We accept payments made using Visa, MasterCard and debit
          cards.
        </p>
        <p>
          To pay using your debit card at checkout, you will need your card
          number, expiry date (optional for Maestro cards), three-digit CVV
          number (optional for Maestro cards). You will then be redirected to
          your bank's secure page for entering your online password (issued by
          your bank) to complete the payment.
        </p>
        <p>
          Internationally issued credit/debit cards cannot be used for Flyte,
          Wallet and eGV payments/top-u
        </p>
        <h4>Is it safe to use my credit/debit card on Areenaa?</h4>
        <p>
          Your online transaction on Areenaa is secure with the highest levels
          of transaction security currently available on the Internet. Areenaa
          uses 256-bit encryption technology to protect your card information
          while securely transmitting it to the respective banks for payment
          processing.
        </p>
        <p>
          All credit card and debit card payments on Areenaa are processed
          through secure and trusted payment gateways managed by leading banks.
          Banks now use the 3D Secure password service for online transactions,
          providing an additional layer of security through identity
          verification.
        </p>
        <h4>What steps does Areenaa take to prevent card fraud?</h4>
        <p>
          Areenaa realizes the importance of a strong fraud detection and
          resolution capability. We and our online payments partners monitor
          transactions continuously for suspicious activity and flag potentially
          fraudulent transactions for manual verification by our team.
        </p>
        <p>
          In the rarest of rare cases, when our team is unable to rule out the
          possibility of fraud categorically, the transaction is kept on hold,
          and the customer is requested to provide identity documents. The ID
          documents help us ensure that the purchases were indeed made by a
          genuine card holder. We apologise for any inconvenience that may be
          caused to customers and request them to bear with us in the larger
          interest of ensuring a safe and secure environment for online
          transactions.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
