import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline, mailOutline } from "ionicons/icons";
import "../../../components/user/loginSignUp/login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginSeller } from "../../../actions/sellerAction";
import Footer from "../../../components/layout/footer/Footer";
import axios from "axios";

const ShopLogin = () => {
  const { isSeller } = useSelector((state) => state.seller);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isSeller) {
      navigate(`/shop-dashboard`);
    }
  }, [isSeller, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const seller = {
      email: email,
      password: password,
    };
    await axios
      .post(`/api/v2/shop-login`, seller, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(LoginSeller(res.data.shop));
        navigate("/shop-dashboard")
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message);
      });
  };

  return (
    <>
      <div className="login__container">
        <div className="container">
          <div className="container__heading">
            <h2>My Account</h2>
          </div>
          <div className="login__row">
            <div className="col__2">
              <div className="col__heading">
                <h4>Seller Login</h4>
              </div>
              <p>If you have an account with us, please log in.</p>
              <form action="" onSubmit={handleSubmit}>
                <div className="input__container">
                  <div className="input__box">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>
                      <IonIcon icon={mailOutline} />
                    </span>
                  </div>
                  <div className="input__box">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>
                      <IonIcon icon={lockClosedOutline} />
                    </span>
                  </div>
                </div>
                <div className="button__container">
                  <button type="submit" className="btn-main">
                    SIGN IN
                  </button>
                  <NavLink to={"/shop-forgate-password"}>
                    Forgot your password?
                  </NavLink>
                </div>
              </form>
            </div>
            <div className="col__2">
              <div className="col__heading">
                <h4>NEW SELLER?</h4>
              </div>
              <p>
                Registering for this site allows you to access your order status
                and history. We’ll get a new account set up for you in no time.
                For this will only ask you for information necessary to make the
                purchase process faster and easier
              </p>
              <div className="button__container">
                <button
                  onClick={() => navigate("/shop-create")}
                  className="btn-main"
                >
                  CREATE AN ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopLogin;
