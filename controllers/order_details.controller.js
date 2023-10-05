const orderDetailsServices= require('../services/order_details.services');

async function getOrderDetails(req,res){
    const order = await orderDetailsServices.getOrderDetails()
    res.json({
        message:"All details from order",
        data: order
    })
};

async function addOrderDetails(req,res){
    const userData= req.userdata;
    const cartData= req.cartdata;
    const OrderDetails = await orderDetailsServices.addOrderDetails({
        user_id:userData.user_id,
        cartData:cartData
    });
    res.json({
        message:"Your order have placed",
        data: OrderDetails
    }) ;
}

module.exports = {
    getOrderDetails,
    addOrderDetails
}