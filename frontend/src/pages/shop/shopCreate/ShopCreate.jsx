import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  callOutline,
  codeOutline,
  eyeOffOutline,
  eyeOutline,
  homeOutline,
  locationOutline,
  lockClosedOutline,
  mailOutline,
  personOutline,
} from "ionicons/icons";
import {BsShopWindow} from "react-icons/bs"
import axios from "axios";
import "./shopCreate.scss";
import { useNavigate } from "react-router";
import Footer from "../../../components/layout/footer/Footer"
import Loader from "../../../components/layout/loader/Loader"


const ShopCreate = () => {
  const [name, setName] = useState();
  const [shopName, setShopName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [zipCode, setZipCode] = useState();
  const [pinCode, setPinCode] = useState([]);
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState();
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [wait, setWait] = useState(false);

  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const CreateShop = (e) => {
    e.preventDefault();
    setWait(true)

    const shopData = {
      name: name,
      shopName: shopName,
      email: email,
      phone: phone,
      address: address,
      zipCode: zipCode,
      pinCode: pinCode,
      password: password,
      file: avatar,
      description: description,
    };


    axios
      .post(`/api/v2/shop-create`, shopData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        setWait(false)
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.error.message);
        setWait(false)
      });
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  console.log(pinCode);

  return (
    <>
    {
      wait ? (
        <Loader/>
      ) : (
        <>
    <div className="shopcreate__main">
      <div className="container">
        <div className="container__heading">
          <h2>Register As Seller</h2>
        </div>
        <div className="signup__row">
          <form action="" onSubmit={CreateShop}>
            <div className="input__box">
              <input
                type="text"
                id="name"
                placeholder="Your Full Name"
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
                id="shopname"
                placeholder="Shop Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <span>
                <IonIcon icon={homeOutline} />
              </span>
            </div>

            <div className="input__box">
              <input
                type="email"
                id="email"
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
                type="number"
                id="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <span>
                <IonIcon icon={callOutline} />
              </span>
            </div>

            <div className="input__box">
              <input
                type="text"
                id="address"
                placeholder="Enter Your Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span>
                <IonIcon icon={locationOutline} />
              </span>
            </div>

            <div className="input__box">
              <input
                type="number"
                id="zipcode"
                placeholder="Your Pin Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <span>
                <IonIcon icon={codeOutline} />
              </span>
            </div>

            <div className="input__box">
              <input
                type={visible ? "password" : "text"}
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <IonIcon icon={lockClosedOutline} />
              </span>
              <div className="Pass__icon">
                {visible ? (
                  <p onClick={() => setVisible(!visible)} className="eye__open">
                    <IonIcon icon={eyeOutline} />
                  </p>
                ) : (
                  <p
                    onClick={() => setVisible(!visible)}
                    className="eye__close"
                  >
                    <IonIcon icon={eyeOffOutline} />
                  </p>
                )}
              </div>
            </div>

            <div className="img__shoose">
                {
                    avatar && (
              <span className="img_span">
                <img src={URL.createObjectURL(avatar)} alt="areena" />
              </span>
                    )
                }
              <div className="input__boxx">
                <input
                  type="file"
                  name="avatar"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileInputChange(e)}
                  className="sr-only"
                />
                <div className="text">
                  <BsShopWindow size={18}/>
                  <p>Shop Picture</p>
                </div>
              </div>
            </div>

            <div className="input__box">
              <textarea
                type="text"
                placeholder="Write Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="input__box pincode">
              <label htmlFor="pincode">Pin Code Where do you want delivery ?</label>
              <input
                type="text"
                id="pincode"
                placeholder="Pin Code Where do you want delivery ?"
                value={pinCode}
                onChange={(e) => setPinCode([e.target.value.split(" ").join(",")])}
              />
              <label htmlFor="pincode">Type Like:- 325485 2584 546258 452515</label>
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
    <Footer/>
    </>
      )
    }
    </>
  );
};

export default ShopCreate;
