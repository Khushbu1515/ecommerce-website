const cartListingServices = require('../services/cartlisting.services');

async function cartController(req,res){
    const data = req.userdata;
    console.log(data);
    const cartListing = await cartListingServices.cartListing({
        user_id:data.user_id
    })
    res.json({
        cartListing: cartListing
    })
}

module.exports = {
    cartController
}