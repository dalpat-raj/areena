import React, { useEffect } from "react";
import "./shopDashboard.scss";
import DashboardSidebar from "../dashboardSidebar/DashboardSidebar";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../../actions/orderAction";
import { getAllProductsShop } from "../../../actions/productAction";
import { backend__url } from "../../../Server";
import { Doughnut, Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
);

const ShopDashboard = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller?._id]);

  const availableBalance = seller?.availableBalance;

  let outOfStock = 0;

  products &&
    products?.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial", "Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#E13E50"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, availableBalance],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#E13E50", "#333"],
        hoverBackgroundColor: ["#35014F", "#4B5000"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard__container">
      <div className="container">
        <div className="dashboard__row">
          <div className="col__2 dashboard__sidebar">
            <DashboardSidebar active={1} />
          </div>

          <div className="col__2 profile__content">
            <div className="dashboard_heading">
              <h2>Overview</h2>
            </div>
            <div className="dashboard__content">
              <div className="dashboard__top__row">
                <div className="col col_1">
                  <div className="icon__row">
                    <AiOutlineMoneyCollect size={20} />
                    <h3>
                      Account Balance <span>(with 10% service charge)</span>
                    </h3>
                  </div>
                  <h5>₹ {availableBalance && availableBalance}</h5>
                  <Link to={`dashboard-withdraw-money`}>
                    <h5>Withdraw Money</h5>
                  </Link>
                </div>
                <div className="col col_2">
                  <div className="icon__row">
                    <MdBorderClear size={20} />
                    <h3>All Orders</h3>
                  </div>
                  <h5>{orders && orders?.length}</h5>
                  <Link to={`/shop-dashboard/orders`}>
                    <h5>View Orders</h5>
                  </Link>
                </div>
                <div className="col col_3">
                  <div className="icon__row">
                    <AiOutlineMoneyCollect size={20} />
                    <h3>All Products</h3>
                  </div>
                  <h5>{products && products?.length}</h5>
                  <Link to={`/shop-dashboard/products`}>
                    <h5>View Products</h5>
                  </Link>
                </div>
              </div>
            </div>

            <div className="chart__container">
              <div className="lineChart">
                <Line data={lineState} />
              </div>

              <div className="doughnutChart">
                <Doughnut data={doughnutState} />
              </div>
            </div>

            <div className="latest_orders">
              <div className="dashboard_heading">
                <h2>Latest Orders</h2>
              </div>
              {orders?.length !== 0 && (
                <div className="order_container">
                  <div className="order__main">
                    <div className="box">
                      {orders &&
                        orders?.map((item, i) => (
                          <Link to={`/shop/order/${item?._id}`} key={i}>
                            <div className="row">
                              <div className="img_name">
                                {item?.cart?.map((item, i) => (
                                  <div className="img_name_row" key={i}>
                                    <img
                                      src={`${backend__url}/${item?.images[0]}`}
                                      alt="raj"
                                    />
                                    <p>
                                      {item?.name?.length >= 25
                                        ? `${item?.name?.slice(0, 25)}...`
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;
