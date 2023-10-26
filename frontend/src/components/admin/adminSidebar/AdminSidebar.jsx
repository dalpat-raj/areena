import React from 'react';
import { Link } from "react-router-dom";
import {RxDashboard} from "react-icons/rx";
import {AiOutlineFolderAdd} from "react-icons/ai"
import {FiPackage, FiShoppingBag} from "react-icons/fi";
import {MdOutlineLocalOffer} from 'react-icons/md'
import {VscNewFile} from "react-icons/vsc"
import {CiMoneyBill, CiSettings} from "react-icons/ci"

import "./adminSidebar.scss";

const AdminSidebar = ({active, setActive}) => {
    
  return (
    <div className="adminSidebar__main">

    <div onClick={()=>setActive(1)} className={active === 1 ? "adminSidebar__row active" : "adminSidebar__row"}>
        <Link to={`/admin-dashboard`}>
            <div className='sidebar__header'>
                <div className='icon'><RxDashboard/></div>
                <div className='icon_text'>Dashboard</div>
            </div>
        </Link>
    </div>

    <div onClick={()=>setActive(2)} className={active === 2 ? "adminSidebar__row active" : "adminSidebar__row"}>
        <Link to={`/admin-all-products`}>
            <div className='sidebar__header'>
                <div className='icon'><AiOutlineFolderAdd/></div>
                <div className='icon_text'>All Product</div>
            </div>
        </Link>
    </div>

    <div onClick={()=>setActive(3)} className={active === 3 ? "adminSidebar__row active" : "adminSidebar__row"}>
        <Link to={`/admin-all-orders`}>
            <div className='sidebar__header'>
                <div className='icon'><FiShoppingBag/></div>
                <div className='icon_text'>All Orders</div>
            </div>
        </Link>
    </div>

    <div onClick={()=>setActive(4)} className={active === 4 ? "adminSidebar__row active" : "adminSidebar__row"}>
        <Link to={"/admin-all-sellers"}>
            <div className='sidebar__header'>
                <div className='icon'><FiPackage/></div>
                <div className='icon_text'>All Seller</div>
            </div>
        </Link>
    </div>

   

    <div className={active === 5 ? "adminSidebar__row active" : "adminSidebar__row"}>
        <Link to={"/admin-all-users"}>
            <div className='sidebar__header'>
                <div className='icon'><MdOutlineLocalOffer/></div>
                <div className='icon_text'>All Users</div>
            </div>
        </Link>
    </div>

    <div className={active === 6 ? "adminSidebar__row active" : "adminSidebar__row"}>
        <Link to={"/admin-all-events"}>
            <div className='sidebar__header'>
                <div className='icon'><VscNewFile/></div>
                <div className='icon_text'>All Event</div>
            </div>
        </Link>
    </div>

    <div className={active === 7 ? "adminSidebar__row active" : "adminSidebar__row"}>
        <Link to={"/admin-withdraw-request"}>
            <div className='sidebar__header'>
                <div className='icon'><CiMoneyBill/></div>
                <div className='icon_text'>Withdraw Request</div>
            </div>
        </Link>
    </div>

    <div className={active === 8 ? "adminSidebar__row active" : "adminSidebar__row"}>
        <Link to={"/admin-setting"}>
            <div className='sidebar__header'>
                <div className='icon'><CiSettings/></div>
                <div className='icon_text'>Setting</div>
            </div>
        </Link>
    </div>

    </div>
  )
}

export default AdminSidebar