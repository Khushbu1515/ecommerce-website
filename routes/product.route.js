const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const uploadImageMiddleware = require('../middleware/uploadImage.middleware')

router.get("/getAll",productController.getAll);
router.post("/add_product",uploadImageMiddleware.uploadImage,productController.insertProduct);
router.delete("/remove_product", productController.deleteProduct);

router.get("/category_product", productController.findCategoryProduct);
router.get("/get_product", productController.findProduct);
router.get("/update_product", productController.updateProduct);

module.exports = router;