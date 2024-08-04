import React, { useState } from "react";
import "./contact.scss";
import { Link } from "react-router-dom";
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import Footer from "../../components/layout/footer/Footer";
import { useSelector } from "react-redux";
import {Helmet} from "react-helmet";

const Contact = () => {
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="contact__main">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Contact-us</title>
          <meta name="description" content="areenaa.in if you are facing any problem so you can contact our team areena" />
          <link rel="canonical" href="https://areenaa.in/contact-us" />
        </Helmet>
        <div className="contact__back"></div>
        <div className="container">
          <div className="contact__row">
            <div className="form__box">
              <h2 className="form__heading">Drop Us A Line</h2>
              <form onSubmit={handleSubmit}>
                <div className="input__box__2">
                  <div className="input__box">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input__box">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input__box">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="input__box">
                  <textarea
                    cols={20}
                    rows={8}
                    type="text"
                    placeholder="Message"
                    value={message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="btn__box">
                  <button className="btn-main">Submit</button>
                </div>
              </form>
            </div>

            <div className="address__box">
              <div className="address">
                <h2>Address</h2>
                <p>478, Maliwas Tokra Road Sirodi, 307511</p>
                <p>Dist:- Sirohi(Rajsthan)</p>
                <p>PHONE: +91 8306371006</p>
                <p>EMAIL: AreenaEcom@gmail.com</p>
              </div>
              <div className="time">
                <h2>Opening Time :</h2>
                <p>Currently Not Fix</p>
                {/* <p>Mon - Sat : 9am - 11pm</p> */}
                {/* <p>Sunday: 11am - 5pm</p> */}
              </div>
              <div className="connect">
                <h2>Stay Connected</h2>
                <span>
                  <Link to={""}>
                    <BsFacebook />
                  </Link>
                </span>
                <span>
                  <Link to={""}>
                    <AiOutlineTwitter />
                  </Link>
                </span>
                <span>
                  <Link
                    to={
                      "https://instagram.com/areena_mart?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                    }
                  >
                    <AiOutlineInstagram />
                  </Link>
                </span>
                <span>
                  <Link to={"https://www.youtube.com/@areenaseries"}>
                    <AiFillYoutube />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
