import React from 'react'
import Account from '../account/Account'
import Orders from '../ordres/Orders'
import "./profileContent.scss";
import RefundOrder from '../ordres/RefundOrder';
import TrackOrder from '../ordres/TrackOrder';
import Address from '../address/Address';
import PasswordChange from '../passwordChange/PasswordChange';
import Inbox from '../inbox/Inbox';

const ProfileContent = ({active}) => {
  return (
    <>
    {/* profile component  */}
    {
        active === 1 && (
            <div className="box__container">
                <Account />
            </div>
        )
    }

    {/* { oreder component } */}
    {
        active === 2 && (
            <div className="box__container">
                <Orders />
            </div>
        )
    }

    {/* { refund component } */}
    {
        active === 3 && (
            <div className="box__container">
                <RefundOrder/>
            </div>
        )
    }

     {/* { Track Order component } */}
     {
        active === 4 && (
            <div className="box__container">
                <Inbox/>
            </div>
        )
    }

     {/* { Track Order component } */}
     {
        active === 5 && (
            <div className="box__container">
                <TrackOrder/>
            </div>
        )
    }

    {/* { Payment Methods component } */}
    {
        active === 6 && (
            <div className="box__container">
                <PasswordChange/>
            </div>
        )
    }

    
    {/* { Addres component } */}
    {
        active === 7 && (
            <div className="box__container">
                <Address/>
            </div>
        )
    }

    {/* { Logout component } */}
    {
        active === 8 && (
            <div className="box__container">
                <h2>Logout Success</h2>
            </div>
        )
    }

    

    </>
  )
}

export default ProfileContent