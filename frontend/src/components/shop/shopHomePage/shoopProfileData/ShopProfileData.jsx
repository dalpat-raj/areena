import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./shopProfileData.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../../../actions/productAction";
import ProductCard from "../../../home/ProductCard";
import { getAllEventShop } from "../../../../actions/eventAction";
import Rating from "../../../layout/rating/Rating";
import { BiUserCircle } from "react-icons/bi";

const ShopProfileData = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const { shopProducts } = useSelector((state) => state.products);
  const { event } = useSelector((state) => state.events);
  const [active, setActive] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventShop(id));
  }, [seller, dispatch, id]);

  const allReviews = shopProducts && shopProducts?.map((item) => item.reviews).flat();
 
  return (
    <div className="ShopProfileData">
      <div className="ShopProfileData__header">
        <ul className="ShopProfileData__navbar">
          <li onClick={() => setActive(1)} className={active === 1 && "active"}>
            Shop Products
          </li>
          <li onClick={() => setActive(2)} className={active === 2 && "active"}>
            Running Events
          </li>
          <li onClick={() => setActive(3)} className={active === 3 && "active"}>
            Shop Reviews
          </li>
        </ul>
        <div className="go__Dashboard__btn">
          {isOwner && (
            <Link to="/shop-dashboard">
              <button className="btn-main">Go To Dashboard</button>
            </Link>
          )}
        </div>
      </div>

      {active === 1 && (
        <div className="shopprofileDataBox">
          <div className="products__row">
            {shopProducts &&
              shopProducts?.map((item, i) => (
                <ProductCard products={item} isWishlist={false} key={i} />
              ))}
          </div>
        </div>
      )}

      {active === 2 && (
        <div className="shopprofileDataBox">
          <div className="products__row">
          {event && event?.map((item, i) => (
              <ProductCard products={item} isWishlist={false} isEvent={true} key={i}/>
          ))}
            </div>
        </div>
      )}

      {active === 3 && (
        <div className="shopprofileDataBox">
          <div className="shop__reviews__main">
            {allReviews &&
              allReviews.map((item, i) => (
                <div className="shop__review" key={i}>
                  <div className="review__row">
                    <div className="img__boxx">
                      <BiUserCircle size={30} />
                    </div>
                    <div className="review__details">
                      <div className="name__rating__row">
                        <p>{item.user.name}</p>
                        <span>
                          <Rating rating={item.rating} />
                        </span>
                      </div>
                      <div className="comment">
                        <p>{item.comment}</p>
                      </div>
                      <div className="day__ago">
                        <p>2 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
