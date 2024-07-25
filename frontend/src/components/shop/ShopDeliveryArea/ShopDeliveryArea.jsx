import React, { useState } from "react";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import "./shopDeliveryArea.scss";
import { BiMapPin } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { loadSeller } from "../../../actions/sellerAction";
import axios from "axios";

const ShopDeliveryArea = () => {
  const { seller } = useSelector((state) => state.seller);
  const [pinCode, setPinCode] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `/api/v2/shop-delivery-pincode-add`,
        { pinCode },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(loadSeller());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete=(pin)=>{
    axios.delete(`/api/v2/shop-delivery-pincode-delete/${pin}`, {withCredentials: true}).then((res)=>{
        dispatch(loadSeller());
    }).catch((error)=>{
        console.log(error);
    })
  }

  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={11} />
          </div>

          <div className="col__2 area__content">
            <div className="heading">
              <h2>Set Delivery Area By PinCode</h2>
            </div>

           
            <div className="add_pin">
            <form onSubmit={handleSubmit}>
                <div className="input__box">
                <input
                    type="number"
                    placeholder="type Pin code"
                    value={pinCode}
                    onChange={(e) => setPinCode(+e.target.value)}
                />
                </div>
                <div className="btn_box">
                <button className="btn-main" type="submit">
                    Add Pin Code
                </button>
                </div>
            </form>
            </div>

            {seller && (
              <div className="pin__container">
                <div className="heading__save">
                  <p>Saved PinCode</p>
                </div>
                <div className="pin__main__row">
                {seller?.pinCode?.map((item, i) => (
                  <div className="pin__row" key={i}>
                    <div className="icon">
                      <BiMapPin />
                    </div>
                    <div className="pincode">
                      <p>{item}</p>
                    </div>
                    <div className="delete_icon" onClick={()=>handleDelete(item)}>
                      <RiDeleteBinLine  />
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDeliveryArea;
