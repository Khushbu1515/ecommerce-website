const express = require('express');
const router = express.Router();
const orderDetailsController = require('../controllers/order_details.controller')
const verifyToken = require('../middleware/verifyToken.middleware')

router.get("/getOrderDetails",verifyToken.userProfile,orderDetailsController.getOrderDetails);

module.exports = router;