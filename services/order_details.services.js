const db = require("../models/index");

const getOrderDetails = async function ({ order_id }) {
  const order = await db.Order.findAll({
    where: {
      order_id: order_id,
    },
  });
  return order;
};

async function addOrderDetails({ user_id, cartData }) {
  const Order = await db.Order.findAll({
    where: {
      user_id: user_id,
    },
  });
  const userOrder = Order.map((order) => order.toJSON());

  await Promise.all(
    userOrder.map(async (obj) => {
      const order_id = obj.order_id;
      const cartItem = cartData.find((item) => item.product_id === obj.product_id);

      if (cartItem) {
        await db.OrderDetails.bulkCreate([
          {
            order_id: order_id,
            product_id: obj.product_id,
            price: obj.total,
            quantity: cartItem.quantity,
          },
        ]);
      }
    })
  );
  const orderDetails = await db.OrderDetails.findAll();
  const cart = [];
await Promise.all(
  cartData.map(async (obj) => {
    try {
      const data = await db.Product.findOne({
        where: {
          product_id: obj.product_id,
        },
        raw: true,
      });
      if (data) {
        console.log("Cart details", data);
        cart.push(data.toJSON());
      } else {
        console.log(`No product found for product_id: ${obj.product_id}`);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  })
);

  console.log(orderDetails, cart);
  return {orderDetails, cart};
}

module.exports = {
  getOrderDetails,
  addOrderDetails,
};
