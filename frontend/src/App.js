import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import HeaderTop from "./components/layout/headerTop/HeaderTop";
import Header from "./components/layout/header/Header";
import Home from "./components/home/Home";
import "./app.scss";
import Wishlist from "./pages/wishlist/Wishlist";
import ProductDetails from "./components/products/productDetails/ProductDetails";
import Products from "./components/products/product/Products";
import Login from "./components/user/loginSignUp/Login";
import SignUp from "./components/user/loginSignUp/SignUp";
import Profile from "./pages/profile/Profile";
import ActivationPage from "./pages/activation/ActivationPage";
import { useEffect, useState } from "react";
import Store from "./Store";
import { loadUser } from "./actions/userAction";
import { loadSeller } from "./actions/sellerAction";
// Shop
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import ShopCreate from "./pages/shop/shopCreate/ShopCreate";
import ShopLogin from "./pages/shop/shopCreate/ShopLogin";
import ShopDashboard from "./components/shop/shopDashboard/ShopDashboard";
import ShopHomePage from "./components/shop/shopHomePage/ShopHomePage";
import ShopAllOrders from "./components/shop/shopAllOrders/ShopAllOrders";
import ShopOrderDetails from "./components/shop/shopAllOrders/shopOrderDetails/ShopOrderDetails";
import ShopCreateProduct from "./components/shop/shopCreateProduct/ShopCreateProduct";
import ShopAllProducts from "./components/shop/shopAllProducts/ShopAllProducts";
import ShopCreateEvent from "./components/shop/shopEvent/shopCreateEvent/ShopCreateEvent";
import ShopAllEvent from "./components/shop/shopEvent/shopAllEvent/ShopAllEvent";
import ShopCouponCode from "./components/shop/shopCouponCode/ShopCouponCode";
import ShopPreview from "./components/shop/shopPreviewPage/ShopPreview";
import Checkout from "./components/checkout/checkout/Checkout";
import Payment from "./components/checkout/payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderDetails from "./components/user/ordres/orderDetails/OrderDetails";
import TrackOrderDetails from "./components/user/ordres/trackOrderDetails/TrackOrderDetails";
import ShopAllRefunds from "./components/shop/shopRefunds/ShopAllRefunds";
import ShopSetting from "./components/shop/shopSetting/ShopSetting";
import ShopWithdrawMoney from "./components/shop/shopWithdrawMoney/ShopWithdrawMoney";
import ShopInbox from "./components/shop/shopInbox/ShopInbox";
// admin
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminDashboard from "./components/admin/adminDashboard/AdminDashboard";
import AdminAllProducts from "./components/admin/adminAllProducts/AdminAllProducts";
import AdminAllOrders from "./components/admin/adminAllOrders/AdminAllOrders";
import AdminAllSellers from "./components/admin/adminAllSellers/AdminAllSellers";
import AdminAllUsers from "./components/admin/adminAllUsers/AdminAllUsers";
import AdminAllEvents from "./components/admin/adminAllEvents/AdminAllEvents";
import AdminWithdrawReques from "./components/admin/adminWithdrawRequest/AdminWithdrawReques";
import OrderSuccess from "./components/checkout/orderSuccess/OrderSuccess";
import CoustomerService from "./pages/coustomerService/CoustomerService";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import ForgatePassword from "./pages/shop/forgatePassword/ForgatePassword";
import NotFound from "./components/layout/notFound/NotFound";



function App() {
  const [stripeApiKey, setStripeApiKey] = useState();

  async function getStripeApiKey() {
    await axios
      .get(`/api/v2/stripeapikey`)
      .then((res) => {
        setStripeApiKey(res.data.stripeApiKey);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    Store.dispatch(loadSeller());
    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderTop />
        <Header />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/wishlist" element={<Wishlist />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/coustomer-services" element={<CoustomerService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />

          {/* protected route     */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track-order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderDetails />
              </ProtectedRoute>
            }
          />

          {/* shop  */}
          <Route
            path="/shop-activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route path="/shop-create" element={<ShopCreate />} />
          <Route path="/shop-login" element={<ShopLogin />} />
          <Route path="/shop-forgate-password" element={<ForgatePassword />} />
          <Route
            path="/shop-dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboard />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-profile/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route path="/shop/preview/:id" element={<ShopPreview />} />

          <Route
            path="/shop-dashboard/orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/shop-dashboard/products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/shop-dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvent />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvent />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithdrawMoney />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInbox />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-coupon-code"
            element={
              <SellerProtectedRoute>
                <ShopCouponCode />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-refund"
            element={
              <SellerProtectedRoute>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop-dashboard-setting"
            element={
              <SellerProtectedRoute>
                <ShopSetting />
              </SellerProtectedRoute>
            }
          />

          {/* Admin  */}

          <Route
            path="/admin-dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-products"
            element={
              <AdminProtectedRoute>
                <AdminAllProducts />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-orders"
            element={
              <AdminProtectedRoute>
                <AdminAllOrders />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-sellers"
            element={
              <AdminProtectedRoute>
                <AdminAllSellers />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-users"
            element={
              <AdminProtectedRoute>
                <AdminAllUsers />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-all-events"
            element={
              <AdminProtectedRoute>
                <AdminAllEvents />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-withdraw-request"
            element={
              <AdminProtectedRoute>
                <AdminWithdrawReques />
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
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
