import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline, mailOutline } from "ionicons/icons";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../../actions/userAction";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Footer from "../../layout/footer/Footer";

const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(LoginUser(user));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated, navigate ]);

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
                <h4>Login</h4>
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>
                      <IonIcon icon={lockClosedOutline} />
                    </span>
                    <div className="pass__icon">
                      {showPassword ? (
                        <AiOutlineEyeInvisible
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <AiOutlineEye onClick={() => setShowPassword(true)} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="button__container">
                  <button type="submit" className="btn-main">
                    SIGN IN
                  </button>
                  <NavLink>Forgot your password?</NavLink>
                </div>
              </form>
            </div>
            <div className="col__2">
              <div className="col__heading">
                <h4>NEW CUSTOMER?</h4>
              </div>
              <p>
                Registering for this site allows you to access your order status
                and history. We’ll get a new account set up for you in no time.
                For this will only ask you for information necessary to make the
                purchase process faster and easier
              </p>
              <div className="button__container">
                <button
                  onClick={() => navigate("/signUp")}
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

export default Login;
