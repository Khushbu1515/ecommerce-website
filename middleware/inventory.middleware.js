const db =require('../models/index')
const inventoryServices = require('../services/inventory.services')

async function inventoryQuantity(req,res,next){
    const cartData = req.cartdata;
    const inventory = await inventoryServices.quantityDecrease({
        cartData: cartData
    });
    console.log(inventory);
    if(inventory == 0){
        res.status(404).json({
            message : `Product not found or Out of Stock`
        })
        return
    }
    next();
}

async function validateQuantity(req,res,next){
    const data = req.body;
    console.log(data,"<------Body data");
    const inventory = await inventoryServices.validateQuantity({
        product_id:data.product_id,
        quantity: data.quantity
    })

    if( inventory == null || inventory == undefined || !inventory ){
        res.json({
            message:`Product Out Of Stock.`
        })
        return;
    }
    next();
}
 
module.exports = {
    inventoryQuantity,
    validateQuantity
}