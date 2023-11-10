import React, { useEffect, useState } from 'react';
import AdminSidebar from "../adminSidebar/AdminSidebar";
import "./adminDashboard.scss";
import { AiOutlineMoneyCollect } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from "../../layout/loader/Loader"
import { MdBorderClear } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersAdmin } from '../../../actions/orderAction';
import { backend__url } from '../../../Server';
import { getProduct } from '../../../actions/productAction';
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Helmet } from 'react-helmet';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
);


const AdminDashboard = () => {

    const {orders, isLoading} = useSelector((state)=>state.order)
    const {products} = useSelector((state)=>state.products) 
    const { allSellers } = useSelector((state) => state.seller
    );

    const [active, setActive] = useState(1)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllOrdersAdmin());
        dispatch(getProduct());
    },[dispatch])

    const adminEarning = orders && orders.reduce((acc, item)=>acc + ((item.totalPrice / 100) * 2), 0);
    const adminBalance = adminEarning?.toFixed(2)

    const lineState = {
      labels: ["Initial", "Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: ["#E13E50"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, adminBalance],
        },
      ],
    };

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Areena Dashboard</title>
      </Helmet>
    {
      isLoading ? (
        <Loader/>
      ) : (
        <div className="admin__container">
        <div className="container">
          <div className="dashboard__row">
            <div className="col__2 dashboard__sidebar">
              <AdminSidebar active={active} setActive={setActive}/>
            </div>
           
            <div className="col__2 admin__dashboard__content">
                <div className="dashboard_heading">
                  <h2>Overview</h2>
                </div>
                <div className="dashboard__content">
                  <div className="dashboard__top__row">
                    <div className="col">
                      <div className="icon__row">
                        <AiOutlineMoneyCollect size={20} />
                        <h3>
                          Total Earning
                        </h3>
                      </div>
                      <h5>₹ {adminBalance && adminBalance}</h5>
                    </div>
                    <div className="col">
                      <div className="icon__row">
                        <MdBorderClear size={20} />
                        <h3>All Sellers</h3>
                      </div>
                      <h5>{allSellers?.length}</h5>
                      <Link to={`/admin-all-sellers`}>
                        <h5>View Sellers</h5>
                      </Link>
                    </div>
                    <div className="col">
                      <div className="icon__row">
                        <AiOutlineMoneyCollect size={20} />
                        <h3>All Products</h3>
                      </div>
                      <h5>{products && products.length}</h5>
                      <Link to={`/admin-all-products`}>
                        <h5>View Products</h5>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="line__chart">
                <Line data={lineState} />
                </div>
    
                <div className="latest_orders">
                  <div className="dashboard_heading">
                    <h2>Latest Orders</h2>
                  </div>
                  <div className="order_container">
                    <div className="order__main">
                      <div className="box">
                        {orders &&
                          orders.map((item, i) => (
                            <Link to={`/shop/order/${item?._id}`} key={i}>
                              <div className="row" >
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
                  </div>
                </div>
              </div>
    
          </div>
        </div>
      </div>
      )
    }
    </>
  )
}

export default AdminDashboard