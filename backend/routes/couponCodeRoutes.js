const express = require("express")
const router = express.Router();
const {isSeller} = require("../middleware/auth");
const { createCouponCode, getCoupon, deleteCoupon, getCouponCode } = require("../controller/couponCodeController");

// seller 
router.post("/create-coupon-code", isSeller, createCouponCode);
router.get("/get-coupon/:id", isSeller, getCoupon);
router.delete("/delete-coupon/:id", isSeller, deleteCoupon);

// user
router.get("/get-coupon-value/:name", getCouponCode);


module.exports = router;