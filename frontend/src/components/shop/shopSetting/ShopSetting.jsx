import React, { useState } from "react";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { BsCameraFill } from "react-icons/bs";
import { backend__url } from "../../../Server";
import axios from "axios";
import { loadSeller, updateSellerInfo } from "../../../actions/sellerAction";
import "./shopSetting.scss";

const ShopSetting = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller?.name);
  const [shopName, setShopName] = useState(seller?.shopName);
  const [address, setAddress] = useState(seller?.address);
  const [gst, setGst] = useState(seller?.gst);
  const [pan, setPan] = useState(seller?.pan);
  const [description, setDescription] = useState(seller?.description);
  const [zipCode, setZipCode] = useState(seller?.zipCode);
  const [password, setPassword] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios.put(`/api/v2/update-shop-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((res)=>{
      alert("Profile Updated")
      dispatch(loadSeller());
    }).catch((err)=>{
      alert(err?.response?.data?.error?.message)
      
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const seller = {
      name : name,
      shopName: shopName,
      address: address,
      gst: gst,
      pan: pan,
      description: description,
      zipCode: zipCode,
      password: password,
    }
    dispatch(updateSellerInfo(seller))
  };

  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={12} />
          </div>

          <div className="col__2">
            <div className="shop__account__main">
              <div className="main__container">
                <div className="img__box">
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : `${backend__url}/${seller?.avatar}`
                    }
                    alt="raj"
                  />
                  <div className="image__input">
                    <input
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image">
                      <BsCameraFill />
                    </label>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="main__input">
                    <div className="input__box">
                      <label htmlFor="fullName">Your Name</label>
                      <input
                        type="text"
                        id="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="input__box">
                      <label htmlFor="shopname">Shop Name</label>
                      <input
                        type="text"
                        id="shopname"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                      />
                    </div>
                    <div className="input__box">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="input__box">
                      <label htmlFor="gst">GST Number</label>
                      <input
                        type="text"
                        id="address"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                      />
                    </div>
                    <div className="input__box">
                      <label htmlFor="pan">Pan Card</label>
                      <input
                        type="text"
                        id="pan"
                        value={pan}
                        onChange={(e) => setPan(e.target.value)}
                      />
                    </div>
                    <div className="input__box">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="input__box">
                      <label htmlFor="zipCode">ZipCode</label>
                      <input
                        type="number"
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                    <div className="input__box">
                      <label htmlFor="password">Your Password</label>
                      <input
                        type="password"
                        id="password"
                        required
                        placeholder="Your Current Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="submit__button">
                    <button type="submit" className="btn-main">
                      UPDATE PROFILE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSetting;
