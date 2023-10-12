const express = require("express");
const router = express.Router();
const signInController = require("../controllers/user.signin");
const userMiddleware = require('../middleware/user.middleware')

router.post(
  "/signIn",
  [
    userMiddleware.validateUser,
    userMiddleware.validateEmail,
    userMiddleware.validatePassword,
  ],
  signInController.signIn
);

module.exports = router;
