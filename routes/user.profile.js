const express = require('express');
const router = express.Router();
const userProfileMiddleware = require('../middleware/verifyToken.middleware');
const checkoutMiddleware = require('../middleware/checkout.middleware')
const userProfileController = require('../controllers/user.profile.controller');
const orderDetailsController = require('../controllers/order_details.controller');
const inventoryMiddleware = require('../middleware/inventory.middleware')


router.get("/profile", userProfileMiddleware.userProfile, userProfileController.userProfile);
router.get("/checkOut", [userProfileMiddleware.userProfile, 
    checkoutMiddleware.checkOut], orderDetailsController.addOrderDetails);


module.exports = router;