import React from "react";
import "./wishlist.scss";
import ProductCard from "../../components/home/ProductCard";
import { useSelector } from "react-redux";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import {Helmet} from "react-helmet";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>areena:- wishlist</title>
        <meta
          name="description"
          content="our plateform provide a wishlist option so you can add your favorit product and in feature you can buy this products"
        />
        <link rel="canonical" href="https://areenaa.in/pages/wishlist" />
      </Helmet>
      <div className="wishlist__main">
        {wishlist[0] ? (
          <div className="container">
            <div className="container__heading">
              <h2>Wishlist</h2>
            </div>
            <div className="row">
              {wishlist &&
                wishlist.map((item, i) => (
                  <ProductCard products={item} isWishlist={true} key={i} />
                ))}
            </div>
          </div>
        ) : (
          <span>
            <MdOutlineRemoveShoppingCart />
          </span>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Wishlist;
