import React from "react";
import "./profileSidebar.scss";
import { RiLockPasswordLine } from "react-icons/ri";
import { LiaAddressBookSolid } from "react-icons/lia";
import { FiMap } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { BsBag, BsPerson } from "react-icons/bs";
import { LogoutUser } from "../../../actions/userAction";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";

const ProfileSidebar = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUserHandler = () => {
    dispatch(LogoutUser());
    navigate("/");
  };
console.log(active);

  return (
    <div className="profileSidebar__main">
      {user && user?.role === "Admin" && (
        <div
          className={
            active === 9 ? "profileSidebar__row active" : "profileSidebar__row"
          }
          onClick={() => setActive(9) || navigate("/admin-dashboard")}
        >
          <div className="sidebar__header">
            <span>
              <GrUserAdmin />
            </span>
            <span>Admin Pennel</span>
          </div>
        </div>
      )}
      <div
        className={
          active === 1 ? "profileSidebar__row active" : "profileSidebar__row"
        }
        onClick={() => setActive(1)}
      >
        <div className="sidebar__header">
          <span className="icon">
            <BsPerson />
          </span>
          <span className="text">Profile</span>
        </div>
      </div>

      <div
        className={
          active === 2 ? "profileSidebar__row active" : "profileSidebar__row"
        }
        onClick={() => setActive(2)}
      >
        <div className="sidebar__header">
          <span>
            <BsBag />
          </span>
          <span>Orders</span>
        </div>
      </div>

      <div
        className={
          active === 3 ? "profileSidebar__row active" : "profileSidebar__row"
        }
        onClick={() => setActive(3)}
      >
        <div className="sidebar__header">
          <span>
            <HiOutlineReceiptRefund />
          </span>
          <span>Refund</span>
        </div>
      </div>

      <div
        className={
          active === 4 ? "profileSidebar__row active" : "profileSidebar__row"
        }
        onClick={() => setActive(4)}
      >
        <div className="sidebar__header">
          <span>
            <FiMap />
          </span>
          <span>Track Orders</span>
        </div>
      </div>

      <div
        className={
          active === 5 ? "profileSidebar__row active" : "profileSidebar__row"
        }
        onClick={() => setActive(5)}
      >
        <div className="sidebar__header">
          <span>
            <RiLockPasswordLine />
          </span>
          <span>Password Change</span>
        </div>
      </div>

      <div
        className={
          active === 6 ? "profileSidebar__row active" : "profileSidebar__row"
        }
        onClick={() => setActive(6)}
      >
        <div className="sidebar__header">
          <span>
            <LiaAddressBookSolid />
          </span>
          <span>Address</span>
        </div>
      </div>

      <div
        className={
          active === 7 ? "profileSidebar__row active" : "profileSidebar__row"
        }
        onClick={() => setActive(7) || logoutUserHandler()}
      >
        <div className="sidebar__header">
          <span>
            <AiOutlineLogout />
          </span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
