const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller')
const userMiddleWare = require('../middleware/verifyToken.middleware');
const inventoryMiddleware = require('../middleware/inventory.middleware')

router.get("/getAll",userMiddleWare.userProfile, cartController.getAll);
router.post("/addToCart",[userMiddleWare.userProfile,inventoryMiddleware.validateQuantity],cartController.addToCart);
router.delete("/removeCart",userMiddleWare.userProfile, cartController.deleteCart);
router.delete("/removeAllCart",userMiddleWare.userProfile, cartController.removeAllCart);
router.delete("/deleteWholeCart", userMiddleWare.userProfile,cartController.deleteWholeCart);

module.exports = router;