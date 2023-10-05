const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const userProfileMiddleware = require('../middleware/verifyToken.middleware')

router.get("/getOrder",userProfileMiddleware.userProfile,orderController.getOrder);


module.exports = router;