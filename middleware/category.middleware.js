const categoryServices = require('../services/category.services');

const subCategory =  function(req,res,next) {
    const data = req.body
    if(data.type == 'sub category' && data.c_id == null ){
        res.status(204).json({
            message: "Enter Category Id"
        })
        return;
    };
    next();
}

const validateCategory = function(req,res,next){
    const data = req.body;
    if(data.Name == ' ' || data.Name == null || data.Name == undefined || data.Name == ""){
        res.status(422).json({
            message: "Invalid Category Name"
        })
        return;
    }
    next();
}

const categoryName = async function(req,res, next){
    const data = req.body;
    const category = await categoryServices.getCategoryByName({
        Name: data.Name
    })
    if(category != null) {
        res.status(409).json({
        message: `${data.type} already exsist`
    })
    return;
};
    next();
}

module.exports = {
    subCategory,
    validateCategory,
    categoryName
}