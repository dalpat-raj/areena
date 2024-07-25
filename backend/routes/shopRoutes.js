const express = require("express");
const router = express.Router();
const {upload} = require("../multer");
const { shopCreate, 
    activationShop, 
    loginShop, 
    loadShop, 
    logoutShop,
    getShopInfo,
    updateShopAvatar,
    updateShop,
    getAllSellerForAdmin,
    deleteSellersByAdmin,
    addWithdrawMethods,
    deleteWithdrawMethods,
    updatePinCode,
    deletePinCode,
    forgateShopPassword
} = require("../controller/shopController");
const { isSeller, isAdmin, isAutenticated } = require("../middleware/auth")



router.post("/shop-create", upload.single("file"), shopCreate);
router.post("/shop-activation", activationShop);
router.post("/shop-login", loginShop);
router.get("/getseller",isSeller,  loadShop);
router.get("/shop-logout", logoutShop)
router.get("/get-shop-info/:id", getShopInfo);
router.put("/update-shop-avatar", isSeller, upload.single("image"), updateShopAvatar);
router.put("/update-shop", isSeller, updateShop);
router.put("/shop-delivery-pincode-add", isSeller, updatePinCode);
router.put("/add-seller-withdraw-methods", isSeller, addWithdrawMethods)
router.delete("/shop-delivery-pincode-delete/:pin", isSeller, deletePinCode)
router.delete("/delete-withdraw-methods", isSeller, deleteWithdrawMethods)
router.post("/forgate-shop-password", forgateShopPassword);

// admin
router.get("/admin-get-all-seller",isAutenticated, isAdmin("Admin"), getAllSellerForAdmin)
router.delete("/delete-seller-by-admin/:id",isAutenticated, isAdmin("Admin"), deleteSellersByAdmin)

router.get("/get-seller-for-delivery/:id", getShopInfo)

module.exports = router;