import React, {useState} from 'react';
import {IonIcon} from '@ionic/react'
import {bagHandleOutline, caretBackOutline, chevronDownOutline, chevronForwardOutline, closeOutline, gridOutline, heartOutline, homeOutline, logoFacebook, menuOutline, logoTwitter, logoInstagram, logoLinkedin} from "ionicons/icons"
import "../headerTop/headerTop.scss";
import {NavLink, useNavigate} from "react-router-dom"

const Navbar = ({setCartComponent, wishlist, cart}) => {
    const [mobileView, setMobileView] = useState(false);
    const [categories, setCategories] = useState(false);

    const navigate = useNavigate()

  return (
    <>
    <nav className="desktop-navigation-menu">
      <div className="container">
        <ul className="desktop-menu-category-list">
          <li className="menu-category">
            <NavLink to={"/"} className="menu-title">Home</NavLink>
          </li>

          <li className="menu-category">
          <NavLink className="menu-title">Categories</NavLink>
            <div className="dropdown-panel">
              <ul className="dropdown-panel-list">
                <li className="menu-title">
                  <NavLink to={"/electronics"} className="menu-title">Electronics</NavLink>
                </li>
                <li className="panel-list-item">
                  <NavLink to="/"></NavLink>
                  <NavLink to={"/products?searchKeyword=desktop"} className="menu-title">Desktop</NavLink>
                </li>

                <li className="panel-list-item">
                <NavLink to={"/products?searchKeyword=leptop"} className="menu-title">Laptop</NavLink>
                </li>
                <li className="panel-list-item">
                  <NavLink to={"/products?searchKeyword=camera"} className="menu-title">Camera</NavLink>
                </li>
                <li className="panel-list-item">
                  <NavLink to="/"></NavLink>
                  <NavLink to={"/products?searchKeyword=tablet"} className="menu-title">Tablet</NavLink>
                </li>
                <li className="panel-list-item">
                  <NavLink to={"/products?searchKeyword=headphone"}>Headphone</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to={"/headphone"}>
                    <img src="./eb1.jpg" alt="headphone collection" width="250"
                      height="119"/>
                  </NavLink>
                </li>

              </ul>

              <ul className="dropdown-panel-list">

                <li className="menu-title">
                  <NavLink to="/products?searchKeyword=men">Men's</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=formal">Formal</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=casual">Casual</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=sports">Sports</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=jacket">Jacket</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=sunglasses">Sunglasses</NavLink>
                </li>
                <li className="panel-list-item">
                  <NavLink to="/">
                    <img src="./eb2.jpg" alt="headphone collection" width="250"
                      height="119"/>
                  </NavLink>
                </li>

              </ul>

              <ul className="dropdown-panel-list">

                <li className="menu-title">
                  <NavLink to="/products?searchKeyword=women">Women's</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Formal">Formal</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Casual">Casual</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Perfume">Perfume</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Cosmetics">Cosmetics</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Bags">Bags</NavLink>
                </li>
                <li className="panel-list-item">
                  <NavLink to="/">
                    <img src="./eb3.jpg" alt="headphone collection" width="250"
                      height="119"/>
                  </NavLink>
                </li>
              </ul>

              <ul className="dropdown-panel-list">
                <li className="menu-title">
                  <NavLink to="/products?searchKeyword=electronic">Electronics</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Watch">Smart Watch</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=tv">Smart TV</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Keyboard">Keyboard</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Mouse">Mouse</NavLink>
                </li>

                <li className="panel-list-item">
                  <NavLink to="/products?searchKeyword=Microphone">Microphone</NavLink>
                </li>
                <li className="panel-list-item">
                  <NavLink to="/">
                    <img src="./eb4.jpg" alt="headphone collection" width="250"
                      height="119"/>
                  </NavLink>
                </li>
              </ul>

            </div>
          </li>

          <li className="menu-category">
            <NavLink to="/products?searchKeyword=men" className="menu-title">Men's</NavLink>

            <ul className="dropdown-list">

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Shirt">Shirt</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Jeans">Shorts & Jeans</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Shoes">Safety Shoes</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Wallet">Wallet</NavLink>
              </li>

            </ul>
          </li>

          <li className="menu-category">
            <NavLink to="/products?searchKeyword=Women" className="menu-title">Women's</NavLink>

            <ul className="dropdown-list">

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Dress">Dress & Frock</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Earrings">Earrings</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Necklace">Necklace</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Makeup">Makeup Kit</NavLink>
              </li>

            </ul>
          </li>

          <li className="menu-category">
            <NavLink to="/products?searchKeyword=Jewelry" className="menu-title">Jewelry</NavLink>

            <ul className="dropdown-list">

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Earrings">Earrings</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Rings">Couple Rings</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Necklace">Necklace</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Bracelets">Bracelets</NavLink>
              </li>

            </ul>
          </li>

          <li className="menu-category">
            <NavLink to="/products?searchKeyword=Perfume" className="menu-title">Perfume</NavLink>

            <ul className="dropdown-list">

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Perfume">Clothes Perfume</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Deodorant">Deodorant</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Fragrance">Flower Fragrance</NavLink>
              </li>

              <li className="dropdown-item">
                <NavLink to="/products?searchKeyword=Freshener">Air Freshener</NavLink>
              </li>

            </ul>
          </li>

          <li className="menu-category">
            <NavLink to="/Blog" className="menu-title">Blog</NavLink>
          </li>

          {/* <li className="menu-category">
            <NavLink to="/Offers" className="menu-title">Hot Offers</NavLink>
          </li> */}

        </ul>

      </div>

    </nav>

    <div className="mobile-bottom-navigation">

      <button className="action-btn" >
         <IonIcon onClick={()=>setMobileView(!mobileView)} icon={menuOutline}></IonIcon>
      </button>

      <button className="action-btn" onClick={()=>setCartComponent(true)}>
         <IonIcon icon={bagHandleOutline}></IonIcon>
        <span className="count">{cart?.length}</span>
      </button>

      <button className="action-btn" onClick={()=>navigate("/")}>
         <IonIcon icon={homeOutline}></IonIcon>
      </button>

      <button className="action-btn" onClick={()=>navigate("/pages/wishlist")}>
         <IonIcon icon={heartOutline}></IonIcon>
        <span className="count">{wishlist?.length}</span>
      </button>

      <button className="action-btn remove" >
        <IonIcon onClick={()=>setCategories(!categories)} icon={gridOutline}></IonIcon>
      </button>

    </div>


    {/* mobile menu  */}
    <>
    <nav className={mobileView ? "mobile-navigation-menu has-scrollbar active" : "mobile-navigation-menu has-scrollbar"} >
    <div className='backback'>
      <div className="menu-top">
        <h2 className="menu-title">Menu</h2>

        <button className="menu-close-btn">
          <IonIcon onClick={()=>setMobileView(false)} icon={closeOutline}></IonIcon>
        </button>
      </div>

      <ul className="mobile-menu-category-list" onClick={()=>setMobileView(false)} >

        <li className="menu-category">
          <p className="menu-title"><NavLink to="/">Home</NavLink></p>
        </li>

        <li className="menu-category">
            <p className="menu-title"><NavLink to="/products?category=Men">Men's</NavLink></p>
        </li>

        <li className="menu-category">
            <p className="menu-title"><NavLink to="/products?category=Women">Women's</NavLink></p>
        </li>

        <li className="menu-category">
            <p className="menu-title"><NavLink to="/products?category=Jewelry">Jewelry</NavLink></p>
        </li>

        <li className="menu-category">
            <p className="menu-title"><NavLink to="/products?category=Perfume">Perfume</NavLink></p>
        </li>

        <li className="menu-category">
          <p className="menu-title"><NavLink to="/blog">Blog</NavLink></p>
        </li>

        <li className="menu-category">
          <p className="menu-title"><NavLink to="/offer">Hot Offer</NavLink></p>
        </li>

      </ul>

      <div className="menu-bottom">
        <ul className="menu-category-list">
          <li className="menu-category">
            <button className="accordion-menu">
              <p className="menu-title">Language</p>
              <IonIcon className="caret-back" icon={caretBackOutline}></IonIcon>
            </button>
            <ul className="submenu-category-list">
              <li className="submenu-category">
                <NavLink to="/" className="submenu-title">English</NavLink>
              </li>
              <li className="submenu-category">
                <NavLink to="/" className="submenu-title">Espa&ntilde;ol</NavLink>
              </li>
              <li className="submenu-category">
                <NavLink to="/" className="submenu-title">Fren&ccedil;h</NavLink>
              </li>
            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu">
              <p className="menu-title">Currency</p>
              <IonIcon className="caret-back" icon={caretBackOutline}></IonIcon>
            </button>

            <ul className="submenu-category-list">
              <li className="submenu-category">
                <NavLink to="/" className="submenu-title">USD $</NavLink>
              </li>

              <li className="submenu-category">
                <NavLink to="/" className="submenu-title">EUR &euro;</NavLink>
              </li>
            </ul>
          </li>

        </ul>

        {/* social icon  */}
        <ul className="menu-social-container">
          <li>
            <NavLink to="/" className="social-link">
              <IonIcon icon={logoFacebook}></IonIcon>
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className="social-link">
              <IonIcon icon={logoTwitter}></IonIcon>
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className="social-link">
              <IonIcon icon={logoInstagram}></IonIcon>
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className="social-link">
              <IonIcon icon={logoLinkedin}></IonIcon>
            </NavLink>
          </li>

        </ul>

      </div>
    </div>
    </nav>
    <p onClick={()=>setMobileView(false)} className={mobileView ? "overlay" : ""}></p>
    </>


    {/* mobile categories  */}
    <>
    <nav className={categories ? "show-mobile-categories active" : "hide-mobile-categories" }>
    <div className='backback'>
      <div className="menu-top">
        <h2 className="menu-title">Categories</h2>

        <button className="menu-close-btn">
          <IonIcon onClick={()=>setCategories(false)} icon={closeOutline}></IonIcon>
        </button>
      </div>

      <ul className="mobile-menu-category-list">

        <li className="menu-category">
          <p className="menu-title"><NavLink to="/">Home</NavLink></p>
        </li>

        <li className="menu-category">

          <div className="accordion-menu">
            <p className="menu-title">Men's</p>
            <div>
                <IonIcon className='add-icon' icon={chevronForwardOutline}></IonIcon>
                <IonIcon className='remove-icon' icon={chevronDownOutline}></IonIcon>
            </div>
          </div>

          <ul className="submenu-category-list">
            <li className="submenu-category">
              <NavLink to="/shirt" className="submenu-title">Shirt</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Jeans" className="submenu-title">Shorts & Jeans</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Shoes" className="submenu-title">Safety Shoes</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Wallet" className="submenu-title">Wallet</NavLink>
            </li>
          </ul>

        </li>

        <li className="menu-category">

          <div className="accordion-menu" >
            <p className="menu-title">Women's</p>

            <div>
            <IonIcon className='add-icon' icon={chevronForwardOutline}></IonIcon>
            <IonIcon className='remove-icon' icon={chevronDownOutline}></IonIcon>
            </div>
          </div>

          <ul className="submenu-category-list">

            <li className="submenu-category">
              <NavLink to="/Frock" className="submenu-title">Dress & Frock</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Earrings" className="submenu-title">Earrings</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Necklace" className="submenu-title">Necklace</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Makeup" className="submenu-title">Makeup Kit</NavLink>
            </li>

          </ul>

        </li>

        <li className="menu-category">

          <div className="accordion-menu">
            <p className="menu-title">Jewelry</p>
            <div>
            <IonIcon className='add-icon' icon={chevronForwardOutline}></IonIcon>
            <IonIcon className='remove-icon' icon={chevronDownOutline}></IonIcon>
            </div>
          </div>

          <ul className="submenu-category-list">
            <li className="submenu-category">
              <NavLink to="/Earrings" className="submenu-title">Earrings</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Rings" className="submenu-title">Couple Rings</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Necklace" className="submenu-title">Necklace</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Bracelets" className="submenu-title">Bracelets</NavLink>
            </li>
          </ul>

        </li>

        <li className="menu-category">

          <div className="accordion-menu">
            <p className="menu-title">Perfume</p>

            <div>
            <IonIcon className='add-icon' icon={chevronForwardOutline}></IonIcon>
            <IonIcon className='remove-icon' icon={chevronDownOutline}></IonIcon>
            </div>
          </div>

          <ul className="submenu-category-list">
            <li className="submenu-category">
              <NavLink to="/Perfume" className="submenu-title">Clothes Perfume</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Deodorant" className="submenu-title">Deodorant</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Flower-Fragrance" className="submenu-title">Flower Fragrance</NavLink>
            </li>

            <li className="submenu-category">
              <NavLink to="/Air-Freshener" className="submenu-title">Air Freshener</NavLink>
            </li>
          </ul>

        </li>
        <li className="menu-category">
          <p className="menu-title">Blog</p>
        </li>
        <li className="menu-category">
          <p className="menu-title">Hot Offers</p>
        </li>

      </ul>
    </div>
    </nav>
    <p onClick={()=>setCategories(false)} className={categories ? "overlay" : ""}></p>
    </>

    </>
  )
}

export default Navbar