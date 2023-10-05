const profileServices = require('../services/userprofile.services');
const orderServices = require('../services/order.services')

async function checkOut(req,res, next){
    const data = req.userdata;
    const userId = data.user_id;
        const cartdata = await profileServices.checkOut({
            user_id : userId
        });
        // console.log(cartdata);
       
            const order = await orderServices.insertOrder({
              cartdata
            });
            req.cartdata = cartdata;
            next();
    };
    
module.exports = {
    checkOut,
}