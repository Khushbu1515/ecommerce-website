const db = require('../models/index');

async function cartListing({user_id}){
    
    const data = await db.Cart.findAll({
        include : db.Product,
        where: {
            user_id:user_id
        }
    })
    if(data)
    {
        return data;
    }
    else throw err;
}

module.exports = {
    cartListing
}