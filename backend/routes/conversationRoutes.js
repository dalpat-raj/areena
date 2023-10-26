const express = require("express");
const router = express.Router();
const { isSeller, isAutenticated } = require("../middleware/auth");
const { newConversation, getAllConversationSeller, updateLastConvrsation } = require("../controller/ConversationController");

router.post("/create-new-conversation", newConversation);
router.get("/get-all-conversation-seller/:id", isSeller, getAllConversationSeller);
router.get("/get-all-conversation-user/:id", isAutenticated, getAllConversationSeller);
router.put("/update-last-message/:id", updateLastConvrsation);


module.exports = router;
