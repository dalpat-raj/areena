import React, { useEffect, useState } from 'react';
import AdminSidebar from "../adminSidebar/AdminSidebar";
import "../adminAllProducts/adminAllProducts.scss";
import { useDispatch, useSelector } from "react-redux"

import ProductCard from '../../home/ProductCard';
import { getAllEventUser } from '../../../actions/eventAction';


const AdminAllEvents = () => {
    const {event} = useSelector((state)=>state.events)

    const [active, setActive] = useState(6)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllEventUser());
    },[dispatch]);

  return (
    <div className="admin__container">
    <div className="container">
      <div className="dashboard__row">
        <div className="col__2 dashboard__sidebar">
          <AdminSidebar active={active} setActive={setActive}/>
        </div>
       
        <div className="col__2 admin__products">
            <div className="products__row">
            {
                event && event.map((item, i)=>(
                    <ProductCard products={item} key={i}/>
                ))
            }
            </div>
            {
              event?.length === 0 && (
                <div className="nowithdraw">
                <p>This time no event running by any sellres</p>
              </div>
              )
            }
           
        </div>

      </div>
    </div>
  </div>
  )
}

export default AdminAllEvents