import React, { useEffect, useState } from "react";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSellerByAdmin,
  getAllSellerForAdmin,
} from "../../../actions/sellerAction";
import { backend__url } from "../../../Server";
import "./adminAllSellers.scss";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../layout/loader/Loader";
import { Helmet } from "react-helmet";
import Switch from "react-switch";
import axios from "axios";
import {toast} from 'react-toastify'

const AdminAllSellers = () => {
  const { allSellers, isLoading } = useSelector((state) => state.seller);
  const [active, setActive] = useState(4);
  const [statusMap, setStatusMap] = useState({});

  const dispatch = useDispatch();

  const deleteSellerHandler = (id) => {
    dispatch(deleteSellerByAdmin(id));
    dispatch(getAllSellerForAdmin());
  };

  const handleChange = (sellerId, checked) => {
    setStatusMap((prev) => ({
      ...prev,
      [sellerId]: checked,
    }));
    
    axios.put(`/api/v2/shop-status-change`, { 
      sellerId, 
      status: checked 
    }, {
      withCredentials: true,
    }).then((res)=>{
      toast.success(res?.data?.message)
    }).catch((err)=>{
      toast.error(err.response?.data?.error?.message);
    })
    
  };

  useEffect(() => {
    dispatch(getAllSellerForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (allSellers) {
      const initialStatus = {};
      allSellers?.forEach((seller) => {
        initialStatus[seller._id] = seller?.status || false;
      });
      setStatusMap(initialStatus);
    }
  }, [allSellers]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Areena All Sellers</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="admin__container">
          <div className="container">
            <div className="dashboard__row">
              <div className="col__2 dashboard__sidebar">
                <AdminSidebar active={active} setActive={setActive} />
              </div>

              <div className="col__2 admin__sellers">
                {allSellers &&
                  allSellers?.map((item,i) => (
                    <div className="seller__row" key={i}>
                      <div className="img__name__box">
                        <img
                          src={`${backend__url}/${item?.avatar}`}
                          alt={item?.shopName}
                        />
                        <div className="name">
                          <p>Shop Name : {item?.shopName}</p>
                          <span>Owner Name : {item?.name}</span>
                          <span>Phone : {item?.phoneNumber}</span>
                          <span>Email : {item?.email}</span>
                          <span>Desc : {item?.description}</span>
                        </div>
                      </div>
                      <div className="delete__seller">
                        <AiOutlineDelete
                          onClick={() => deleteSellerHandler(item?._id)}
                        />
                      </div>
                      <div className="status">
                        <p>Status</p>
                        <div className="statuss">
                          <Switch
                          width={40}
                          height={15}
                          onChange={(checked) => handleChange(item._id, checked)}
                          checked={statusMap[item._id] || false}
                        />
                        <p>{statusMap[item._id] ? "active": "inActive"}</p>
                        </div>
                      </div>
                      <div className="phone__email__address">
                        {item?.availableBalance > 0 ? <p>Available Balance: {item?.availableBalance}</p> : <></>}
                        {item?.totalShippingChargePay > 0  ? <p>Total Shipping ChargePay : {item?.totalShippingChargePay}</p> : <></>}
                        {item?.openTime ? <p>Open Time : {item?.openTime}</p> : <></>}
                        {item?.closeTime ? <p>Close Time : {item?.closeTime}</p> : <></>}
                        {item?.operationalDays?.length > 0 ? <p>Operational Days: {item?.operationalDays?.map((item, i)=><span key={i}> {item},</span>)}</p> : <></>}
                        <p>
                          Address : {item?.complateAddress}, {item?.landmark}, {item?.state}, {item?.city}, {item?.pincode}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAllSellers;
