const inventoryController = require('../controllers/inventory.controller');
const inventoryMiddleware = require('../middleware/checkproduct');
const express = require('express')
const router = express.Router();

router.post('/addToInventory',[inventoryMiddleware.checkProduct],inventoryController.addToInventory);

module.exports = router;