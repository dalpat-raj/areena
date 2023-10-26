const express = require("express");
const { getAllColor } = require("../controller/colorController");
const router = express.Router();

// get Color 
router.get("/get-all-color", getAllColor);


module.exports = router;