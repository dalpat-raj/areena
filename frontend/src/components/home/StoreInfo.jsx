import React from 'react';
import {IonIcon} from "@ionic/react"
import { cubeOutline, callOutline, reloadOutline, shieldCheckmarkOutline} from "ionicons/icons"
import "./storeinfo.scss";

const StoreInfo = () => {
  return (
    <div className="storeinfo__main">
        <div className="container">
            <div className="row">
                <div className="box">
                    <div className="icon">
                        <IonIcon icon={cubeOutline}/>
                    </div>
                    <div className="storeinfo__text">
                        <p>FREE DELIVERY</p>
                        <span>for all orders over $120</span>
                    </div>
                </div>
                <div className="box">
                    <div className="icon">
                        <IonIcon icon={callOutline}/>
                    </div>
                    <div className="storeinfo__text">
                        <p>24/7 help center</p>
                        <span>dedicated 24/7 support</span>
                    </div>
                </div>
                <div className="box">
                    <div className="icon">
                        <IonIcon icon={reloadOutline}/>
                    </div>
                    <div className="storeinfo__text">
                        <p>satisfied or refunded</p>
                        <span>free returns within 14 days</span>
                    </div>
                </div>
                <div className="box">
                <div className="icon">
                        <IonIcon icon={shieldCheckmarkOutline}/>
                    </div>
                    <div className="storeinfo__text">
                        <p>100% secure payments</p>
                        <span>accept all payment methods</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StoreInfo