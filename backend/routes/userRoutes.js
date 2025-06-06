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
    getAllUsersForAdmin,
    forgateUserPassword
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
router.delete("/delete-user-address", isAutenticated, deleteUserAddress);
router.put("/update-user-password", isAutenticated, updateUserPassword);
router.get("/user-info/:id", findUserWithId);
router.post("/forgate-user-password", forgateUserPassword);

// admin
router.get("/admin-get-all-users",isAutenticated, isAdmin("Admin"), getAllUsersForAdmin)



module.exports = router;