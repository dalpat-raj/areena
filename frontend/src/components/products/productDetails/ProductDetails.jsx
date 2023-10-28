import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { IonIcon } from "@ionic/react";
import {
  addOutline,
  calendarOutline,
  flameOutline,
  removeOutline,
  trainOutline,
} from "ionicons/icons";
import "./productDetails.scss";
import ProdDesc from "../productDescription/ProdDesc";
import RecomendedProduct from "../recomendedProduct/RecomendedProduct";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../layout/footer/Footer";
import { toast } from "react-toastify";
import { backend__url } from "../../../Server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../actions/wishlistAction";
import { addTocart } from "../../../actions/cart";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Rating from "../../layout/rating/Rating";
import axios from "axios";
import { getSameProducts } from "../../../actions/productAction";

const ProductDetails = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { productDetails } = useSelector((state) => state.products);
  const { sameProducts } = useSelector((state) => state.products);
  const { event } = useSelector((state) => state.events);
  const { cart } = useSelector((state) => state.cart);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [data, setData] = useState(null);
  const [qty, setQty] = useState(1);
  const [click, setClick] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  const incrementCount = (data) => {
    if (data?.stock <= qty) {
      toast.error("product stock limited");
    } else {
      setQty(qty + 1);
    }
  };

  const decrementCount = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data?.stock < qty) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: qty };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const addToWishlistHandler = (product) => {
    dispatch(addToWishlist(product));
  };

  const removeToWishlistHandler = (product) => {
    dispatch(removeFromWishlist(product));
  };

  const handleMessage = async () => {
    if (isAuthenticated) {
      const groupTitle = data?._id + user?._id;
      const userId = user?._id;
      const sellerId = data?.shop?._id;
      await axios
        .post(`/api/v2/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/api/v2/conversation/${res.data.conversation._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("please login");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (eventData !== null) {
      const data = event && event.find((item) => item._id === id);
      setData(data);
      setImageUrl(data?.images[0]);
    } else {
      const data = productDetails && productDetails;
      setData(data);
      setImageUrl(productDetails && productDetails?.images[0]);
    }

    if (wishlist?.find((i) => i?._id === productDetails?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [dispatch, wishlist, productDetails, id, event, eventData]);

  useEffect(() => {
    dispatch(getSameProducts(productDetails?.name));
  }, [dispatch, productDetails]);

  return (
    <>
    <div className="product__details" id="#">
      <div className="container">
        <p className="line__bar">Home - {data && data?.name}</p>
        <div className="row">
          <div className="col__2 img__container">
            <div className="img_group">
              {data?.images?.map((item, i) => (
                <img
                  onClick={() => setImageUrl(item)}
                  src={`${backend__url}/${item}`}
                  alt={item}
                  key={i}
                />
              ))}
            </div>
            <div className="main_img">
              <ReactImageMagnify
                enlargedImagePosition="over"
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: `${backend__url}/${imageUrl}`,
                  },
                  largeImage: {
                    src: `${backend__url}/${imageUrl && imageUrl}`,
                    width: 1400,
                    height: 1800,
                  },
                }}
              />
            </div>
          </div>

          <div className="col__2 product__detail">
            <div className="product__name container__heading">
              <h2>{data && data?.name}</h2>
            </div>

            <div className="product__rating">
              <Rating rating={data?.ratings} />
              <div className="total__review">
                {data?.reviews?.length} Review
              </div>
            </div>

            <div className="product__price">
              <h1>₹ {data && data?.sellingPrice}</h1>
            </div>

            <div className="product__stock">
              <div className="inStock">
                <span className="color__type"></span>
                <p>
                  {data?.stock}
                  {data && data?.stock >= 1
                    ? "in stock - Ready to ship"
                    : "Stock Out"}
                </p>
              </div>
            </div>

            <div className="product__color">
              <p>Color: {data?.color}</p>
              <div className="product__image__color">
              {sameProducts &&
                sameProducts?.map((item, i) => (
                    <img src={`${backend__url}/${item?.images[0]}`} alt="dfsd" onClick={()=>setData(item) || setImageUrl(item?.images[0]) } key={i} />
                    ))}
              </div>
            </div>

            <div className="product__qty">
              <div className="cartInput">
                <button className="dec__item" onClick={decrementCount}>
                  <IonIcon icon={removeOutline} />
                </button>
                <input type="number" value={qty} readOnly />
                <button
                  className="inc__item"
                  onClick={() => incrementCount(data)}
                >
                  <IonIcon icon={addOutline} />
                </button>
              </div>
              <div className="wishlist__options">
                {click ? (
                  <AiFillHeart
                    onClick={() => removeToWishlistHandler(data)}
                    color={click ? "red" : "#333"}
                    title="Remove from wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() => addToWishlistHandler(data)}
                    color={click ? "red" : "#333"}
                    title="Add to wishlist"
                  />
                )}
                <p>Add to wishlist</p>
              </div>
            </div>

            <div className="product__addtocart__btn">
              <button
                className="btn-main"
                onClick={() => addToCartHandler(data?._id)}
              >
                ADD TO CART
              </button>
            </div>

            <div className="sold__intime">
              <IonIcon icon={flameOutline} />
              <span className="sold__text">
                {data && data?.sold_out} sold in last 18 hours
              </span>
            </div>

            <div className="order__eligible">
              <IonIcon icon={trainOutline} />
              <span className="order__text">
                Your order is eligible for FREE Delivery
              </span>
            </div>

            <div className="delivery__time">
              <IonIcon icon={calendarOutline} />
              <span className="order__text">
                Estimated delivery between 4 to 5 days
              </span>
            </div>

            <div className="payment__img">
              <button onClick={handleMessage} className="btn-main">
                send message
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ProdDesc data={data && data} />
      </div>

      {isSeller ? null : (
        <div className="container">
          <RecomendedProduct data={data && data} eventData={eventData} />
        </div>
      )}
    </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
