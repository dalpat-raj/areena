import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/userReducer"
import { sellerReducer } from "./reducers/sellerReducer";
import { productReducer } from "./reducers/productReducer";
import { eventReducer } from "./reducers/eventReducer";
import { couponReducer } from "./reducers/couponCodeReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { reviewReducer } from "./reducers/reviewReducer";
import { withdrawReducer } from "./reducers/withdrawReducer";

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,
        events: eventReducer,
        coupons: couponReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        order: orderReducer,
        review: reviewReducer,
        withdraw: withdrawReducer,
    },
})

export default Store