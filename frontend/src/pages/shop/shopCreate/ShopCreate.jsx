import React, { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import { Country, State, City } from "country-state-city";
import axios from "axios";
import "./shopCreate.scss";
import { useNavigate } from "react-router";
import Footer from "../../../components/layout/footer/Footer";
import Loader from "../../../components/layout/loader/Loader";
import { useForm,  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { SellerSchema } from "../../../schema/SellerSchema";
import { IoCloudUploadOutline } from "react-icons/io5";

const ShopCreate = () => {

  const {reset ,register, handleSubmit, watch, setValue, formState: {errors}} = useForm({
    resolver: zodResolver(SellerSchema),
    defaultValues: {
        country: "india",
    }
  })

  const [avatar, setAvatar] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const selectedState = watch("state");
  const states = State.getStatesOfCountry("IN");
  const cities = selectedState
    ? City.getCitiesOfState(
        "IN",
        states.find((s) => s.name === selectedState)?.isoCode || ""
      )
    : [];

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const onSubmit = (formData) => {
    setIsLoading(true)
    const shopData = {
      ...formData,
      file: avatar
    }
    
    axios
      .post(`/api/v2/shop-create`, shopData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        reset();
        setIsLoading(false);
        setMessage(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response?.data?.error?.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : message ? (
        <div className="message__main">
          <p className="message">{message}</p>
          <button className="btn-main" onClick={()=>navigate("/")}>Go Back</button>
        </div>
      ) : (
         <>
          <div className="shopcreate__main">
            <div className="container">
              <div className="container__heading">
                <h2>Register As Seller</h2>
              </div>
              <div className="signup__row">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <h4>Basic Details</h4>
                  <h5>Pickup/RTO Incharge at Address</h5>
                  <div className="box">
                    <div className="input__box box_1">
                      <label htmlFor="name">Your Full Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your Full Name"
                        {...register("name")}
                      />
                      {errors?.name && <span className="errors">{errors?.name?.message}</span>}
                    </div>

                    <div className="input__box box_2">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="i.e acd@gmail.com"
                        {...register("email")}
                      />
                      {errors?.email && <span className="errors">{errors?.email?.message}</span>}
                    </div>

                    <div className="input__box box_3">
                      <label htmlFor="password">Phone Number</label>
                      <input
                        type="number"
                        id="phone"
                        placeholder="Enter 10 digit mobile number"
                        {...register("phoneNumber")}
                        />
                        {errors?.phoneNumber && <span className="errors">{errors?.phoneNumber?.message}</span>}
                    </div>
                    <div className="input__box box_4">
                      <label htmlFor="password">Password</label>
                      <input
                        type={"password"}
                        id="password"
                        placeholder="Enter Your Password"
                        {...register("password")}
                      />
                      {errors?.password && <span className="errors">{errors?.password?.message}</span>}
                    </div>
                    <div className="input__box box_5">
                      <label htmlFor="desc">Description</label>
                      <textarea
                        type="text"
                        id="desc"
                        placeholder="Write Description"
                        {...register("description")}
                      />
                    </div>
                    <div className="img__shoose input__box box_6">
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
                        <div className="img_icon">
                          <IoCloudUploadOutline size={100}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4>Please Type Your Address</h4>
                  <div className="box">
                    <div className="input__box">
                      <label htmlFor="shop">Shop Name</label>
                      <input
                        type="text"
                        id="shop"
                        placeholder="Shop Name"
                        {...register("shopName")}
                      />
                      {errors?.shopName && <span className="errors">{errors?.shopName?.message}</span>}
                    </div>
                    <div className="input__box">
                      <label htmlFor="address">complate address</label>
                      <input
                        type="text"
                        id="address"
                        placeholder="House/Floor No., Building Name or Street, Locality"
                        {...register("complateAddress")}
                      />
                      {errors?.complateAddress && <span className="errors">{errors?.complateAddress?.message}</span>}
                    </div>
                    <div className="input__box">
                      <label htmlFor="landmark">Landmark</label>
                      <input
                        type="text"
                        id="landmark"
                        placeholder="Any nearby post ooffice, market, Hospital as the landmark"
                        {...register("landmark")}
                      />
                    </div>
                    <div className="input__box">
                      <label htmlFor="pioncode">PinCode</label>
                      <input
                        type="number"
                        id="pioncode"
                        placeholder="Add Pincode"
                        {...register("pincode")}
                      />
                      {errors?.pincode && <span className="errors">{errors?.pincode?.message}</span>}
                    </div>

                   <div className="input__box">
                    <label htmlFor="state">State</label>
                    <select
                      id="state"
                      {...register("state")}
                      onChange={(e) => {
                        setValue("state", e.target.value);
                        setValue("city", ""); // Reset city when state changes
                      }}
                    >
                      <option value="">Choose Your State</option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors?.state && <span className="errors">{errors?.state?.message}</span>}
                  </div>

                  <div className="input__box">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      {...register("city")}
                      disabled={!selectedState}
                    >
                      <option value="">Choose Your City</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors?.city && <span className="errors">{errors?.city?.message}</span>}
                  </div>
                </div>

                  <h4>Operational timings</h4>
                  <h5>Contact information for this location</h5>
                  <div className="box">
                    <div className="input__box box_7">
                      <label htmlFor="days" className="days">Operational days</label>
                      <div className="days-checkbox-group">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, i) => (
                          <div key={i} className="day-checkbox">
                            <input
                              type="checkbox"
                              id={`day-${day}`}
                              value={day}
                              {...register("operationalDays")} // This will group all checkboxes
                            />
                            <label htmlFor={`day-${day}`}>{day}</label>
                          </div>
                        ))}
                        {errors?.operationalDays && <span className="errors">{errors?.operationalDays?.message}</span>}
                      </div>
                    </div>
                    <div className="input__box__2">
                      <label htmlFor="">Warehouse Timing</label>
                      <div className="input__box__22">
                        <div className="input__box">
                          <label htmlFor="openTime">Open Time</label>
                          <select id="openTime" {...register("openTime")}>
                            {["5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM"].map((item, i) => (
                              <option value={item} key={i}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="input__box">
                          <label htmlFor="closeTime">Close Time</label>
                          <select id="closeTime" {...register("closeTime")}>
                            {["4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"].map((item, i) => (
                              <option value={item} key={i}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
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
      )}
    </>
  );
};

export default ShopCreate;