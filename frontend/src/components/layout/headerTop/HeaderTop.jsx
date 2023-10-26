import React from "react";
import "./headerTop.scss";

const HeaderTop = () => {
  return (
    <header>
      <div className="header-top">
        <div className="container row">
          <p className="service-time">AVAILABLE 24/7 AT +566 4444 9940</p>

          <div className="header-alert-news">
            <p>Free Shipping This Week Order Over - $55</p>
          </div>

          <div className="header-top-actions">
            <select name="currency">
              <option value="usd">USD $</option>
              <option value="eur">EUR &euro;</option>
            </select>

            <select name="language">
              <option value="en-US">English</option>
              <option value="es-ES">Espa&ntilde;ol</option>
              <option value="fr">Fran&ccedil;ais</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;
