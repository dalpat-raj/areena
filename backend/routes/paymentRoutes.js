const express = require("express");
const {
  paymentProcess,
  paymentApiKey,
} = require("../controller/paymentController");
const router = express.Router();

router.post("/payment/process", paymentProcess);
router.get("/stripeapikey", paymentApiKey);

module.exports = router;
