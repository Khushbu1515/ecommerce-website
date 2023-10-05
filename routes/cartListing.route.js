const express = require('express');
const router = express.Router();
const signInMiddleware = require('../middleware/verifyToken.middleware')
const cartListingController = require('../controllers/cartlisting.controller');

router.get("/cart_listing",signInMiddleware.userProfile,cartListingController.cartController);

module.exports = router
   