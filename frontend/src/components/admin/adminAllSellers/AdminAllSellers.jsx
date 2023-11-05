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

const AdminAllSellers = () => {
  const { allSellers, isLoading } = useSelector(
    (state) => state.seller
  );
  const [active, setActive] = useState(4);

  const dispatch = useDispatch();

  const deleteSellerHandler = (id) => {
    dispatch(deleteSellerByAdmin(id));
      dispatch(getAllSellerForAdmin());
  };

  useEffect(() => {
    dispatch(getAllSellerForAdmin());
  }, [dispatch]);

  return (
    <>
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
                  allSellers?.map((item) => (
                    <div className="seller__row">
                      <div className="img__name__box">
                        <img
                          src={`${backend__url}/${item?.avatar}`}
                          alt={item?.shopName}
                        />
                        <div className="name">
                          <p>Shop Name : {item?.shopName}</p>
                          <span>Owner Name : {item?.name}</span>
                        </div>
                      </div>
                      <div className="delete__seller">
                        <AiOutlineDelete
                          onClick={() => deleteSellerHandler(item?._id)}
                        />
                      </div>
                      <div className="phone__email__address">
                        <p>Phone : {item?.phone}</p>
                        <p>Email : {item?.email}</p>
                        <p>
                          Address : {item?.address}, {item?.zipCode}
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
