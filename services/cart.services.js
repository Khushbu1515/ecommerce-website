const { Op } = require("sequelize");

const db = require("../models/index");

const getAll = async function ({ user_id }) {
  const cart = await db.Cart.findAll({
    where: {
      user_id: user_id,
    },
  });
  return cart;
};

const addOneMore = async function ({ user_id, product_id }) {
  const result = await db.Cart.findAll({
    where: {
      [Op.and]: [{ user_id: user_id }, { product_id: product_id }],
    },
    raw: true,
  });
  // Extract the count from the result object

  console.log(user_id, product_id);
  console.log(result);
  return result;
};

const findPrice = async function ({ product_id, quantity }) {
  const data = await db.Product.findAll({
    where: {
      product_id: product_id,
    },
  });
  const productdata = data.map((obj) => obj.toJSON());
  // console.log(productdata);

  const price = quantity * productdata[0].price;
  console.log(price);
  return price;
};

const insertCart = async function ({ product_id, user_id, quantity, price }) {
  const cart = await db.Cart.create({
    product_id: product_id,
    user_id: user_id,
    quantity: quantity,
    price: price,
  });
  return cart;
};

const removeCart = async function ({ product_id, user_id }) {
  const findQuantity = await db.Cart.findAll({
    attributes: ["quantity"],
    where: {
      [Op.and]: [{ user_id: user_id }, { product_id: product_id }],
    },
    raw: true,
  });
  console.log(findQuantity);
  const quantity = findQuantity[0].quantity;

  if (quantity == 1) {
    await db.Cart.destroy({
      where: {
        product_id: product_id,
      },
    });
  } else if (quantity > 1) {
    await db.Cart.update(
      {
        quantity: db.sequelize.literal(`quantity - ${1}`),
      },
      {
        where: {
          [Op.and]: [{ user_id: user_id }, { product_id: product_id }],
        },
      }
    );
  }
};

const removeAll = async function ({ product_id, user_id }) {
  await db.Cart.destroy({
    where: {
      [Op.and]: [{ user_id: user_id }, { product_id: product_id }],
    },
  });
  return `All Products with Product Id ${product_id} has removed`;
};

const removeAllCart = async function ({ user_id }) {
  await db.Cart.destroy({
    where: { user_id: user_id },
  });
  return `All Carts with ${user_id} has removed`;
};

module.exports = {
  getAll,
  insertCart,
  removeCart,
  findPrice,
  addOneMore,
  removeAll,
  removeAllCart,
};
