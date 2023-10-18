const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const userMiddleware = require("../middleware/user.middleware");
const verifyToken = require("../middleware/verifyToken.middleware");
const userProfileController = require("../controllers/user.profile.controller");
const uploadImage = require("../middleware/uploadImage.middleware");

router.get("/getuser", verifyToken.userProfile, userProfileController.getUser);
router.put(
  "/update",
  [
    verifyToken.userProfile,
    userMiddleware.validateUser,
    userMiddleware.validateEmail,
  ],
  userController.update
);
router.post("/updateImage", [
  verifyToken.userProfile,
  uploadImage.updateUserImage,
]);
router.get("/getAll", userController.getAll);
router.delete(
  "/deleteUser",
  verifyToken.userProfile,
  userController.deleteUser
);
router.post(
  "/addAddress",
  [verifyToken.userProfile, userMiddleware.userAddressValidation],
  userController.addAddress
);
router.post(
  "/updateAddress",
  verifyToken.userProfile,
  userController.updateAddress
);

router.post(
  "/deleteAddress",
  verifyToken.userProfile,
  userController.deleteAddress
);
module.exports = router;
