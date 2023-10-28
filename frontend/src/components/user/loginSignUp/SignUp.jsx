import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  lockClosedOutline,
  mailOutline,
  personOutline,
} from "ionicons/icons";
import { BsPhone } from "react-icons/bs";
import "./signUp.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { CreateUser } from "../../../actions/userAction";
import { useNavigate } from "react-router";
import Footer from "../../layout/footer/Footer";

const SignUp = () => {
  const { isAuthenticated, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      file: avatar,
    };
    dispatch(CreateUser(userData));
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate(-1);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [isAuthenticated, navigate, error, dispatch]);

  return (
    <>
      <div className="signup__container">
        <div className="container">
          <div className="container__heading">
            <h2>Create Account</h2>
          </div>
          <div className="signup__row">
            <form action="/fileupload" onSubmit={handleSubmit}>
              <div className="input__box">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span>
                  <IonIcon icon={personOutline} />
                </span>
              </div>
              <div className="input__box">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span>
                  <IonIcon icon={mailOutline} />
                </span>
              </div>
              <div className="input__box">
                <input
                  type="Number"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <span>
                  <BsPhone />
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

              <div className="img__container">
                {avatar ? (
                  <div className="img__box">
                    <img src={URL.createObjectURL(avatar)} alt="areena" />
                  </div>
                ) : null}
                <div className="input__box">
                  <input
                    type="file"
                    name="avatar"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileInputChange(e)}
                    className="sr-only"
                  />
                </div>
              </div>

              <div className="button__container">
                <button type="submit" className="btn-main">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
