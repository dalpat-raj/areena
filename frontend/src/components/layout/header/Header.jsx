import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  personOutline,
  searchOutline,
  heartOutline,
  bagHandleOutline,
  closeOutline,
} from "ionicons/icons";
import "../headerTop/headerTop.scss";
import Navbar from "../navbar/Navbar";
import Search from "../../products/search/Search";
import { useNavigate } from "react-router";
import Cart from "../../Cart/Cart";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPerson } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineFolderAdd } from "react-icons/ai";
// start

const Header = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [searchComponent, setSearchComponent] = useState(false);
  const [cartComponent, setCartComponent] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isSeller ? (
        <div className="header-main">
          <div className="container seller__header">
            <NavLink to={"/shop-dashboard"} className="header-logo col__2">
              <img src="/logo.png" alt="" />
            </NavLink>

            <div className="col__2">
              <div className="header-user-actions">
                <button className="action-btn">
                  <Link to={`/shop-dashboard`}>
                    <RxDashboard color="#333" />
                  </Link>
                </button>
                <button className="action-btn">
                  <Link to={`/shop-dashboard/orders`}>
                    <FiShoppingBag color="#333" />
                  </Link>
                </button>
                <button className="action-btn">
                  <Link to={`/shop-dashboard/products`}>
                    <FiPackage color="#333" />
                  </Link>
                </button>
                <button className="action-btn">
                  <Link to={`/shop-dashboard-messages`}>
                    <BiMessageSquareDetail color="#333" />
                  </Link>
                </button>
                <button className="action-btn">
                  <Link to={`/shop-profile/${seller?._id}`}>
                    <BsPerson color="#333" />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : user?.role === "Admin" ? (
        <div className="header-main">
          <div className="container seller__header">
            <NavLink to={"/admin-dashboard"} className="header-logo col__2">
              <img src="/logo.png" alt="" />
            </NavLink>

            <div className="col__2">
              <div className="header-user-actions">
                <button className="action-btn">
                  <Link to={`/admin-dashboard`}>
                    <RxDashboard color="#333" />
                  </Link>
                </button>
                <button className="action-btn">
                  <Link to={`/admin-all-orders`}>
                    <FiShoppingBag color="#333" />
                  </Link>
                </button>
                <button className="action-btn">
                  <Link to={`/admin-all-sellers`}>
                    <FiPackage color="#333" />
                  </Link>
                </button>
                <button className="action-btn">
                  <Link to={`/admin-all-products`}>
                    <AiOutlineFolderAdd color="#333" />
                  </Link>
                </button>
                <button className="action-btn">
                  <Link to={`/account`}>
                    <BsPerson color="#333" />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-main">
          <div className="container">
            <NavLink to={"/"} className="header-logo">
              <img src="/logo.png" alt="" />
            </NavLink>

            <div>
              <Navbar />
            </div>

            <div className="header-user-actions">
              <button className="action-btn">
                <IonIcon
                  onClick={() => setSearchComponent(true)}
                  icon={searchOutline}
                ></IonIcon>

                {/* search components call    */}

                <div
                  className={
                    searchComponent
                      ? "mobile_serach_navigation active"
                      : "mobile_serach_navigation"
                  }
                >
                  <div className="serach__header">
                    <h2>Search Products</h2>
                    <div className="icon">
                      <IonIcon
                        onClick={() => setSearchComponent(false)}
                        icon={closeOutline}
                      />
                    </div>
                  </div>
                  <Search setSearchComponent={setSearchComponent} />
                </div>
                <p
                  onClick={() => setSearchComponent(false)}
                  className={searchComponent ? "overlay" : ""}
                ></p>
              </button>

              <button className="action-btn">
                {isAuthenticated === true ? (
                  <IonIcon
                    onClick={() => navigate("/account")}
                    icon={personOutline}
                  ></IonIcon>
                ) : (
                  <IonIcon
                    onClick={() => navigate("/login")}
                    icon={personOutline}
                  ></IonIcon>
                )}
              </button>

              <button
                className="action-btn"
                onClick={() => navigate("/pages/wishlist")}
              >
                <IonIcon icon={heartOutline}></IonIcon>
                <span className="count">{wishlist ? wishlist.length : 0}</span>
              </button>

              <button className="action-btn">
                <IonIcon
                  onClick={() => setCartComponent(true)}
                  icon={bagHandleOutline}
                ></IonIcon>
                <span className="count">{cart ? cart.length : 0}</span>

                {/* search components call    */}

                <div
                  className={
                    cartComponent
                      ? "mobile_serach_navigation active"
                      : "mobile_serach_navigation"
                  }
                >
                  <div className="serach__header">
                    <h2>Your Cart Item's</h2>
                    <div className="icon">
                      <IonIcon
                        onClick={() => setCartComponent(false)}
                        icon={closeOutline}
                      />
                    </div>
                  </div>
                  <Cart setCartComponent={setCartComponent} />
                </div>
                <p
                  onClick={() => setCartComponent(false)}
                  className={cartComponent ? "overlay" : ""}
                ></p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
