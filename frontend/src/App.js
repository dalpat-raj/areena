import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute"
import HeaderTop from "./components/layout/headerTop/HeaderTop";
import Header from "./components/layout/header/Header";
import Home from "./components/home/Home";
import { loadUser } from "./actions/userAction";
import { loadSeller } from "./actions/sellerAction";
import Store from "./Store";
// import Payment from "./components/checkout/payment/Payment"
import NotFound from "./components/layout/notFound/NotFound";
import AdminOrderDetails from "./components/admin/adminAllOrders/adminOrderDetails/AdminOrderDetails";


const Login = React.lazy(()=>import("./components/user/loginSignUp/Login"));
const SignUp = React.lazy(()=>import("./components/user/loginSignUp/SignUp"));
const Profile = React.lazy(()=>import("./pages/profile/Profile"));
const ActivationPage = React.lazy(()=>import("./pages/activation/ActivationPage"));
const Wishlist = React.lazy(()=>import("./pages/wishlist/Wishlist"))
const Products = React.lazy(()=>import("./components/products/product/Products"));
const ProductDetails = React.lazy(()=>import("./components/products/productDetails/ProductDetails"))
const Checkout = React.lazy(()=>import("./components/checkout/checkout/Checkout"));
const OrderDetails = React.lazy(()=>import("./components/user/ordres/orderDetails/OrderDetails"));
const TrackOrderDetails = React.lazy(()=>import("./components/user/ordres/trackOrderDetails/TrackOrderDetails"));
const OrderSuccess = React.lazy(()=>import("./components/checkout/orderSuccess/OrderSuccess"));
const CoustomerService = React.lazy(()=>import("./pages/coustomerService/CoustomerService"));
const PrivacyPolicy = React.lazy(()=>import("./pages/privacyPolicy/PrivacyPolicy"));
const RefundPolicy = React.lazy(()=>import("./pages/refundPolicy/RefundPolicy"));
const ShippingReturn = React.lazy(()=>import("./pages/shippingReturn/ShippingReturn"));
const TermsConditions = React.lazy(()=>import("./pages/termCondition/TermsConditions"));
const Contact = React.lazy(()=>import("./pages/contact/Contact"));
const Payment = React.lazy(()=>import("./components/checkout/payment/Payment"));

// Shop
const ShopCreate = React.lazy(()=>import("./pages/shop/shopCreate/ShopCreate"));
const ShopLogin = React.lazy(()=>import("./pages/shop/shopCreate/ShopLogin"));
const ShopDashboard = React.lazy(()=>import("./components/shop/shopDashboard/ShopDashboard"));
const ShopHomePage = React.lazy(()=>import("./components/shop/shopHomePage/ShopHomePage"));
const ShopAllOrders = React.lazy(()=>import("./components/shop/shopAllOrders/ShopAllOrders"));
const ShopOrderDetails = React.lazy(()=>import("./components/shop/shopAllOrders/shopOrderDetails/ShopOrderDetails"));
const ShopCreateProduct = React.lazy(()=>import("./components/shop/shopCreateProduct/ShopCreateProduct"));
const ShopAllProducts = React.lazy(()=>import("./components/shop/shopAllProducts/ShopAllProducts"));
const ShopCreateEvent = React.lazy(()=>import("./components/shop/shopEvent/shopCreateEvent/ShopCreateEvent"));
const ShopAllEvent = React.lazy(()=>import("./components/shop/shopEvent/shopAllEvent/ShopAllEvent"));
const ShopCouponCode = React.lazy(()=>import("./components/shop/shopCouponCode/ShopCouponCode"));
const ShopPreview = React.lazy(()=>import("./components/shop/shopPreviewPage/ShopPreview"));
const ShopWithdrawMoney = React.lazy(()=>import("./components/shop/shopWithdrawMoney/ShopWithdrawMoney"));
const ShopAllRefunds = React.lazy(()=>import("./components/shop/shopRefunds/ShopAllRefunds"));
const ShopDeliveryArea = React.lazy(()=>import("./components/shop/ShopDeliveryArea/ShopDeliveryArea"))
const ShopSetting = React.lazy(()=>import("./components/shop/shopSetting/ShopSetting"));
const ForgatePassword = React.lazy(()=>import("./pages/shop/forgatePassword/ForgatePassword"));

// admin
const AdminDashboard = React.lazy(()=>import("./components/admin/adminDashboard/AdminDashboard"))
const AdminAllProducts = React.lazy(()=>import("./components/admin/adminAllProducts/AdminAllProducts"))
const AdminAllOrders = React.lazy(()=>import("./components/admin/adminAllOrders/AdminAllOrders"));
const AdminAllSellers = React.lazy(()=>import("./components/admin/adminAllSellers/AdminAllSellers"));
const AdminAllUsers = React.lazy(()=>import("./components/admin/adminAllUsers/AdminAllUsers"));
const AdminAllEvents = React.lazy(()=>import("./components/admin/adminAllEvents/AdminAllEvents"));
const AdminWithdrawReques = React.lazy(()=>import("./components/admin/adminWithdrawRequest/AdminWithdrawReques"));



function App() {

  useEffect(() => {
    Store.dispatch(loadSeller());
    Store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/wishlist" element={<Suspense fallback={""}><Wishlist /></Suspense>} />
          <Route path="/products" element={<Suspense fallback={""}><Products /></Suspense>} />
          <Route path="/product/:id" element={<Suspense fallback={""}><ProductDetails /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={""}><Login /></Suspense>} />
          <Route path="/signUp" element={<Suspense fallback={""}><SignUp /></Suspense>} />
          <Route path="/checkout" element={<Suspense fallback={""}><Checkout /></Suspense>} />
          <Route path="/order/success" element={<Suspense fallback={""}><OrderSuccess /></Suspense>} />
          <Route path="/coustomer-services" element={<Suspense fallback={""}><CoustomerService /></Suspense>} />
          <Route path="/privacy-policy" element={<Suspense fallback={""}><PrivacyPolicy /></Suspense>} />
          <Route path="/refund-policy" element={<Suspense fallback={""}><RefundPolicy /></Suspense>} />
          <Route path="/shipping-return" element={<Suspense fallback={""}><ShippingReturn /></Suspense>} />
          <Route path="/terms-conditions" element={<Suspense fallback={""}><TermsConditions /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={""}><Contact /></Suspense>} />
          <Route path="/payment" element={<Suspense fallback={""}><Payment /></Suspense>} />
          <Route path="*" element={<NotFound />} />

          {/* protected route     */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Suspense fallback={""}><Profile /></Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={""}><OrderDetails /></Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track-order/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={""}><TrackOrderDetails /></Suspense>
              </ProtectedRoute>
            }
          />

          {/* shop  */}
          <Route
            path="/shop-activation/:activation_token"
            element={<Suspense fallback={""}><ActivationPage /></Suspense>}
          />
          <Route path="/shop-create" element={<Suspense fallback={""}><ShopCreate /></Suspense>} />
          <Route path="/shop-login" element={<Suspense fallback={""}><ShopLogin /></Suspense>} />
          <Route path="/shop-forgate-password" element={<Suspense fallback={""}><ForgatePassword /></Suspense>} />
          <Route
            path="/shop-dashboard"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopDashboard /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-profile/:id"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopHomePage /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<Suspense fallback={""}><ShopPreview /></Suspense>} />

          <Route
            path="/shop-dashboard/orders"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopAllOrders /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop/order/:id"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopOrderDetails /></Suspense>
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/shop-dashboard/products"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopAllProducts /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopCreateProduct /></Suspense>
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/shop-dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopCreateEvent /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-events"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopAllEvent /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopWithdrawMoney /></Suspense>
              </SellerProtectedRoute>
            }
          />
          
          <Route
            path="/shop-dashboard-coupon-code"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopCouponCode /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-refund"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopAllRefunds /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-delivery-area"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopDeliveryArea /></Suspense>
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-setting"
            element={
              <SellerProtectedRoute>
                <Suspense fallback={""}><ShopSetting /></Suspense>
              </SellerProtectedRoute>
            }
          />

          {/* Admin  */}

          <Route
            path="/admin-dashboard"
            element={
              <AdminProtectedRoute>
                <Suspense fallback={""}><AdminDashboard /></Suspense>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-products"
            element={
              <AdminProtectedRoute>
                <Suspense fallback={""}><AdminAllProducts /></Suspense>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-orders"
            element={
              <AdminProtectedRoute>
                <Suspense fallback={""}><AdminAllOrders /></Suspense>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <AdminProtectedRoute>
                <Suspense fallback={""}><AdminOrderDetails /></Suspense>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-sellers"
            element={
              <AdminProtectedRoute>
                <Suspense fallback={""}><AdminAllSellers /></Suspense>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-users"
            element={
              <AdminProtectedRoute>
                <Suspense fallback={""}><AdminAllUsers /></Suspense>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-events"
            element={
              <AdminProtectedRoute>
                <Suspense fallback={""}><AdminAllEvents /></Suspense>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-withdraw-request"
            element={
              <AdminProtectedRoute>
                <Suspense fallback={""}><AdminWithdrawReques /></Suspense>
              </AdminProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
