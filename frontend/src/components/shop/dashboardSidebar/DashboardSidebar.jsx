import React from 'react';
import { Link } from "react-router-dom";
import {AiOutlineFolderAdd, AiOutlineGift} from "react-icons/ai"
import {FiPackage, FiShoppingBag} from "react-icons/fi";
import {MdOutlineLocalOffer} from 'react-icons/md'
import {VscNewFile} from "react-icons/vsc"
import {CiMoneyBill, CiSettings} from "react-icons/ci"
import {BiMapPin, BiMessageSquareDetail} from "react-icons/bi"
import {HiOutlineReceiptRefund} from 'react-icons/hi'
import "./dashboardSidebar.scss";
import { RxDashboard } from 'react-icons/rx';

const DashboardSidebar = ({active}) => {
    
  return (
    <div className="dashboardSidebar__main">

    <div className={active === 1 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard"}>
            <div className='sidebar__header'>
                <div className='icon'><RxDashboard/></div>
                <div className='text'>Dashboard</div>
            </div>
        </Link>
      
    </div>

    <div className={active === 2 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard/orders"}>
            <div className='sidebar__header'>
                <div className='icon'><FiShoppingBag/></div>
                <div className='text'>All Orders</div>
            </div>
        </Link>
    </div>

    <div className={active === 3 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard/products"}>
            <div className='sidebar__header'>
                <div className='icon'><FiPackage/></div>
                <div className='text'>All Products</div>
            </div>
        </Link>
    </div>

    <div className={active === 4 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard-create-product"}>
            <div className='sidebar__header'>
                <div className='icon'><AiOutlineFolderAdd/></div>
                <div className='text'>Create Product</div>
            </div>
        </Link>
    </div>

    <div className={active === 5 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard-events"}>
            <div className='sidebar__header'>
                <div className='icon'><MdOutlineLocalOffer/></div>
                <div className='text'>All Events</div>
            </div>
        </Link>
    </div>

    <div className={active === 6 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard-create-event"}>
            <div className='sidebar__header'>
                <div className='icon'><VscNewFile/></div>
                <div className='text'>Create Event</div>
            </div>
        </Link>
    </div>

    <div className={active === 7 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard-withdraw-money"}>
            <div className='sidebar__header'>
                <div className='icon'><CiMoneyBill/></div>
                <div className='text'>Withdraw Money</div>
            </div>
        </Link>
    </div>

    <div className={active === 8 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard-coupon-code"}>
            <div className='sidebar__header'>
                <div className='icon'><AiOutlineGift/></div>
                <div className='text'>Discount Codes</div>
            </div>
        </Link>
    </div>

    <div className={active === 9 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard-refund"}>
            <div className='sidebar__header'>
                <div className='icon'><HiOutlineReceiptRefund/></div>
                <div className='text'>Refunds</div>
            </div>
        </Link>
    </div>

    <div className={active === 10 ? "dashboardSidebar__row active" : "dashboardSidebar__row"}>
        <Link to={"/shop-dashboard-setting"}>
            <div className='sidebar__header'>
                <div className='icon'><CiSettings/></div>
                <div className='text'>Setting</div>
            </div>
        </Link>
    </div>

    </div>
  )
}

export default DashboardSidebar