const orderDetailsServices = require("../services/order_details.services");
const db = require("../models/index");

async function getOrderDetails(req, res) {
  const uuid = req.query.uuid;
  const order = await orderDetailsServices.getOrderDetails({
    uuid: uuid,
  });
  res.json({
    message: "All details from order",
    data: order,
  });
}

async function addOrderDetails(req, res) {
  const userData = req.userdata;
  const cartData = req.cartdata;
  const {orderDetails, uuid} = await orderDetailsServices.addOrderDetails({
    user_id: userData.user_id,
    cartData: cartData,
  });
  
  res.json({
    message: "Your order have placed",
    data: orderDetails,
    uuid: uuid,
  });
}

module.exports = {
  getOrderDetails,
  addOrderDetails,
};
