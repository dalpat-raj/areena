import React, { useState } from "react";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import "./shopWithdraw.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadSeller } from "../../../actions/sellerAction";
import { AiOutlineDelete } from "react-icons/ai";

const ShopWithdrawMoney = () => {
  const { seller } = useSelector((state) => state.seller);

  const [open, setOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountNumber: null,
    IFSCCode: "",
    accountHolderName: "",
    address: "",
    country: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethods = {
      bankName: bankInfo?.bankName,
      accountNumber: bankInfo?.accountNumber,
      IFSCCode: bankInfo?.IFSCCode,
      accountHolderName: bankInfo?.accountHolderName,
      address: bankInfo?.address,
      country: bankInfo?.country,
    };
   
    await axios
      .put(
        `/api/v2/add-seller-withdraw-methods`,
        { withdrawMethods },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === true) {
          dispatch(loadSeller());
          setBankInfo({
            bankName: "",
            accountNumber: null,
            IFSCCode: "",
            accountHolderName: "",
            address: "",
            country: "",
          });
        }
      });
  };

  // delete withdraw methods
  const DeleteWithdrawMethodsHandler=async()=>{
    await axios.delete(`/api/v2/delete-withdraw-methods`, {withCredentials: true}).then((res)=>{
      if(res.data.success === true){
        setOpen(false);
        dispatch(loadSeller());
      }
    }).catch((error)=>{
      alert(error.response.data.error.message);
    })
  }


  // create withdraw request
  const withdrawHandler=async()=>{
    const amount = withdrawAmount;
    if (seller?.availableBalance >= 1000) {
      if(amount >= 1000){
        await axios.post(`/api/v2/create-withdraw-request`, {amount}, {withCredentials: true}).then((res)=>{
          if(res.data.success === true){
            alert("Request is successfull")
          }
        }).catch((error)=>{
          alert(error.response.data.error.message)
        })
      }else{
        alert("Minimum ₹ 1000 Withdraw")
      }
    }else{
      alert("Insufficient funds");
    }
  }

  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={7} />
          </div>
          <div className="col__2 pop_up">
            {seller?.withdrawMethods ? (
              <div className="withdraw__main__container">
                <div className="withdraw__row">
                  <div className="col">
                    <div className="account__number">
                      <div className="name__account" >
                        <p>
                          Account No:{" "}
                          {"*".repeat(
                            seller?.withdrawMethods?.accountNumber?.length - 3
                          ) + seller?.withdrawMethods?.accountNumber?.slice(-3)}
                        </p>
                        <span>
                          Bank Name: {seller?.withdrawMethods?.bankName}
                        </span>
                      </div>
                      <div className="delete__methods">
                        <AiOutlineDelete onClick={()=>DeleteWithdrawMethodsHandler()}/>
                      </div>
                    </div>
                    <div className="available__balance">
                      <p>Balance: {seller?.availableBalance }</p>
                    </div>
                    <div className="withdraw__amount">
                      <input 
                      type="number" 
                      placeholder="Amount..." 
                      value={withdrawAmount}
                      onChange={(e)=>setWithdrawAmount(e.target.value)}
                      />
                      <button onClick={()=>withdrawHandler()} className="btn-main">Withdraw</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={open ? "withdraw_text_hide" : "no_withdraw_methods"}
              >
                <div>
                  <h5>Please Add Account Details</h5>
                  <button onClick={() => setOpen(true)} className="btn-main">
                    Add Account Details
                  </button>
                </div>
              </div>
            )}
            {open && (
              <div className="form__container">
                <form onSubmit={handleSubmit}>
                  <div className="inpu__box">
                    <label htmlFor="bankName">Bank Name</label>
                    <input
                      id="bankName"
                      type="text"
                      placeholder="Enter your bank name"
                      required
                      value={bankInfo?.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                    />
                  </div>
                  <div className="inpu__box">
                    <label htmlFor="account">Account Number</label>
                    <input
                      id="account"
                      type="number"
                      placeholder="Enter your account number"
                      required
                      value={bankInfo?.accountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          accountNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="inpu__box">
                    <label htmlFor="ifsc">Bank IFSC Code</label>
                    <input
                      id="ifsc"
                      type="text"
                      placeholder="Enter your bank IFSC code"
                      required
                      value={bankInfo?.IFSCCode}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, IFSCCode: e.target.value })
                      }
                    />
                  </div>
                  <div className="inpu__box">
                    <label htmlFor="bankName">Account Holder Name</label>
                    <input
                      id="bankName"
                      type="text"
                      placeholder="Enter your name"
                      required
                      value={bankInfo?.accountHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          accountHolderName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="inpu__box">
                    <label htmlFor="address">Bank Address</label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Enter your bank address"
                      required
                      value={bankInfo?.address}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="inpu__box">
                    <label htmlFor="address">Bank Country</label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Enter your bank country"
                      required
                      value={bankInfo?.country}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, country: e.target.value })
                      }
                    />
                  </div>
                  <div className="input__box">
                    <button className="btn-main">Submit</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopWithdrawMoney;
