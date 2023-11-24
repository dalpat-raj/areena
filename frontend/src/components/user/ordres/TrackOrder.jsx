import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../../../actions/orderAction";
import { backend__url } from "../../../Server";
import Loader from "../../layout/loader/Loader";

const TrackOrder = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersUser(user?._id));
  }, [dispatch, user._id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="order__main">
          <div className="box">
            {orders &&
              orders.map((item, i) => (
                <Link to={`/user/track-order/${item?._id}`}>
                  <div className="row" key={i}>
                    <div className="img_name">
                      {item?.cart?.map((data, i) => (
                        <div className="img_name_row" key={i}>
                          <img
                            src={`${backend__url}/${data?.images[1]}`}
                            alt="raj"
                          />
                          <p>
                            {data?.name.length >= 25
                              ? `${data?.name.slice(0, 25)}...`
                              : data?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="price">
                      <p>₹ {item?.totalPrice}</p>
                    </div>
                    <div className="status">
                      <p>{item?.status}</p>
                      {item?.status === "Delivered" && (
                        <button className="btn-sec">
                          Write a product review
                        </button>
                      )}
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

export default TrackOrder;
