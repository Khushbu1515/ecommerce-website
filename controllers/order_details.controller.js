const orderDetailsServices = require("../services/order_details.services");
const db = require("../models/index");
const pdfCreate =require('../services/pdfServices')

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

  const { orderDetails, uuid } = await orderDetailsServices.addOrderDetails({
    user_id: userData.user_id,
    cartData: cartData,
  });
  const data = orderDetails.map((obj) => obj.toJSON());
  const pdf = pdfCreate.createInvoice(data);
  console.log(pdf, "<-- pdflink");
  await db.OrderDetails.update(
    { invoice: pdf },
    {
      where: {
        uuid: uuid,
      },
    }
  );
  const details = await db.OrderDetails.findAll({
    attributes: ["id"],
    where: {
      uuid: uuid,
    },
    raw: true,
  });
  const logEntries = details.map((detail) => ({
    user_id: req.userData.user_id,
    OrderDetails_id: detail.id,
  }));
  
  await db.Log.bulkCreate(logEntries);

  res.json({
    message: "Your order have placed",
    data: orderDetails,
    uuid: uuid,
    invoiceLink: pdf,
  });
}

module.exports = {
  getOrderDetails,
  addOrderDetails,
};
