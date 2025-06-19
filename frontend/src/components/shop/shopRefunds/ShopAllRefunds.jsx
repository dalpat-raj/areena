import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import DashboardSidebar from '../dashboardSidebar/DashboardSidebar'
import { getAllOrdersShop } from '../../../actions/orderAction'
import { backend__url } from '../../../Server'
import "./shopAllRefunds.scss";

const ShopAllRefunds = () => {
    const { seller} = useSelector((state)=>state.seller);
    const { orders} = useSelector((state)=>state.order);
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(getAllOrdersShop(seller?._id));
    },[seller, dispatch])

    const refundOrder = orders && orders.filter((item)=>item.status === "Processing Refund" || item.status === "Refund Success")
    
  return (
    <div className="dashboard__container">
    <div className="container">
      <div className="dashboard__row">
        <div className="col__2 dashboard__sidebar">
          <DashboardSidebar active={9}/>
        </div>
        
        
        <div className="col__2 shop_all_refunds">
              <div className="order__main">
                <div className="box">
                  {refundOrder &&
                    refundOrder.map((item, i) => (
                      <Link to={`/shop/order/${item?._id}`}>
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
                          <div className="update__btn">
                              <button className="btn-sec">
                                Update Status
                              </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
      

      </div>
    </div>
  </div>
  )
}

export default ShopAllRefunds