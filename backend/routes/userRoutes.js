const express = require("express");
const { registerUser, 
    loginUser, 
    loadUser, 
    logoutUser,
    updateUser,
    updateUserAvatar,
    updateUserAddress,
    deleteUserAddress,
    updateUserPassword,
    findUserWithId,
    getAllUsersForAdmin
} = require("../controller/userController");
const router = express.Router();
const {upload} = require("../multer");
const { isAutenticated, isAdmin } = require("../middleware/auth");


router.post("/create-user", upload.single('file'), registerUser );
router.post("/login", loginUser);
router.get("/getuser", isAutenticated , loadUser);
router.get("/user-logout", logoutUser);
router.put("/update-user", isAutenticated, updateUser);
router.put("/update-user-avatar", isAutenticated, upload.single("image"), updateUserAvatar);
router.put("/update-user-address", isAutenticated, updateUserAddress);
router.delete("/delete-user-address/:id", isAutenticated, deleteUserAddress);
router.put("/update-user-password", isAutenticated, updateUserPassword);
router.get("/user-info/:id", findUserWithId);

// admin
router.get("/admin-get-all-users",isAutenticated, isAdmin("Admin"), getAllUsersForAdmin)



module.exports = router;