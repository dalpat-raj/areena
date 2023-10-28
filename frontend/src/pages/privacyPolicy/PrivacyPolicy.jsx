import React from 'react'
import { Link } from 'react-router-dom'
import "./privacy.scss";
import Footer from '../../components/layout/footer/Footer';

const PrivacyPolicy = () => {
  return (
    <>
    <div className='privacy container'>
        <h2>AREENA - Privacy Policy</h2>
        <span>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from <Link to={"/https://areena.com"}>http://areena.com</Link></span>
        <p>WHAT PERSONAL INFORMATION WE COLLECT</p>
        <span>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</span><br/><br/>
        <span>Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically collected information as Device Information.</span><br/><br/>
        <span>We collect Device Information using the following technologies:</span>
        <li><p>Cookies</p> <span>are data files that are placed on your device or computer and often include an anonymous unique identifier.</span></li>
        <li><p>Log files</p><span> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</span></li>
        <span>Mention all other tracking tools and/or technologies being used by your website.</span><br/><br/>
        <span>Also, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers Mention all types of accepted payments, email address, and phone number. This is called <b>Order Information.</b></span><br/><br/>
        <span>Make sure you mention all other information that you collect.</span><br/><br/>
        <span>By <b>Personal Information</b> in this Privacy Policy, we are talking both about Device Information and Order Information.</span>
        <p>HOW DO WE USE YOUR PERSONAL INFORMATION</p>
        <span>We use the Order Information that we collect generally to fulfil any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</span>
        <span>Additionally, we use this Order Information to:</span>
        <li><span>Communicate with you.</span></li>
        <li><span>Screen our orders for potential risk or fraud.</span></li>
        <li><span>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</span></li>
        <span>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site.</span>
        <p>SHARING YOUR PERSONAL INFORMATION</p>
        <span>We share your Personal Information with third parties to help us use your Personal Information, as described above.</span>
        <span>We also use Google Analytics to help us understand how our customers use Areena.com <u>How Google uses your Personal Information.</u></span><br/><br/>
        <span>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful requests for information we receive, or to otherwise protect our rights.</span>
        <p>YOUR RIGHTS</p>
        <span>If you are a European resident, you have the right to access the personal information we hold about you and to ask that your personal information is corrected, updated, or deleted. If you would like to exercise this right, please contact us.</span><br/><br/>
        <span>Additionally, if you are a European resident we note that we are processing your information in order to fulfil contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.
Please note that your information will be transferred outside of Europe, including to Canada and the United States.</span>
    <p>DATA RETENTION</p>
    <span>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</span>
    <p>MINORS</p>
    <span>The Site is not intended for individuals under the age of (CLEARLY MENTION AGE).</span>
    <p>CHANGES</p>
    <span>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</span><br/><br/>
    <span>If you have questions and/or require more information, do not hesitate to contact us <b>(Add Relevant contact information).</b></span>
    </div>
    <Footer/>
    </>
  )
}

export default PrivacyPolicy