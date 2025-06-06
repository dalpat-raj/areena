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
import { BsShopWindow } from "react-icons/bs";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import "./shopCreate.scss";
import { useNavigate } from "react-router";
import Footer from "../../../components/layout/footer/Footer";
import Loader from "../../../components/layout/loader/Loader";

const ShopCreate = () => {
  const [name, setName] = useState();
  const [shopName, setShopName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
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
    setWait(true);

    const shopData = {
      name: name,
      shopName: shopName,
      email: email,
      phone: phone,
      address: address,
      country: country,
      state: state,
      city: city,
      zipCode: zipCode,
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
        setWait(false);
        alert(res.data.message);
        navigate("/");
        
      })
      .catch((err) => {
        alert(err.response.data.error.message);
        setWait(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {wait ? (
        <Loader />
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

                  <div className="box">
                    <label htmlFor="country">Country</label>
                    <select
                      name=""
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">choose Your country</option>
                      {Country &&
                        Country.getAllCountries().map((item, i) => (
                          <option key={i} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="box__row">
                    <div className="box">
                      <label htmlFor="state">State</label>
                      <select
                        name=""
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">choose Your state</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item, i) => (
                            <option key={i} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="box">
                      <label htmlFor="city">City</label>
                      <select
                        name=""
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="">choose Your city</option>
                        {City &&
                          City.getCitiesOfState(country, state).map((item, i) => (
                            <option key={i} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
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

                  {/* <div className="input__box">
                    <input
                      type="number"
                      placeholder="Pin Code (Where You Deliver Your Products)"
                      value={pinCode}
                      onChange={(e) => setPinCode(+e.target.value)}
                    />
                    <span>
                      <IonIcon icon={codeOutline} />
                    </span>
                  </div> */}

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
                        <p
                          onClick={() => setVisible(!visible)}
                          className="eye__open"
                        >
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
                    {avatar && (
                      <span className="img_span">
                        <img src={URL.createObjectURL(avatar)} alt="areena" />
                      </span>
                    )}
                    <div className="input__boxx">
                      <input
                        type="file"
                        name="avatar"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileInputChange(e)}
                        className="sr-only"
                      />
                      <div className="text">
                        <BsShopWindow size={18} />
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
      )}
    </>
  );
};

export default ShopCreate;
