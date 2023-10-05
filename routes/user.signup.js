const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/user.middleware');
const userSignup = require('../controllers/user.signup')

router.post("/signUp",[userMiddleware.validateUser,userMiddleware.validateEmail],
userSignup.signUp);

module.exports = router;