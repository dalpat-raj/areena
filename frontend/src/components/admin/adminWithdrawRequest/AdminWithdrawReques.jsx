import React, { useEffect, useState } from "react";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux"
import "./adminWithdrawRequest.scss";
import axios from "axios";
import { getAllWithdrawRequest } from "../../../actions/withdrawAction";
import Loader from "../../layout/loader/Loader";
import { Helmet } from "react-helmet";

const AdminWithdrawReques = () => {

  const {withdraw, isLoading} = useSelector((state)=>state.withdraw)

  const [active, setActive] = useState(7);
  const [withdrawId, setWithdrawId] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Processing");

  const dispatch = useDispatch();


  const handleSubmit = async () => {
    await axios.put(`/api/v2/update-withdraw-request/${withdrawId}`,{shopId}, {withCredentials: true}).then((res)=>{
      alert("Updated")
      if(res.data.success === true){
        setOpen(false);
      }
    }).catch((error)=>{
      console.log(error);
    })
  };

  useEffect(() => {
    dispatch(getAllWithdrawRequest());
  }, [dispatch]);

  return (
   <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Withdraw</title>
      </Helmet>
   {
    isLoading ? (
      <Loader/>
    ) : (
      <div className="admin__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <AdminSidebar active={active} setActive={setActive} />
          </div>

          <div className="col__2 admin__withdraw__requset">
            {withdraw?.map((item, i) => (
              <div className="withdraw__rows" key={i}>
                <div className="cols">
                  <p>
                    Withdraw ID : <span>{item?._id}</span>
                  </p>
                  <p>
                    Shop Name : <span>{item?.seller?.shopName}</span>
                  </p>
                  <p>
                    Email : <span>{item?.seller?.email}</span>
                  </p>
                  <p>
                    Phone : <span>{item?.seller?.phone}</span>
                  </p>
                </div>
                <div className="cols amount">
                  <p>Amount</p>
                  <span>{item?.amount}</span>
                </div>
                <div className="cols">
                  <p>Request Date</p>
                  <span>{item?.createdAt?.slice(0, 10)}</span>
                </div>
                <div className="cols select__btn">
                  <p>Status</p>
                  <span>{item?.status}</span>
                  {
                    item?.status !== "Succeed" && (
                  <button className="btn-main" onClick={() => setOpen(true) || setWithdrawId(item?._id) || setShopId(item?.seller?._id) } >
                    Update
                  </button>
                    )
                  }
                </div>
              </div>
            ))}
            {open && (
              <>
                <div className="set__open">
                  <div className="heading">
                    <h2>Update Status</h2>
                  </div>
                  <p className="id">Withdraw ID : <span>{withdrawId}</span></p>
                  <select
                    className="btn-sel"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={"Processing"}>Processing</option>
                    <option value={"Succeed"}>Succeed</option>
                  </select>
                  <button
                    className="btn-main"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
                <p className="overlay" onClick={() => setOpen(false)}></p>
              </>
            )}
            {
              withdraw?.length === 0 && (
                <div className="nowithdraw">
                  <p>No Withdraw Requste</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
    )
   }
   </>
  );
};

export default AdminWithdrawReques;
