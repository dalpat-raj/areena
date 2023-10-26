import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import DashboardSidebar from '../../dashboardSidebar/DashboardSidebar'
import Loader from '../../../layout/loader/Loader';
import { deleteShopEvent, getAllEventShop } from '../../../../actions/eventAction'
import "./shopAllEvent.scss";
import { backend__url } from '../../../../Server';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';

const ShopAllEvent = () => {

  const { seller} = useSelector((state)=>state.seller);
  const { event, isLoading} = useSelector((state)=>state.events);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useDispatch();

  const handleDelete=(id)=>{
    dispatch(deleteShopEvent(id));
    dispatch(getAllEventShop(seller?._id));
    setConfirmDelete(false)
  }


  useEffect(()=>{
    dispatch(getAllEventShop(seller?._id))
  },[seller, dispatch])

  return (
    <div className="dashboard__container">
    <div className="container">
      <div className="dashboard__row">
        <div className="col__2 dashboard__sidebar">
          <DashboardSidebar active={5}/>
        </div>
        
        {isLoading ? (
           <Loader />
        ) : (
          <div className="col__2">
            {
              event && event?.map((item,i)=>(
                <>
                <div className="shop__event__row" key={i}>
                  <div className="img__details">
                  <div className="img__box">
                    <img src={`${backend__url}/${item?.images[0]}`} alt={item?.name} />
                  </div>
                  <div className="details">
                  <p>Name: <span>{item?.name?.length >= 75 ? item?.name?.slice(0, 75) + "..." : item?.name}</span></p>
                    <p>Category: <span>{item?.category}</span></p>
                    <p>brand: <span>{item?.brand}</span></p>
                    <p>riginal price: <span>₹{item?.originalPrice}</span></p>
                    <p>selling price: <span>₹{item?.sellingPrice}</span></p>
                    <p>stock: <span>{item?.stock}</span></p>
                    <p>sold: <span>{item?.sold_out}</span></p>
                    <p>start date: <span>{item?.start_date?.slice(0,10)}</span></p>
                    <p>end date: <span>{item?.end_date?.slice(0,10)}</span></p>
                  </div>
                  </div>
                  <div className="delete__icon">
                    <AiOutlineDelete onClick={()=>setConfirmDelete(true)}/>
                  </div>
                </div>
                {
                    confirmDelete && (
                      <>
                      <div className="confirm__delete">
                        <p>Are you sure to confirm delete ?</p>
                        <div className="btn_box">
                          <button className='btn-sec' onClick={()=>setConfirmDelete(false)}>Cancle</button>
                          <button className='btn-sec' onClick={()=>handleDelete(item?._id)}>Delete</button>
                        </div>
                        <div className="false_icon">
                          <RxCross2 onClick={()=>setConfirmDelete(false)} />
                        </div>
                      </div>
                      <p className='overlay' onClick={()=>setConfirmDelete(false)}></p>
                      </>
                    )
                  }
                </>
              ))
            }
          </div>
        )}

      </div>
    </div>
  </div>
  )
}

export default ShopAllEvent