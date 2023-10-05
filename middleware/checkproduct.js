const productServices = require('../services/product.services');

async function checkProduct(req,res,next){
    const data = req.body;
    const product = await productServices.findProduct({
        id:data.product_id
    })
    const len = product.length
    if(len==0 || len == undefined   || len == null)
    {
        res.json({
            message:"product doesnot exist on product table"
        })
    }
    next();
}

module.exports = {
    checkProduct
}