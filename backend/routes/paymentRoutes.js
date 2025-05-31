const express = require("express");
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controller/paymentController");
const router = express.Router();

router.post("/payment/create-razorpay-order", createRazorpayOrder);
router.post("/payment/verify-payment", verifyRazorpayPayment);

module.exports = router;
