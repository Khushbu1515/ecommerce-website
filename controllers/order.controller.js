const orderServices= require('../services/order.services');
const userProfileServices = require('../services/userprofile.services')

async function getOrder(req,res){
    const data = req.userdata
    const order = await orderServices.getOrder({
        user_id: data.user_id
    })
    res.json({
        message:"All details from order",
        data: order
    })
};


// async function deleteOrder(req,res){
//     const data = req.body;
//     const order = await orderServices.removeOrder({
//         product_id: data.product_id
//     });
//     res.json({
//         message: `${data.product_id} removed from order`,
//         data: order
//     })
// };

module.exports = {
    getOrder,
    // deleteOrder
}