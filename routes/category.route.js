const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const categoryMiddleware = require('../middleware/category.middleware');



router.get("/getAll",categoryController.getAll);
router.post("/insert",[categoryMiddleware.subCategory,categoryMiddleware.validateCategory, 
    categoryMiddleware.categoryName],categoryController.insertCategory);

    
router.get("/get_category",categoryController.findSubCategory);
router.delete("/deleteCategory", categoryController.deleteCategory);
router.delete("/delte_sub_category/:Name", categoryController.deleteSubCategory);
router.put("/updateCategory",categoryController.updateCategory);




module.exports = router;