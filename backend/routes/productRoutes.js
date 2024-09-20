const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isSeller, isAutenticated, isAdmin } = require("../middleware/auth");
const {
  createProductShop,
  getAllProductShop,
  deleteShopProduct,
  getProductDetails,
  getProducts,
  createNewReview,
  deleteProductByAdmin,
  getSameProducts,
  getSearchProducts,
  getProductsCount,
  editShopProduct,
} = require("../controller/productController");

// user
router.get("/products-search", getSearchProducts);
router.get("/products", getProducts);
router.get("/get-product-details/:id", getProductDetails);
router.put("/create-new-review", isAutenticated, createNewReview);
router.get("/get-same-products/:name", getSameProducts);

// admin
router.delete("/delete-product-admin/:id",isAutenticated, isAdmin("Admin"), deleteProductByAdmin)
router.get("/products-count",isAutenticated, isAdmin("Admin"), getProductsCount)



// seller 
router.post("/create-product", isSeller, upload.array("images"), createProductShop);
router.put("/edit-shop-product/:id", isSeller, upload.array("images"), editShopProduct);
router.get("/get-all-product-shop/:id", getAllProductShop);
router.delete("/delete-shop-product/:id",isSeller, deleteShopProduct);

module.exports = router;
