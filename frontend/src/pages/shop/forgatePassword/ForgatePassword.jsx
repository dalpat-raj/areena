import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline, mailOutline } from "ionicons/icons";
import "../../../components/user/loginSignUp/login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../../components/layout/footer/Footer"
import "./shopForgatePass.scss";
import axios from "axios";

const ForgatePassword = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
  
    const navigate = useNavigate();
  
    const { isSeller } = useSelector((state) => state.seller);
  
    useEffect(() => {
      if (isSeller === true) {
        navigate(`/shop-dashboard`);
      }
    }, [isSeller, navigate]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(password === cpassword){
        axios.post(`/api/v2/forgate-shop-password`, {email, password}).then((res)=>{
          alert(res.data.message)
          setEmail("")
          setPassword("")
          setCpassword("")
          navigate("/shop-login")
        }).catch((err)=>{
          console.log(err);
        })
      }else{
        alert("Password Not Match")
      }
    };

  return (
    <>
    <div className="shopfor__container">
      <div className="container">
        <div className="container__heading">
          <h2>Shop Forgate Password</h2>
        </div>
        <div className="login__row">
          <div className="col__2">
            <div className="col__heading">
              <h4>Forgate Password</h4>
            </div>
            <p>Please Provide your old Email and new Password,</p>
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
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span>
                    <IonIcon icon={lockClosedOutline} />
                  </span>
                </div>
                <div className="input__box">
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                  <span>
                    <IonIcon icon={lockClosedOutline} />
                  </span>
                </div>
              </div>
              <div className="button__container">
                <button type="submit" className="btn-main">
                  SUBMIT
                </button>
                <NavLink to={"/shop-login"}>Log In</NavLink>
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
  )
}

export default ForgatePassword