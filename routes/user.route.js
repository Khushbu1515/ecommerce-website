const express = require('express');
const router = express.Router();
const {insert, update, getAll, deleteUser} = require('../controllers/user.controller')
const userMiddleware = require('../middleware/user.middleware');
const verifyToken = require('../middleware/verifyToken.middleware')
const userProfileController = require('../controllers/user.profile.controller')

router.get("/getuser",verifyToken.userProfile,userProfileController.getUser);
router.put("/update",[verifyToken.userProfile,userMiddleware.validateUser,userMiddleware.validateEmail], update);
router.get("/getAll",getAll);
router.delete("/deleteUser",verifyToken.userProfile,deleteUser);

module.exports= router;