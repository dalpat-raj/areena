const express = require("express");
const router = express.Router();
const {upload} = require("../multer")
const { createNewMessage, getAllMessages } = require("../controller/messageControler");


router.post("/create-new-message", upload.single("images"), createNewMessage);
router.get("/get-all-messages/:id", getAllMessages);


module.exports = router;
