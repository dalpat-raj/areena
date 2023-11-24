import React, { useEffect, useState } from "react";
import "./account.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateUserInfo } from "../../../actions/userAction";
import { backend__url } from "../../../Server";
import axios from "axios";
import { BsCameraFill } from "react-icons/bs";
import { Helmet } from "react-helmet";
import Loader from "../../layout/loader/Loader";

const Account = () => {
  const { user, loading } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(user?.avatar);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };
    dispatch(updateUserInfo(user));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`/api/v2/update-user-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="account__main">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Your Account</title>
            <meta
              name="description"
              content="what is in your account:-  your account in your personal information like name phone emil etc."
            />
            <link rel="canonical" href="https://areenaa.in/account" />
          </Helmet>
          <div className="main__container">
            <div className="img__box">
              <img
                src={`${backend__url}/${user ? user?.avatar : avatar}`}
                alt="raj"
              />
              <div className="image__input">
                <input id="image" type="file" onChange={handleImageChange} />
                <label htmlFor="image">
                  <BsCameraFill />
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="main__input">
                <div className="input__box">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input__box">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input__box">
                  <label htmlFor="phoneNumbar">Phone Number</label>
                  <input
                    type="text"
                    id="PhoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="input__box">
                  <label htmlFor="zipCode">Your Password</label>
                  <input
                    type="password"
                    id="zipCode"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please Verify Your Current Password"
                  />
                </div>
              </div>
              <div className="submit__button">
                <button className="btn-main">UPDATE PROFILE</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
