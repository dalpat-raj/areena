const express = require("express");
const { isAutenticated} = require("../middleware/auth");
const { OrderIdGenerating, PaymentProcess } = require("../controller/paymentController");
const router = express.Router();

router.post('/payment/orders-id-generating', isAutenticated, OrderIdGenerating)
router.post("/payment/payment-verify-process", isAutenticated, PaymentProcess);

module.exports = router;
