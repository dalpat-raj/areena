const express = require("express");
const { createExploreTopBanner, getExploreTopBanner, deleteExploreTopBanner } = require("../controller/bannerController");
const router = express.Router();
const {upload} = require("../multer");
const { isAutenticated, isAdmin } = require("../middleware/auth");


// get Color 
router.post("/admin/expolre-top-banner", isAutenticated, isAdmin("Admin"), upload.single('file'), createExploreTopBanner);
router.get("/get-expolre-top-banner", getExploreTopBanner);
router.delete("/admin/delete-expolre-top-banner/:id", isAutenticated, isAdmin("Admin"), deleteExploreTopBanner);

module.exports = router;