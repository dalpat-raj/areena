import React, { useState } from 'react'
import {IonIcon} from "@ionic/react"
import { chevronForwardOutline, chevronDownOutline } from "ionicons/icons"
import "./footer.scss";
import { Link } from 'react-router-dom';
import { AiFillYoutube, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

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
                    Arinaa Enterprise provides you more products in less budget and that too of good quality. Here you can buy your favorite products.
                    </p>
                    <h4>KEEP IN TOUCH</h4>
                    <div className="social__icon">
                        <div className="icon">
                            <BsFacebook/>
                        </div>
                        <div className="icon">
                            <AiOutlineTwitter/>
                        </div>
                        <div className="icon">
                            <Link to={"https://instagram.com/areena_mart?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"}><AiOutlineInstagram/></Link>
                        </div>
                        <div className="icon">
                            <Link to={"https://www.youtube.com/@areenaseries"}><AiFillYoutube/></Link>
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
                        <li><Link to={"/contact"}>Contact Us</Link></li>
                    </ul>
                </div>
                <div className="box borr">
                    <button onClick={()=>setFooterCtgg(!footerCtgg)} className="accordion-menuu">
                        <h4>Additional</h4>
                        <div>
                        <IonIcon className={footerCtgg ? "hide-icon" : "open-icon"} icon={chevronForwardOutline}></IonIcon>
                        <IonIcon className={footerCtgg ? "close-icon" : "hide-icon"} icon={chevronDownOutline}></IonIcon>
                        </div>
                    </button>
                    <ul className={footerCtgg ? "category-list-show" : "category-list"}>
                        <li><Link to={"/privacy-policy"}>Privacy Policy</Link></li>
                        <li><Link to={"/terms-conditions"}>Terms & conditions</Link></li>
                        <li><Link to={"/shipping-return"}>Shipping & Return</Link></li>
                        <li>help & FAQs</li>
                        <li><Link to={"/refund-policy"}>Refund Policy</Link></li>
                        <li><Link to={"/coustomer-services"}>Customer Service</Link></li>
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
            <p>© 2024, AREENAA ENTERPRISE. All Rights Reserved.</p>
            <div className="img" >
                <img style={{width:"310px"}} src="/pay.png" alt="" />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Footer