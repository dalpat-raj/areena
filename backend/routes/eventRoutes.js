const express = require("express");
const router = express.Router();
const { isSeller } = require("../middleware/auth");
const { upload } = require("../multer");

const {
  createEvent,
  getAllEvents,
  deleteShopEvent,
  getAllEventsUser,
} = require("../controller/eventController");


// seller
router.post("/event-create", upload.array("images"), createEvent);
router.get("/get-all-event-shop/:id",isSeller, getAllEvents);
router.delete("/delete-shop-event/:id", isSeller, deleteShopEvent);

// user 
router.get("/get-all-events-user", getAllEventsUser);

module.exports = router;
