import React, { useEffect, useState } from "react";
import { backend__url, server } from "../../../../Server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./shopInfo.scss";
import { useNavigate, useParams } from "react-router";
import { LogoutSeller } from "../../../../actions/sellerAction";
import axios from "axios";
import { getAllProductsShop } from "../../../../actions/productAction";

const ShopInfo = ({ isOwner }) => {
  const {products} = useSelector((state)=>state.products)
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getAllProductsShop(id))
    axios.get(`${server}/get-shop-info/${id}`).then((res) => {
      setData(res.data.shop);
    });
  }, [id, dispatch]);

  const logoutHandler = async () => {
    dispatch(LogoutSeller());
    toast.success("logout success");
    navigate("/shop-login");
  };

  const totalReviewsLength =
  products &&
  products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings = products && products.reduce((acc, product)=>acc + product.reviews.reduce((sum, review)=>sum + review.rating, 0),0)

  const averageRating = totalRatings / totalReviewsLength || 0;
 
  return (
    <div className="shopInfo__main">
      <div className="profile__img">
        <img src={`${backend__url}/${data?.avatar}`} alt="" />
        <h4>{data?.shopName}</h4>
      </div>
      <div className="name">
        <h5>{data?.name}</h5>
      </div>
      <div className="address">
        <h5>Address</h5>
        <span>{data?.address}</span>
      </div>
      <div className="phone">
        <h5>Phone Number</h5>
        <span>{data?.phone}</span>
      </div>
      <div className="product">
        <h5>Total Product</h5>
        <span>{products ? products.length : "0"}</span>
      </div>
      <div className="rating">
        <h5>Shop Rating</h5>
        <span>{averageRating && averageRating.toFixed(1)}/5</span>
      </div>
      <div className="joined">
        <h5>Joined On</h5>
        <span>{data?.createdAt?.slice(0, 10)}</span>
      </div>
      {isOwner && (
        <div className="btn-group">
          <button className="btn-main" onClick={()=>navigate("/shop-dashboard-setting")}>Edit Shop</button>
          <button className="btn-main" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
