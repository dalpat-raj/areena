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
    if (eventData !== true) {
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
                {details?.origin && (
                  <p>
                    Country Of Origin: <span>{details?.origin}</span>
                  </p>
                )}
                {details?.dimensions && (
                  <p>
                    Item Dimensions: <span>{details?.dimensions}</span>
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
              <h4>General Returns Policy </h4>
              <p>
                Applicable products are returnable within
                the applicable return window if you've received them in a
                condition that is physically damaged, 
                has missing parts or accessories, 
                defective or different from their description on
                the product detail page on Amazon.in. If you report an issue
                with your Smartphone, Tablet, Laptop, Television, Air
                Conditioner, Refrigerator, Washing Machine, Microwave, we may
                facilitate scheduling a technician visit to your location. 
                This visit is scheduled by placing an order with Amazon through
                Amazon.in Home Services. 
                Subject to Amazon.in Home Services Terms and Conditions, a resolution will be provided based on the
                technician's evaluation report. Return will be processed only
                if: it is determined that the product was not damaged while in
                your possession; 
                the product is not different from what was shipped to you; the product is returned in original condition
                (with brand’s/manufacturer's box, MRP tag intact, user manual,
                warranty card and all the accessories therein). If you wish to
                return an electronic device that stores any personal
                information, please ensure that you have removed all such
                personal information from the device prior to returning. Amazon
                shall not be liable in any manner for any misuse or usage of
                such information. Products may not be eligible for return in
                some cases, including cases of buyer's remorse such as incorrect
                model or color of product ordered or incorrect product ordered.
                Products marked as "non-returnable" on the product detail page
                cannot be returned. However, in an unlikely event of damaged,
                defective or wrong item delivered to you, we will provide a full
                refund or replacement, as applicable. We may contact you to
                ascertain the damage or defect in the product prior to issuing
                refund/replacement. We reserve the right to pick up the product
                to ascertain the damage or defect in the product prior to
                issuing refund/replacement. No additional information is
                required to return an eligible order unless otherwise noted in
                the category specific policy. Products may be eligible for
                replacement only if the same seller has the exact same item in
                stock. If the replacement request is placed and the seller does
                not have the exact same product in stock, a refund would be
                issued to you. Products purchased by international customers are
                not eligible for returns. However, orders made by international
                customers are eligible for refunds and customers will have to
                contact customer service within 5 business days from delivery
                date or estimated delivery date to claim refunds. To know about
                the Return window for Amazon Business orders, please visit here.
                In the event customers are found to misuse the return policy by
                excessively returning, or cancelling or not accepting the orders
                placed, Amazon reserves the right to warn and/or suspend and/or
                block and/or terminate such customer accounts, as necessary.
                Note: If you've received a non-returnable product in a
                damaged/defective condition, you can contact us within 10 days
                from the delivery of the product. Note: All product categories
                are non-returnable for International Customers for Export
                Orders.
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
            </div>
          </div>

          <div ref={shippingTab} className="shipping shiftToLeft">
          <h2 className="container__heading">General Returns Policy </h2>
              <p>
                Applicable products are returnable within
                the applicable return window if you've received them in a
                condition that is physically damaged, 
                has missing parts or accessories, 
                defective or different from their description on
                the product detail page on Amazon.in. If you report an issue
                with your Smartphone, Tablet, Laptop, Television, Air
                Conditioner, Refrigerator, Washing Machine, Microwave, we may
                facilitate scheduling a technician visit to your location. 
                This visit is scheduled by placing an order with Amazon through
                Amazon.in Home Services. 
                Subject to Amazon.in Home Services Terms and Conditions, a resolution will be provided based on the
                technician's evaluation report. Return will be processed only
                if: it is determined that the product was not damaged while in
                your possession; 
                the product is not different from what was shipped to you; the product is returned in original condition
                (with brand’s/manufacturer's box, MRP tag intact, user manual,
                warranty card and all the accessories therein). If you wish to
                return an electronic device that stores any personal
                information, please ensure that you have removed all such
                personal information from the device prior to returning. Amazon
                shall not be liable in any manner for any misuse or usage of
                such information. Products may not be eligible for return in
                some cases, including cases of buyer's remorse such as incorrect
                model or color of product ordered or incorrect product ordered.
                Products marked as "non-returnable" on the product detail page
                cannot be returned. However, in an unlikely event of damaged,
                defective or wrong item delivered to you, we will provide a full
                refund or replacement, as applicable. We may contact you to
                ascertain the damage or defect in the product prior to issuing
                refund/replacement. We reserve the right to pick up the product
                to ascertain the damage or defect in the product prior to
                issuing refund/replacement. No additional information is
                required to return an eligible order unless otherwise noted in
                the category specific policy. Products may be eligible for
                replacement only if the same seller has the exact same item in
                stock. If the replacement request is placed and the seller does
                not have the exact same product in stock, a refund would be
                issued to you. Products purchased by international customers are
                not eligible for returns. However, orders made by international
                customers are eligible for refunds and customers will have to
                contact customer service within 5 business days from delivery
                date or estimated delivery date to claim refunds. To know about
                the Return window for Amazon Business orders, please visit here.
                In the event customers are found to misuse the return policy by
                excessively returning, or cancelling or not accepting the orders
                placed, Amazon reserves the right to warn and/or suspend and/or
                block and/or terminate such customer accounts, as necessary.
                Note: If you've received a non-returnable product in a
                damaged/defective condition, you can contact us within 10 days
                from the delivery of the product. Note: All product categories
                are non-returnable for International Customers for Export
                Orders.
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
