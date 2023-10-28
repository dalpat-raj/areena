import React from 'react'
import ShopInfo from './shopInfo/ShopInfo';
import "./shopHomePage.scss";
import ShopProfileData from './shoopProfileData/ShopProfileData';

const ShopHomePage = () => {

  return (
    <div className="shopHomePage">
      <div className="container">
        <div className="shophomepage_row">
          <div className="col__2">
            <ShopInfo isOwner={true}/>
          </div>
          <div className="col__2 shop_profile_data">
            <ShopProfileData isOwner={true}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopHomePage