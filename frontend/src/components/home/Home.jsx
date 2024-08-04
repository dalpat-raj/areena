import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./home.scss";
import ExploreTopCategories from "./ExploreTopCategories";
import NewArrival from "./NewArrival";
import MoreToExplore from "./MoreToExplore";
import TopSeller from "./TopSeller";
import StoreInfo from "./StoreInfo";
import Event from "./Event";
import Footer from "../layout/footer/Footer";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="home__section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Areenaa Online Shopping India</title>
        <meta name="description" content="Online Shopping India - Buy clothing, laptops, camera, T-shirt, watches, apparel, shoes. Free Shipping & Cash on Delivery" />
        <link rel="canonical" href={`https://areenaa.in`} />
      </Helmet>
      <div className="container__fluid">
        <div className="home__carousel">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showIndicators={true}
            showStatus={false}
            transitionTime={"0"}
            renderArrowPrev={() => false}
            renderArrowNext={() => false}
            emulateTouch={false}
            preventMovementUntilSwipeScrollTolerance={true}
            verticalSwipe={"natural"}
          >
            <div className="box__1">
              <div className="hero__text ">
                <p>NEW COLLETION</p>
                <h2>Luxury Brands</h2>
                <h2 className="sub__heading">Without Labels</h2>
                <button className="btn-main">SHOP NOW</button>
              </div>
            </div>
            <div className="box__2">
              <div className="hero__text">
                <h2>
                  Making <br />
                  Bold Moves
                </h2>
                <p>Upgrade your wardrobe with a variation of styles</p>
                <div className="btn__box">
                  <button className="btn-main">SHOP WOMEN</button>
                  <button className="btn-sec">SHOP MEN</button>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="container">
        <ExploreTopCategories />
      </div>
      <div className="container">
        <NewArrival />
      </div>
      <div className="container__fluid">
        <MoreToExplore />
      </div>
      <div className="container__fluid">
        <Event />
      </div>
      <div className="container">
        <TopSeller />
      </div>
      <div className="container__fluid">
        <StoreInfo />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
