const express = require("express");
const { isAutenticated, isSeller, isAdmin } = require("../middleware/auth");
const { createOrder, getAllOrdersUser, getAllOrdersSeller, updateOrderStatus, getSelectedOrderUser, getSelectedOrderShop, orderRefund, updateRefundOrderStatus, getAllOrdersAdmin } = require("../controller/orderController");
const router = express.Router();

// users
router.post("/create-order", createOrder);
router.get("/get-all-orders-user/:userId", isAutenticated, getAllOrdersUser);
router.get("/get-selected-order-user/:orderId", isAutenticated, getSelectedOrderUser);
router.put("/order-refund/:id", orderRefund);

// shop
router.get("/get-all-orders-shop/:shopId", isSeller, getAllOrdersSeller);
router.get("/get-selected-order-details/:orderId",isAutenticated, isAdmin("Admin"), getSelectedOrderShop);
router.get("/get-selected-order-shop/:orderId",isSeller, getSelectedOrderShop);
router.put("/update-order-status/:id",isAutenticated, isAdmin("Admin"), updateOrderStatus);
router.put("/shop-order-refund-success/:id", isAutenticated, isAdmin("Admin"), updateRefundOrderStatus);

// admin
router.get("/get-all-orders-admin",isAutenticated, isAdmin("Admin"), getAllOrdersAdmin);

module.exports = router;