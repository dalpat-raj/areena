import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { searchOutline, closeOutline } from "ionicons/icons";
import {
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";
import { toast } from "react-toastify";
import "./productCard.scss";
import { addTocart } from "../../actions/cart";
import { getAllProductsShop, getProduct, getProductDetails } from "../../actions/productAction";
import Rating from "../layout/rating/Rating";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { backend__url, server } from "../../Server";

const ProductCard = ({ products, isWishlist, isEvent }) => {
  const {seller} = useSelector((state)=>state.seller)
  const {user} = useSelector((state)=>state.user)
  const [click, setClick] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [data, setData] = useState(products);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isSeller } = useSelector((state) => state.seller);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToWishlistHandler = (product) => {
    dispatch(addToWishlist(product));
  };

  const removeToWishlistHandler = (product) => {
    dispatch(removeFromWishlist(product));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock <= 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const productDetailsHandler = (id) => {
    dispatch(getProductDetails(id));
    navigate(
      `${isEvent === true ? `/product/${id}?isEvent=true` : `/product/${id}`}`
    );
  };

  // delete product bu seller
  const handleDeleteBySeller=async(id)=>{
    await axios.delete(`/api/v2/delete-shop-product/${id}`, {withCredentials: true}).then((res)=>{
      if(res.data.success === true){
        toast.success(res.data.message)
      }
    }).catch((err)=>{
      alert(err.response.data.error.message)
    })
    dispatch(getAllProductsShop(seller?._id));
    setConfirmDelete(false)
  }

    // delete product bu Admin
    const handleDeleteByAdmin=async(id)=>{
      await axios.delete(`/api/v2/delete-product-admin/${id}`, {withCredentials: true}).then((res)=>{
        if(res.data.success === true){
          toast.success(res.data.message)
        }
      }).catch((err)=>{
        alert(err.response.data.error.message)
      })
      dispatch(getProduct());
      setConfirmDelete(false)
    }



  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data]);

  useEffect(() => {
    setData(products);
  }, [products]);

  return (
    <div className="product__box">
      <div className="image">
        {data &&
          data?.images?.map((item, i) => (
            <div onClick={() => productDetailsHandler(data?._id)} key={i}>
              {i === 0 && (
                <img
                  src={`${backend__url}/${item}`}
                  alt="fgdf"
                  className="img1"
                />
              )}

              {i === 1 && (
                <img
                  src={`${backend__url}/${item}`}
                  alt="fgdf"
                  className="img2"
                />
              )}
            </div>
          ))}
      </div>

      { seller?._id === data?.shopId || user?.role === "Admin" ? (
        <>
          <ul className="delete__icon">
            <li className="del__icon" onClick={()=>setConfirmDelete(true)}>
              <AiOutlineDelete />
            </li>
          </ul>
          {confirmDelete && (
            <>
              <div className="confirm__delete">
                <p>Are you sure to confirm delete ?</p>
                <div className="btn_box">
                  <button
                    className="btn-sec"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancle
                  </button>
                  <button
                    className="btn-sec"
                    onClick={()=> user?.role === "Admin" ? handleDeleteByAdmin(data?._id) : isSeller ? handleDeleteBySeller(data?._id) : null}
                  >
                    Delete
                  </button>
                </div>
                <div className="false_icon">
                  <RxCross2 onClick={() => setConfirmDelete(false)} />
                </div>
              </div>
              <p
                className="overlay"
                onClick={() => setConfirmDelete(false)}
              ></p>
            </>
          )}
        </>
      ) : (
        <ul className="hover__icon">
          {isWishlist ? (
            <li className="remove__icon">
              <IonIcon
                icon={closeOutline}
                onClick={() => removeToWishlistHandler(data && data)}
              />
            </li>
          ) : (
            <li className="heart__icon">
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
            </li>
          )}
          <li className="cart__icon">
            <AiOutlineShoppingCart
              onClick={() => addToCartHandler(data?._id)}
            />
          </li>
          <li className="search__icon">
            <IonIcon icon={searchOutline} />
          </li>
        </ul>
      )}

      <div className="product__card__text">
        <span className="shop__name">
          <Link to={`/shop/preview/${data && data?.shopId}`}>
            {data?.shop?.shopName.slice(0, 25)}
          </Link>
        </span>
        <p className="product__name">
          {data?.name?.length >= 75
            ? data?.name?.slice(0, 75) + "..."
            : data?.name}
        </p>
        <div className="product__rating">
          <Rating rating={data?.ratings} />
        </div>
        <div className="price_sold">
          <div className="price">
            <p className="selling__price">
              <span>₹</span> {data?.sellingPrice}
            </p>
            <span className="original__price">
              ₹ {data?.originalPrice}
              <span className="strike"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
