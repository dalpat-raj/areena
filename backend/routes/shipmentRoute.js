const express = require("express");
const router = express.Router();

const { isSeller} = require("../middleware/auth");
const { download_Invoice } = require("../controller/shipmentController");



router.post("/shiprocket/download-invoice/:shipment_id", isSeller, download_Invoice);


module.exports = router;