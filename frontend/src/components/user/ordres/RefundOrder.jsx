import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../../actions/orderAction";
import { backend__url } from "../../../Server";
import Loader from "../../layout/loader/Loader";

const RefundOrder = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch, user._id]);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing Refund");

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="order__main">
          <div className="box">
            {eligibleOrders &&
              eligibleOrders.map((item, i) => (
                <Link to={`/user/order/${item?._id}`}>
                  <div className="row" key={i}>
                    <div className="img_name">
                      {item?.cart.map((item, i) => (
                        <div className="img_name_row" key={i}>
                          <img
                            src={`${backend__url}/${item?.images[0]}`}
                            alt="raj"
                          />
                          <p>
                            {item?.name.length >= 25
                              ? `${item?.name.slice(0, 25)}...`
                              : item?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="price">
                      <p>₹ {item?.totalPrice}</p>
                    </div>
                    <div className="status">
                      <p>{item?.status}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RefundOrder;
