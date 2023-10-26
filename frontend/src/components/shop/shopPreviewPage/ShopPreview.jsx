import React, { useEffect } from 'react'
import ShopInfo from '../shopHomePage/shopInfo/ShopInfo';
import ShopProfileData from '../shopHomePage/shoopProfileData/ShopProfileData';
import "./shopPreview.scss";

const ShopPreview = () => {
  useEffect(()=>{
    window.scrollTo({
      top: 0,
    })
  },[])
  return (
    <div className="shopPreviewPage">
    <div className="container">
      <div className="shophomepage_row">
        <div className="col__2">
          <ShopInfo isOwner={false}/>
        </div>
        <div className="col__2">
          <ShopProfileData isOwner={false}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ShopPreview