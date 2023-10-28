import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../Assests/animations/107043-success.json";
import { useNavigate } from "react-router";
import "./orderSuccess.scss";

const OrderSuccess = () => {
  return (
    <div>
      <Success />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigate= useNavigate();
  return (
    <div className="order_success">
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text">Your order is successful </h5>
      <button className="btn-main" onClick={()=>navigate("/")}>Go Back</button>
      <br />
    </div>
  );
};

export default OrderSuccess;
