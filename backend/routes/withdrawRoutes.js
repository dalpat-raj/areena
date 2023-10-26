const express = require("express");
const { createWithdrawRequest, getAllWithdrawRequest, updateWithdrawRequest } = require("../controller/withdrawController");
const {isSeller, isAutenticated, isAdmin} = require("../middleware/auth")
const router = express.Router();


router.post("/create-withdraw-request",isSeller, createWithdrawRequest);
router.get("/get-all-withdraw-request", isAutenticated, isAdmin("Admin"), getAllWithdrawRequest)
router.put("/update-withdraw-request/:id", isAutenticated, isAdmin("Admin"), updateWithdrawRequest)


module.exports = router;
