import React, { useEffect, useState } from 'react'
import "./account.scss";
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateUserInfo } from '../../../actions/userAction';
import { backend__url, server } from '../../../Server';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsCameraFill } from 'react-icons/bs';

const Account = () => {
  const { user, error } = useSelector((state)=>state.user);
  
  const [avatar, setAvatar] = useState(user?.avatar)
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber)
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit=(e)=>{
    e.preventDefault();
    const user = {
      name : name,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    }
    dispatch(updateUserInfo(user))
  }

  const handleImageChange=async(e)=>{
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    
    await axios.put(`${server}/update-user-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((res)=>{
      window.location.reload();
    }).catch((err)=>{
      console.log(err);
    })
  }


  useEffect(()=>{
    dispatch(loadUser());
    if(error){
      toast.error(error)
      dispatch({type: "clearErrors"})
    }
  },[dispatch, error])

   return (
    <div className="account__main">

        <div className="main__container">
          <div className="img__box">
            <img src={`${backend__url}/${user ? user?.avatar : avatar}`} alt="raj" />
            <div className="image__input">
              <input id='image' type="file" onChange={handleImageChange} />
              <label htmlFor="image">
                <BsCameraFill/>
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="main__input">
              <div className="input__box">
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id='fullName' 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="input__box">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="text" 
                  id='email' 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="input__box">
                <label htmlFor="phoneNumbar">Phone Number</label>
                <input 
                  type="text" 
                  id='PhoneNumber' 
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="input__box">
                <label htmlFor="zipCode">Enter Your Password</label>
                <input 
                  type="password" 
                  id='zipCode' 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="submit__button">
              <button className='btn-main'>UPDATE PROFILE</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Account