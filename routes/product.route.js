const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller')

router.get("/getAll",productController.getAll);
router.post("/add_product",productController.insertProduct);
router.delete("/remove_product", productController.deleteProduct);

router.get("/category_product", productController.findCategoryProduct);
router.get("/get_product", productController.findProduct);
router.get("/update_product", productController.updateProduct);

module.exports = router;