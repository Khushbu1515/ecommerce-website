const express = require('express');
const router = express.Router();
const signInController = require('../controllers/user.signin');

router.post("/signIn", signInController.signIn);

module.exports = router