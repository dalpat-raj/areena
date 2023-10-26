import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { RxCross1 } from "react-icons/rx";
import "./address.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import { deleteUserAddress, updateUserAddress } from "../../../actions/userAction";
import { useDispatch } from "react-redux";

const Address = () => {
  const { user, error, success } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "default",
    },
    {
      name: "home",
    },
    {
      name: "office",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || city === "") {
      toast.error("please fill all the fields");
    } else {
      dispatch(updateUserAddress(country,state, city, zipCode, address1, address2, addressType));
      setOpen(false);
      setCountry("");
      setState("");
      setCity("");
      setZipCode(null);
      setAddress1("");
      setAddress2("");
      setAddressType("");
      if(success){
        toast.success(success)
      }
    }
  };

  const handleAddressDelete=(item)=>{
    dispatch(deleteUserAddress(item._id))
    if(success){
      toast.success(success)
    }
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type: "clearErrors"})
    }
  },[error, dispatch, success])

  return (
    <>
      {open && (
        <>
          <div className={open ? "new__address active" : "new__address"}>
            <div className="new__address__main">
              <div className="hide__address__popup">
                <RxCross1 className="icon" onClick={() => setOpen(false)} />
              </div>
              <div className="heading">
                <h2>Add New Address</h2>
              </div>

              <form action="" onSubmit={handleSubmit}>
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

                <div className="box">
                  <label htmlFor="address1">Apartment, suit, etc. (optional)</label>
                  <input
                    type="address"
                    id="address1"
                    required
                    value={address1}
                    placeholder="Apartment, suit, etc. (optional)"
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="box">
                  <label htmlFor="address2">Address</label>
                  <input
                    type="address"
                    id="address2"
                    required
                    placeholder="Address"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>

                <div className="box">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input
                    type="number"
                    id="zipcode"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>

                <div className="box">
                  <label htmlFor="country">Address Type</label>
                  <select
                    name=""
                    id="country"
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                  >
                    <option value="">Choose Your Address Type</option>
                    {addressTypeData &&
                      addressTypeData.map((item, i) => (
                        <option key={i} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="box">
                  <button type="submit" className="btn-main">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <p
            onClick={() => setOpen(false)}
            className={open ? "overlay" : ""}
          ></p>
        </>
      )}
      <div className="address__main">
        <div className="header">
          <div className="container__heading">
            <h2>Address</h2>
          </div>
          <button onClick={() => setOpen(true)} className="btn-main">
            ADD NEW
          </button>
        </div>

        {
          user && user.addresses.map((item, i)=> (
            <div className="card__row" key={i}>
            <div className="card__box">
              <h4>{item?.addressType}</h4>
            </div>
            <div className="card__box">
              <p>{user?.name}</p>
            </div>
            <div className="card__box">
              <p>{item?.address1} {item?.address2}, {item?.zipCode}</p>
            </div>
            <div className="card__box">
              <p>{user?.phoneNumber}</p>
            </div>
            <div className="card__box">
              <p className="delete__icon" onClick={()=>handleAddressDelete(item)}>
                <IonIcon icon={trashOutline} />
              </p>
            </div>
          </div>
          ))
        }

        {
          user && user.addresses.length === 0 && (
            <div className="empty__address">
              <h4>You not have any saved address!</h4>
            </div>
          )
        }

      </div>
    </>
  );
};

export default Address;
