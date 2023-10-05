const inventoryServices = require('../services/inventory.services');

async function addToInventory(req,res){
    const data = req.body;
    const inventory = await inventoryServices.addToInventory({
        price:(data.price*data.quantity),
        product_id:data.product_id,
        quantity: data.quantity
    })
    res.json({
        message: `${data.quantity} pieces Product added to inventory`,
        AddedProduct: inventory
    })
}

module.exports = {
    addToInventory
}