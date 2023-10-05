const db = require("../models/index");

async function getUser({ user_id }) {
  const user = await db.User.findOne({
    where: {
      user_id: user_id,
    },
    raw: true,
  });
  return user
}
async function userProfile({ user_id, index, size }) {
  
  const result = await db.User.findAll({
    attributes: ["userName"],
    include: [
      {
        model: db.Cart,
        attributes: ["price", "quantity"],
      },
      {
        model: db.Order,
        attributes: ["order_id", "total", "date"],
      },
    ],
    where: {
      user_id: user_id,
    },
  });
  const Order = await db.Order.findAll({
    where: {
      user_id: user_id,
    }
  });

    const userOrder = Order.map(order=> order.toJSON());
  // console.log(userOrder);

  const orderIds = userOrder.map((order) => order.order_id);
  console.log(orderIds);

  const OrderDetails = await db.OrderDetails.findAll({
    attributes: [ "product_id","order_id", "price", "quantity"],
    include: [
      {
        model: db.Product,
        attributes: ["product_id","product_name", "description","c_id"],
        include: [
          {
            model: db.Category,
            attributes: ["Name"],
          },
        ]
      },
    ],
    where: {
      order_id: orderIds,
    },
    limit: size,
    offset: index
  });
  // console.log(OrderDetails);
  
  return {result,OrderDetails};
}



async function checkOut({ user_id }) {
  const data = await db.Cart.findAll({
    where: {
      user_id: user_id,
    },
  });

  // console.log(data);
  const cartData = [];
  for (let i = 0; i < data.length; i++) {
    cartData[i] = data[i].dataValues;
  }
  
  await db.Cart.destroy({
    where: {
      user_id: user_id,
    },
  });

  //  console.log(cartData);
  return cartData;
}

module.exports = {
  userProfile,
  checkOut,
  getUser
};
