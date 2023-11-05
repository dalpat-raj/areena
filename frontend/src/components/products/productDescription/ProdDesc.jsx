import React, { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDownOutline, chevronForwardOutline } from "ionicons/icons";
import "./prodDesc.scss";
import { Link, useSearchParams } from "react-router-dom";
import { backend__url } from "../../../Server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../../actions/productAction";
import Rating from "../../layout/rating/Rating";

const ProdDesc = ({ data }) => {
  const { products } = useSelector((state) => state.products);

  const [details, setDetails] = useState("");

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  
  useEffect(() => {
    if(eventData === true) {
      dispatch(getAllProductsShop(data?.shop?._id));
    }
  }, [dispatch, data, eventData]);


  useEffect(() => {
    if (data?.details) {
      setDetails(data?.details);
    }
  }, [data]);

  const descriptionTab = useRef(null);
  const shippingTab = useRef(null);
  const reviewTab = useRef(null);
  const shopTab = useRef(null);

  // current active button
  const descTab = useRef(null);
  const shipTab = useRef(null);
  const reviTab = useRef(null);
  const geneTab = useRef(null);

  // mobile view state
  const [desc, setDesc] = useState(false);
  const [ship, setShip] = useState(false);
  const [revi, setRevi] = useState(false);
  const [shop, setShop] = useState(false);

  // desktop view
  const switchTabs = (e, tab) => {
    if (tab === "description") {
      descTab.current.classList.add("shiftToNeutral");
      shipTab.current.classList.add("shiftToRight");
      reviTab.current.classList.add("shiftToRight");
      geneTab.current.classList.add("shiftToRight");

      descriptionTab.current.classList.add("shiftToNeutralForm");
      descriptionTab.current.classList.remove("shiftToLeft");
      shippingTab.current.classList.remove("shiftToNeutralForm");
      reviewTab.current.classList.remove("shiftToNeutralForm");
      shopTab.current.classList.remove("shiftToNeutralForm");
      shippingTab.current.classList.add("shiftToLeft");
      reviewTab.current.classList.add("shiftToLeft");
      shopTab.current.classList.add("shiftToLeft");
    }

    if (tab === "shipping") {
      shipTab.current.classList.add("shiftToNeutral");
      descTab.current.classList.remove("shiftToNetural");
      reviTab.current.classList.remove("shiftToNetural");
      geneTab.current.classList.remove("shiftToNetural");

      shippingTab.current.classList.remove("shiftToLeft");
      shippingTab.current.classList.add("shiftToNeutralForm");
      descriptionTab.current.classList.remove("shiftToNeutralForm");
      reviewTab.current.classList.remove("shiftToNeutralForm");
      shopTab.current.classList.remove("shiftToNeutralForm");
      descriptionTab.current.classList.add("shiftToLeft");
      reviewTab.current.classList.add("shiftToLeft");
      shopTab.current.classList.add("shiftToLeft");
    }

    if (tab === "review") {
      reviTab.current.classList.add("shiftToNeutral");
      descTab.current.classList.remove("shiftToNetural");
      shipTab.current.classList.remove("shiftToNetural");
      geneTab.current.classList.remove("shiftToNetural");

      reviewTab.current.classList.remove("shiftToLeft");
      reviewTab.current.classList.add("shiftToNeutralForm");
      descriptionTab.current.classList.remove("shiftToNeutralForm");
      shopTab.current.classList.remove("shiftToNeutralForm");
      shippingTab.current.classList.remove("shiftToNeutralForm");
      descriptionTab.current.classList.add("shiftToLeft");
      shippingTab.current.classList.add("shiftToLeft");
      shopTab.current.classList.add("shiftToLeft");
    }

    if (tab === "general") {
      geneTab.current.classList.add("shiftToNeutral");
      descTab.current.classList.remove("shiftToNetural");
      shipTab.current.classList.remove("shiftToNetural");
      reviTab.current.classList.remove("shiftToNetural");

      shopTab.current.classList.remove("shiftToLeft");
      shopTab.current.classList.add("shiftToNeutralForm");
      descriptionTab.current.classList.remove("shiftToNeutralForm");
      shippingTab.current.classList.remove("shiftToNeutralForm");
      reviewTab.current.classList.remove("shiftToNeutralForm");
      descriptionTab.current.classList.add("shiftToLeft");
      shippingTab.current.classList.add("shiftToLeft");
      reviewTab.current.classList.add("shiftToLeft");
    }
  };

  // mobile view
  const MobileViews = (tab) => {
    if (tab === "description") {
      setShip(false);
      setRevi(false);
      setShop(false);
      setDesc(!desc);
    }
    if (tab === "shipping") {
      setDesc(false);
      setRevi(false);
      setShop(false);
      setShip(!ship);
    }
    if (tab === "review") {
      setDesc(false);
      setShip(false);
      setShop(false);
      setRevi(!revi);
    }
    if (tab === "shop") {
      setDesc(false);
      setShip(false);
      setRevi(false);
      setShop(!shop);
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <div className="product__desc">
      {/* mobile  */}
      <div className="prod__desc__box mobile__navigation">
        <div className="prod__desc__toggle">
          <div className="section__box">
            <div className="box" onClick={() => MobileViews("description")}>
              <p>Product Description</p>
              <div className="icon">
                {desc ? (
                  <span className="close__icon">
                    <IonIcon icon={chevronDownOutline} />
                  </span>
                ) : (
                  <span className="open__icon">
                    <IonIcon icon={chevronForwardOutline} />
                  </span>
                )}
              </div>
            </div>
            <div
              className={
                desc
                  ? "description__container active"
                  : "description__container"
              }
            >
              <div className="description__box">
                {data?.brand && (
                  <p>
                    Brand: <span>{data?.brand}</span>
                  </p>
                )}
                {details?.display && (
                  <p>
                    Display: <span>{details?.display}</span>
                  </p>
                )}
                {details?.camera && (
                  <p>
                    Camera: <span>{details?.camera}</span>
                  </p>
                )}
                {details?.ram && (
                  <p>
                    Ram: <span>{details?.ram}</span>
                  </p>
                )}
                {details?.storage && (
                  <p>
                    Storage: <span>{details?.storage}</span>
                  </p>
                )}
                {details?.guarantee && (
                  <p>
                    Guarantee: <span>{details?.guarantee}</span>
                  </p>
                )}
                {details?.warranty && (
                  <p>
                    Warranty: <span>{details?.warranty}</span>
                  </p>
                )}
                {details?.manufacturer && (
                  <p>
                    Manufacturer: <span>{details?.manufacturer}</span>
                  </p>
                )}
                {details?.weight && (
                  <p>
                    Weight: <span>{details?.weight}</span>
                  </p>
                )}
                {details?.modelno && (
                  <p>
                    Item Model No: <span>{details?.modelno}</span>
                  </p>
                )}
                {details?.dimensions && (
                  <p>
                    Item Dimensions: <span>{details?.dimensions}</span>
                  </p>
                )}
                {details?.headPhoneType && (
                <p>
                  Headphone Type: <span>{details?.headPhoneType}</span>
                </p>
              )}
              {details?.connectivity && (
                <p>
                  Connectivity: <span>{details?.connectivity}</span>
                </p>
              )}
              {details?.material && (
                <p>
                  Material: <span>{details?.material}</span>
                </p>
              )}
              {details?.fabric && (
                <p>
                  Fabric: <span>{details?.fabric}</span>
                </p>
              )}
              {details?.sleeve && (
                <p>
                  Sleeve: <span>{details?.sleeve}</span>
                </p>
              )}
              {details?.fit && (
                <p>
                  Fit: <span>{details?.fit}</span>
                </p>
              )}
              {details?.pattern && (
                <p>
                  Pattern: <span>{details?.pattern}</span>
                </p>
              )}
              {details?.pocketType && (
                <p>
                  Pocket Type: <span>{details?.pocketType}</span>
                </p>
              )}
              {details?.occasion && (
                <p>
                  Occasion: <span>{details?.occasion}</span>
                </p>
              )}
              {details?.numberOfPockets && (
                <p>
                  Number Of Pockets: <span>{details?.numberOfPockets}</span>
                </p>
              )}
              {details?.withRainCover && (
                <p>
                  With Rain Cover: <span>{details?.withRainCover}</span>
                </p>
              )}
              {details?.withTrolleySupport && (
                <p>
                  With Trolley Support: <span>{details?.withTrolleySupport}</span>
                </p>
              )}
              {details?.laptopSleeve && (
                <p>
                  Laptop Sleeve: <span>{details?.laptopSleeve}</span>
                </p>
              )}
              {details?.salesPackage && (
                <p>
                  Sales Package: <span>{details?.salesPackage}</span>
                </p>
              )}
              {details?.origin && (
                  <p>
                    Country Of Origin: <span>{details?.origin}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="section__box">
            <div className="box" onClick={() => MobileViews("shipping")}>
              <p>Shipping & Returns</p>
              <div className="icon">
                {ship ? (
                  <span className="close__icon">
                    <IonIcon icon={chevronDownOutline} />
                  </span>
                ) : (
                  <span className="open__icon">
                    <IonIcon icon={chevronForwardOutline} />
                  </span>
                )}
              </div>
            </div>
            <div className={ship ? "description__container active" : "description__container"}>
              <p>
               {data?.shippingAndReturn}
              </p>
            </div>
          </div>

          <div className="section__box">
            <div className="box" onClick={() => MobileViews("review")}>
              <p>Product Reviews</p>
              <div className="icon">
                {revi ? (
                  <span className="close__icon">
                    <IonIcon icon={chevronDownOutline} />
                  </span>
                ) : (
                  <span className="open__icon">
                    <IonIcon icon={chevronForwardOutline} />
                  </span>
                )}
              </div>
            </div>
            <div className={revi ? "review active" : "review"}>
              <div className="review_container">
                <div className="row">
                  <div className="col">
                    <h2>Customer Reviews</h2>
                    <span className="ratings">
                      <Rating rating={data?.ratings} />
                      Based on {data?.reviews?.length} reviews
                    </span>
                  </div>
                  <div className="col col_2">
                    <span>Write A Review</span>
                  </div>
                </div>
                {data &&
                  data?.reviews?.map((item, i) => (
                    <div className="row" key={i}>
                      <div className="col">
                        <span className="rating">
                          <Rating rating={item?.rating} />
                        </span>
                        <p>
                          {item?.user?.name} <span>on</span> 10-02-2023
                        </p>
                        <span>{item?.comment}</span>
                      </div>
                    </div>
                  ))}
                {data && data?.reviews?.length === 0 && (
                  <h5>No Reviews have for this product</h5>
                )}
              </div>
            </div>
          </div>

          <div className="section__box">
            <div className="box" onClick={() => MobileViews("shop")}>
              <p>shop Tab</p>
              <div className="icon">
                {shop ? (
                  <span className="close__icon">
                    <IonIcon icon={chevronDownOutline} />
                  </span>
                ) : (
                  <span className="open__icon">
                    <IonIcon icon={chevronForwardOutline} />
                  </span>
                )}
              </div>
            </div>
            <div className={shop ? "general active" : "general"}>
              <div className="general__main">
                <div className="box">
                  <div className="img__container">
                    <img
                      src={`${backend__url}/${data?.shop?.avatar}`}
                      alt={data?.shop?.avatar}
                    />
                    <div>
                      <span>
                        <Link to={`/shop/preview/${data?.shop?._id}`}>
                          {data?.shop?.shopName}
                        </Link>
                      </span>
                      <p>
                        <Rating rating={data?.ratings} /> (
                        {averageRating.toFixed(1)}/5) ratings
                      </p>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="seller__info">
                    <p>
                      Joined on :{" "}
                      <span>{data?.shop?.createdAt?.slice(0, 10)}</span>
                    </p>
                    <p>
                      Total Products :{" "}
                      <span>{products && products.length}</span>
                    </p>
                    <p>
                      Total Review :{" "}
                      <span>{totalReviewsLength && totalReviewsLength}</span>
                    </p>
                    <Link to={`/shop/preview/${data?.shop?._id}`}>
                      <button className="btn-main">visit shop</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* desktop  */}
      <div className="prod__desc__box desktop__navigation">
        <div className="prod__desc__toggle">
          <div className="box">
            <p ref={descTab} onClick={(e) => switchTabs(e, "description")}>
              Product Description
            </p>
            <div className="icon">
              <span className="open__icon">
                <IonIcon icon={chevronForwardOutline} />
              </span>
              <span className="close__icon">
                <IonIcon icon={chevronDownOutline} />
              </span>
            </div>
          </div>
          <div className="box">
            <p ref={shipTab} onClick={(e) => switchTabs(e, "shipping")}>
              Shipping & Returns
            </p>
            <div className="icon">
              <span className="open__icon">
                <IonIcon icon={chevronForwardOutline} />
              </span>
              <span className="close__icon">
                <IonIcon icon={chevronDownOutline} />
              </span>
            </div>
          </div>
          <div className="box">
            <p ref={reviTab} onClick={(e) => switchTabs(e, "review")}>
              Product Reviews
            </p>
            <div className="icon">
              <span className="open__icon">
                <IonIcon icon={chevronForwardOutline} />
              </span>
              <span className="close__icon">
                <IonIcon icon={chevronDownOutline} />
              </span>
            </div>
          </div>
          <div className="box">
            <p ref={geneTab} onClick={(e) => switchTabs(e, "general")}>
              Seller Information
            </p>
            <div className="icon">
              <span className="open__icon">
                <IonIcon icon={chevronForwardOutline} />
              </span>
              <span className="close__icon">
                <IonIcon icon={chevronDownOutline} />
              </span>
            </div>
          </div>
        </div>

        <div className="container__box">
          <div ref={descriptionTab} className="description__container">
            <div className="description__box">
              {data?.brand && (
                <p>
                  Brand: <span>{data?.brand}</span>
                </p>
              )}
              {details?.display && (
                <p>
                  Display: <span>{details?.display}</span>
                </p>
              )}
              {details?.camera && (
                <p>
                  Camera: <span>{details?.camera}</span>
                </p>
              )}
              {details?.ram && (
                <p>
                  Ram: <span>{details?.ram}</span>
                </p>
              )}
              {details?.storage && (
                <p>
                  Storage: <span>{details?.storage}</span>
                </p>
              )}
              {details?.guarantee && (
                <p>
                  Guarantee: <span>{details?.guarantee}</span>
                </p>
              )}
              {details?.warranty && (
                <p>
                  Warranty: <span>{details?.warranty}</span>
                </p>
              )}
              {details?.dimensions && (
                <p>
                  Dimensions: <span>{details?.dimensions}</span>
                </p>
              )}
              {details?.manufacturer && (
                <p>
                  Manufacturer: <span>{details?.manufacturer}</span>
                </p>
              )}
              {details?.weight && (
                <p>
                  Weight: <span>{details?.weight}</span>
                </p>
              )}
              {details?.modelno && (
                <p>
                  Model number: <span>{details?.modelno}</span>
                </p>
              )}
              {details?.headPhoneType && (
                <p>
                  Headphone Type: <span>{details?.headPhoneType}</span>
                </p>
              )}
              {details?.connectivity && (
                <p>
                  Connectivity: <span>{details?.connectivity}</span>
                </p>
              )}
              {details?.material && (
                <p>
                  Material: <span>{details?.material}</span>
                </p>
              )}
              {details?.fabric && (
                <p>
                  Fabric: <span>{details?.fabric}</span>
                </p>
              )}
              {details?.sleeve && (
                <p>
                  Sleeve: <span>{details?.sleeve}</span>
                </p>
              )}
              {details?.fit && (
                <p>
                  Fit: <span>{details?.fit}</span>
                </p>
              )}
              {details?.pattern && (
                <p>
                  Pattern: <span>{details?.pattern}</span>
                </p>
              )}
              {details?.pocketType && (
                <p>
                  Pocket Type: <span>{details?.pocketType}</span>
                </p>
              )}
              {details?.occasion && (
                <p>
                  Occasion: <span>{details?.occasion}</span>
                </p>
              )}
              {details?.numberOfPockets && (
                <p>
                  Number Of Pockets: <span>{details?.numberOfPockets}</span>
                </p>
              )}
              {details?.withRainCover && (
                <p>
                  With Rain Cover: <span>{details?.withRainCover}</span>
                </p>
              )}
              {details?.withTrolleySupport && (
                <p>
                  With Trolley Support: <span>{details?.withTrolleySupport}</span>
                </p>
              )}
              {details?.laptopSleeve && (
                <p>
                  Laptop Sleeve: <span>{details?.laptopSleeve}</span>
                </p>
              )}
              {details?.origin && (
                <p>
                  Country Of Origin: <span>{details?.origin}</span>
                </p>
              )}
              {details?.salesPackage && (
                <p>
                  Sales Package: <span>{details?.salesPackage}</span>
                </p>
              )}
            </div>
          </div>

          <div ref={shippingTab} className="shipping shiftToLeft">
             <p>
              {data?.shippingAndReturn} 
              </p>
          </div>

          <div ref={reviewTab} className="review shiftToLeft">
            <div className="review_container">
              <div className="row">
                <div className="col">
                  <h2>Customer Reviews</h2>
                  <span className="ratings">
                    <Rating rating={data?.ratings} />
                    Based on {data?.reviews?.length} reviews
                  </span>
                </div>
                <div className="col col_2">
                  <span></span>
                </div>
              </div>
              {data &&
                data?.reviews?.map((item, i) => (
                  <div className="row" key={i}>
                    <div className="col">
                      <span className="rating">
                        <Rating rating={item?.rating} />
                      </span>
                      <p>
                        {item?.user?.name} <span>on</span> 10-02-2023
                      </p>
                      <span>{item?.comment}</span>
                    </div>
                  </div>
                ))}
              {data && data?.reviews?.length === 0 && (
                <h5>No Reviews have for this product</h5>
              )}
            </div>
          </div>

          <div ref={shopTab} className="general shiftToLeft">
            <div className="general__main">
              <div className="box">
                <div className="img__container">
                  <img
                    src={`${backend__url}/${data?.shop?.avatar}`}
                    alt={data?.shop?.avatar}
                  />
                  <div>
                    <span>
                      <Link to={`/shop/preview/${data?.shop?._id}`}>
                        {data?.shop?.shopName}
                      </Link>
                    </span>
                    <p className="rating">
                      {" "}
                      <Rating rating={data?.ratings} /> (
                      {averageRating.toFixed(1)}/5) ratings
                    </p>
                  </div>
                </div>
              </div>
              <div className="box">
                <div className="seller__info">
                  <p>
                    Joined on :{" "}
                    <span>{data?.shop?.createdAt?.slice(0, 10)}</span>
                  </p>
                  <p>
                    Total Products : <span>{products && products.length}</span>
                  </p>
                  <p>
                    Total Review :{" "}
                    <span>{totalReviewsLength && totalReviewsLength}</span>
                  </p>
                  <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <button className="btn-main">visit shop</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDesc;
