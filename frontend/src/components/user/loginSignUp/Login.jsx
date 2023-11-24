import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline, mailOutline } from "ionicons/icons";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../../actions/userAction";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Helmet } from "react-helmet";
import axios from "axios";
const Footer = React.lazy(()=>import("../../layout/footer/Footer"));

const Login = () => {
  const { isAuthenticated} = useSelector((state) => state.user);

  const [forgate, setFrogate] = useState(false);
  const [forgateEmail, setForgateEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConNewPassword, setShowConNewPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    axios.post(`/api/v2/login`, user, {
      withCredentials: true,
    }).then((res)=>{
      dispatch(LoginUser(res.data.user));
    }).catch((error)=>{
      alert(error?.response?.data?.error?.message)
    })
  };

  const forgateUserPassword = (e) => {
    e.preventDefault();
    if(newPassword === confirmNewPassword){
      axios.post(`/api/v2/forgate-user-password`, {forgateEmail, newPassword}).then((res)=>{
        alert(res.data.message)
        setFrogate(false)
        setForgateEmail("")
        setNewPassword("")
        setConfirmNewPassword("")
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      alert("Password Not Match")
    }
    
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated, navigate ]);



  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>areena:- login Areena Account - Order Online At Areena Today</title>
        <meta
          name="description"
          content="Choose From a Wide Range Of Areena Speakers, Available At Great Prices. Enhance Your Shopping Experience With Our Personalised..."
        />
        <link rel="canonical" href="https://areenaa.in/login" />
      </Helmet>
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
                </div>
              </form>
              <button className="forgate__btn" onClick={()=>setFrogate(true)}>Forgot your password?</button>
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
      <Suspense fallback={""}>
      <Footer />
      </Suspense>
      {
        forgate && (
          <>
            <div className="forgate__main">
              <h2>Forgate Password</h2>
              <form onSubmit={forgateUserPassword}>
                <div className="input__box">
                <label htmlFor="email">Email</label>
                  <input 
                  id="email"
                  type="email" 
                  placeholder="type your email"
                  value={forgateEmail}
                  onChange={(e)=>setForgateEmail(e.target.value)}
                  />
                </div>
                <div className="input__box">
                  <label htmlFor="newpassword">New Password</label>
                  <input 
                  id="newpassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="new password"
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  />
                  <div className="pass__icon">
                      {showNewPassword ? (
                        <AiOutlineEyeInvisible
                          onClick={() => setShowNewPassword(false)}
                        />
                      ) : (
                        <AiOutlineEye onClick={() => setShowNewPassword(true)} />
                      )}
                    </div>
                </div>
                <div className="input__box">
                <label htmlFor="conNewPass">Confirm New Password</label>
                  <input 
                  id="conNewPass"
                  type={showConNewPassword ? "text" : "password"}
                  placeholder="confirm new Password"
                  value={confirmNewPassword}
                  onChange={(e)=>setConfirmNewPassword(e.target.value)}
                  />
                  <div className="pass__icon">
                      {showConNewPassword ? (
                        <AiOutlineEyeInvisible
                          onClick={() => setShowConNewPassword(false)}
                        />
                      ) : (
                        <AiOutlineEye onClick={() => setShowConNewPassword(true)} />
                      )}
                    </div>
                </div>
                <button type="submit" className="btn-main">Submit</button>
              </form>
              <button className="btn-sec" onClick={()=>setFrogate(false)}>Cancle</button>
            </div>
            <p onClick={()=>setFrogate(false)} className="overlay"></p>
          </>
        )
      }
    </>
  );
};

export default Login;
