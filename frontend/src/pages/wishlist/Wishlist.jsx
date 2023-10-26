import React from "react";
import "./wishlist.scss";
import ProductCard from "../../components/home/ProductCard";
import { useSelector } from "react-redux";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <>
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
