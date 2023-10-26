import React, { useEffect, useState } from 'react'
import AdminSidebar from '../adminSidebar/AdminSidebar';
import {useDispatch, useSelector} from "react-redux"
import { backend__url } from '../../../Server';
import { getAllUsersForAdmin } from '../../../actions/userAction';

const AdminAllUsers = () => {
    const {allUsers, error} = useSelector((state)=>state.user);
    const [active, setActive] = useState(5);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllUsersForAdmin());
        if(error){
            alert(error)
            dispatch({ type: "clearErrors" });
        }
    },[dispatch, error])
  
  return (
    <div className="admin__container">
    <div className="container">
      <div className="dashboard__row">
        <div className="col__2 dashboard__sidebar">
          <AdminSidebar active={active} setActive={setActive}/>
        </div>
       
        <div className="col__2 admin__sellers">
            {
                allUsers && allUsers?.map((item)=>(
                    <div className="seller__row">
                        <div className="img__name__box">
                            <img src={`${backend__url}/${item?.avatar}`} alt={item?.shopName} />
                            <div className="name">
                            <p>Name : {item?.name}</p>
                            </div>
                        </div>
                        
                        <div className="phone__email__address">
                            <p>Phone : {item?.phoneNumber}</p>
                            <p>Email : {item?.email}</p>
                            <p>Address : {item?.addresses[0]?.address1},{item?.addresses[0]?.address2}, {item?.addresses[0]?.zipCode}</p>
                        </div>
                    </div>
                ))
            }
        </div>

      </div>
    </div>
  </div>
  )
}

export default AdminAllUsers