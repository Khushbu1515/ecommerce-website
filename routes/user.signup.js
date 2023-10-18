const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/user.middleware");
const userSignup = require("../controllers/user.signup");
const uploadImage = require('../middleware/uploadImage.middleware')

router.post(
  "/signUp",
  [
    uploadImage.uploadImageForSignup,
    userMiddleware.validateUser,
    userMiddleware.validateEmail,
    userMiddleware.checkExistingUser,
    userMiddleware.validatePassword,
  ],
  userSignup.signUp
);

module.exports = router;
