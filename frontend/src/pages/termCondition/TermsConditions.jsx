import React, { useEffect } from "react";
import Footer from "../../components/layout/footer/Footer";
import "./termCondition.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Terms & Conditions</title>
        <meta
          name="description"
          content="please read our terms and conditions carefully than you jump to shopping"
        />
        <link rel="canonical" href="https://areenaa.in/terms-conditions" />
      </Helmet>
      <div className="terms__conditions__main container">
        <h2 className="container__heading">Terms & Conditions</h2>
        <p>
          Please read these terms and conditions "Terms And Conditions"
          carefully before accessing or using the Platform defined hereinafter.
          These Terms along with the Privacy Policy published on the Platform
          Privacy Policy and other policies as may be
          notified/displayed/published on the Platform constitutes the contract
          between the Users of this Platform and the Company collectively
          Agreement. By use of the Platform, Users agree to be bound by these
          Agreement as posted on the Platform from time to time.
        </p>

        <h4>personl information</h4>
        <p>
          Your submission of personal information through the store is governed
          by our Privacy Policy, which can be viewed here:
          https://vogal-demo.myshopify.com/policies/privacy-policy
        </p>

        <h4>ACCOUNT REGISTRATION, SUSPENSION AND TERMINATION</h4>
        <p>
          ompany does not permit Users to avail the Services on the Platform
          without prior registration. Users may access the Application by
          registering to create an account and become a member. The membership
          is limited for the purpose of buying or selling products, is subject
          to this Agreement and strictly not transferable.
        </p>
        <p>
          The Services on the Platform shall be availed by User(s) who can form
          legally binding contracts under Indian Contract Act, 1872 and are at
          least eighteen (18) years of age. The Company reserves the right to
          terminate the User’s account and/or deny access to the Platform if it
          is brought to the Company’s notice or if it is discovered that the
          User does not meet the conditions herein. Users accessing or using the
          Platform represent and warrant that they have the right to access or
          use the Platform.
        </p>

        <h4>GENERAL CONDITIONS</h4>
        <p>
          We reserve the right to refuse Service to anyone for any reason at any
          time. You understand that your content (not including credit card
          information), may be transferred unencrypted and involve (a)
          transmissions over various networks; and (b) changes to conform and
          adapt to technical requirements of connecting networks or devices.
          Credit card information is always encrypted during transfer over
          networks. You agree not to reproduce, duplicate, copy, sell, resell or
          exploit any portion of the Service, use of the Service, or access to
          the Service or any contact on the website through which the Service is
          provided, without express written permission by us. The headings used
          in this agreement are included for convenience only and will not limit
          or otherwise affect these Terms.
        </p>
        <h4>ONLINE STORE TERMS</h4>
        <p>
          By agreeing to these Terms of Service, you represent that you are at
          least the age of majority in your state or province of residence, or
          that you are the age of majority in your state or province of
          residence and you have given us your consent to allow any of your
          minor dependents to use this site. You may not use our products for
          any illegal or unauthorized purpose nor may you, in the use of the
          Service, violate any laws in your jurisdiction (including but not
          limited to copyright laws). You must not transmit any worms or viruses
          or any code of a destructive nature. A breach or violation of any of
          the Terms will result in an immediate termination of your Services.
        </p>

        <h4>Products on Platform provided by the Company</h4>
        <p>
          Not all information on the Platform is provided by Company. From time
          to time, Users who are Suppliers provide information relating to the
          products proposed to be sold by them and are hence responsible for the
          same. In this connection, Suppliers undertake that all such
          information shall be accurate in all respects. Suppliers are
          discouraged from and should not exaggerate or overemphasise the
          attributes of such products so as to mislead Users in any manner.
        </p>
        <p>
          Company reserves the right, but has no obligation, to monitor the
          materials posted on Platform. Company, however, has the right to
          remove or edit any content that in its sole discretion violates, or is
          alleged to violate, any applicable law or the spirit of these Terms.
          In no event shall Company assume any responsibility or liability for
          any content posted or for any claims, damages or losses resulting from
          use of content and/or appearance of content on Platform.
        </p>
        <p>
          Suppliers take sole responsibility for the correctness of the details
          pertaining to specifics (such as quality, value, saleability, etc.) of
          the products proposed to be sold or offered to be sold or purchased on
          Platform. Company does not implicitly or explicitly support or endorse
          the sale or purchase of any products nor provide any
          warrantee/guarantee of the products sold to Users, and in no event
          shall such products be the responsibility of Company. Company does not
          represent or warrant that the information available on Platform will
          be correct, accurate or otherwise reliabl
        </p>

        <h4>USER Review, FEEDBACK AND OTHER SUBMISSIONS</h4>
        <p>
          f, at our request, you send certain specific submissions (for example
          contest entries) or without a request from us, you send creative
          ideas, suggestions, proposals, plans, or other materials, whether
          online, by email, by postal mail, or otherwise (collectively,
          'comments'), you agree that we may, at any time, without restriction,
          edit, copy, publish, distribute, translate and otherwise use in any
          medium any comments that you forward to us. We are and shall be under
          no obligation (1) to maintain any comments in confidence; (2) to pay
          compensation for any comments; or (3) to respond to any comments. We
          may, but have no obligation to, monitor, edit or remove content that
          we determine in our sole discretion to be unlawful, offensive,
          threatening, libelous, defamatory, pornographic, obscene or otherwise
          objectionable or violates any party’s intellectual property or these
          Terms of Service. You agree that your comments will not violate any
          right of any third-party, including copyright, trademark, privacy,
          personality or other personal or proprietary right. You further agree
          that your comments will not contain libelous or otherwise unlawful,
          abusive or obscene material, or contain any computer virus or other
          malware that could in any way affect the operation of the Service or
          any related website. You may not use a false e‑mail address, pretend
          to be someone other than yourself, or otherwise mislead us or
          third-parties as to the origin of any comments. You are solely
          responsible for any comments you make and their accuracy. We take no
          responsibility and assume no liability for any comments posted by you
          or any third-party.
        </p>

        <h4>THIRD-PARTY LINKS & website</h4>
        <li>
          Company collects various types of information, some information is
          non-personal information and some is personal information.
        </li>
        <li>
          All information about Users that are collected, stored, or transmitted
          in any way on Platform is processed for facilitating various
          operations on Platform, including registration, order placement,
          listing, or payments.
        </li>
        <li>
          For a more comprehensive understanding, Users are encouraged to view
          the Platform’s Privacy Policy available on the Platform
        </li>
        <p>
          The Company may provide User with access to third-party tools over the
          Platform which Company neither monitors nor has any control over. User
          acknowledges and agrees that access to such tools is on an 'as is' and
          'as available' basis, without any warranties, representations or
          conditions of any kind and without any endorsement by Company. Company
          shall have no liability whatsoever arising from or relating to your
          use of optional third-party tools.
        </p>
        <p>
          Certain content or products available via the Platform may include
          materials from third parties. Third-party links on the
          Application/Platform may direct User to third-party websites that are
          not affiliated with the Company. The Company is not responsible for
          examining or evaluating the content or accuracy and does not warrant
          and will not have any liability or responsibility for any third-party
          materials or websites, or for any other materials, products, or
          services of third parties.
        </p>

        <h4>ACCURACY OF BILLING AND ACCOUNT INFORMATION</h4>
        <p>
          We reserve the right to refuse any order you place with us. We may, in
          our sole discretion, limit or cancel quantities purchased per person,
          per household or per order. These restrictions may include orders
          placed by or under the same customer account, the same credit card,
          and/or orders that use the same billing and/or shipping address. In
          the event that we make a change to or cancel an order, we may attempt
          to notify you by contacting the e‑mail and/or billing address/phone
          number provided at the time the order was made. We reserve the right
          to limit or prohibit orders that, in our sole judgment, appear to be
          placed by dealers, resellers or distributors. You agree to provide
          current, complete and accurate purchase and account information for
          all purchases made at our store. You agree to promptly update your
          account and other information, including your email address and credit
          card numbers and expiration dates, so that we can complete your
          transactions and contact you as needed. For more details, please
          review our Refund Policy: https://areenaa.in/refund-policy
        </p>

        <h5>
          Note :-
          <p>
            These Terms of Service and any separate agreements whereby we
            provide you Services shall be governed by and construed in
            accordance with the laws of India.
          </p>
        </h5>

        <h4>CONTACT INFORMATION</h4>
        <p>
          Questions about the Terms of Service should be sent to us at
          <Link to={"https://areenaa.in/contact"}>
            {" "}
            https://areenaa.in/contact
          </Link>{" "}
          Our contact information is posted below:
        </p>

        <h6>Areenaa.in</h6>
        <span>Tokra Street Maliwas, 307511</span>
        <span>Just near at Indane gas office</span>
        <span>AreenaEcom@gmail.com</span>
        <span>+91 0000 0000 00</span>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
