import React, { useState } from 'react'
import {IonIcon} from "@ionic/react"
import { logoFacebook, logoInstagram, logoTwitter, logoYoutube, chevronForwardOutline, chevronDownOutline } from "ionicons/icons"
import "./footer.scss";
import { Link } from 'react-router-dom';

const Footer = () => {

    const [footerCtg, setFooterCtg] = useState(false)
    const [footerCtgg, setFooterCtgg] = useState(false)

  return (
    <div className='footer__main'>
        <div className="container">
            <div className="row">
                <div className="box borr">
                    <div className="logo">
                        <img src="/logo.png" alt="" />
                    </div>
                    <p className="description">
                        Ut enim ad minim veniam, quis nostrud
                        exercitation laboris nisi ut aliquip ex ea
                        commodo consequat.Ut enim ad minim
                        veniam,quis nostrud exercitation
                    </p>
                    <h4>KEEP IN TOUCH</h4>
                    <div className="social__icon">
                        <div className="icon">
                            <IonIcon icon={logoFacebook}/>
                        </div>
                        <div className="icon">
                            <IonIcon icon={logoTwitter}/>
                        </div>
                        <div className="icon">
                            <IonIcon icon={logoInstagram}/>
                        </div>
                        <div className="icon">
                            <IonIcon icon={logoYoutube}/>
                        </div>
                    </div>
                </div>
                <div className="box borr">
                    <button onClick={()=>setFooterCtg(!footerCtg)} className="accordion-menuu">
                        <h4>INFORMATION</h4>
                        <div>
                        <IonIcon className={footerCtg ? "hide-icon" : "open-icon"} icon={chevronForwardOutline}></IonIcon>
                        <IonIcon className={footerCtg ? "close-icon" : "hide-icon"} icon={chevronDownOutline}></IonIcon>
                        </div>
                    </button>
                    <ul className={footerCtg ? "category-list-show" : "category-list"}>
                        <li>latest news</li>
                        <li><Link to={"/shop-login"}>login seller</Link></li>
                        <li>career</li>
                        <li><Link to={"/account"}>my account</Link></li>
                        <li>My cart</li>
                        <li>Orders and returns</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="box borr">
                    <button onClick={()=>setFooterCtgg(!footerCtgg)} className="accordion-menuu">
                        <h4>Women's</h4>
                        <div>
                        <IonIcon className={footerCtgg ? "hide-icon" : "open-icon"} icon={chevronForwardOutline}></IonIcon>
                        <IonIcon className={footerCtgg ? "close-icon" : "hide-icon"} icon={chevronDownOutline}></IonIcon>
                        </div>
                    </button>
                    <ul className={footerCtgg ? "category-list-show" : "category-list"}>
                        <li><Link to={"/privacy-policy"}>privacy policy</Link></li>
                        <li>Terms & conditions</li>
                        <li>shipping & Returns</li>
                        <li>help & FAQs</li>
                        <li>refund policy</li>
                        <li><Link to={"/coustomer-services"}>customer service</Link></li>
                    </ul>
                </div>
                <div className="box">
                    <h4>newsletter</h4>
                    <p className='description'>
                        Enter your email to receive daily news and get 20%
                        off coupon for all items. NO spam, we promise
                    </p>
                    <div className="input__box">
                        <input type="text" placeholder='Email address'/>
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
            </div>
        <div className="bottom__header">
            <p>© 2023, AREENA. All Rights Reserved.</p>
            <div className="img" >
                <img style={{width:"310px"}} src="/pay.png" alt="" />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer