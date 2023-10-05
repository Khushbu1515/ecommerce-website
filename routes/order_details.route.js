const express = require('express');
const router = express.Router();
const orderDetailsController = require('../controllers/order_details.controller')

router.get("/getOrderDetails",orderDetailsController.getOrderDetails);

module.exports = router;