const { Op } = require("sequelize");
const db = require("../models/index");

async function addToInventory({ product_id, quantity, price }) {
  const inventory = await db.Inventory.create({
    product_id: product_id,
    quantity: quantity,
    price: price,
  });
  return inventory;
}

async function quantityDecrease({ cartData }) {
  const inventory = await Promise.all(
    cartData.map(async (obj) => {
      const [numUpdatedRows, updatedRows] = await db.Inventory.update(
        {
          quantity: db.sequelize.literal(`quantity - ${obj.quantity}`),
          price: db.sequelize.literal(`price - ${obj.price}`),
        },
        {
          where: {
            [Op.and]: [
              { product_id: obj.product_id },
              db.sequelize.literal(`quantity>=${obj.quantity}`),
            ],
          },
        }
      );
      return numUpdatedRows;
    })
  );
  return inventory;
}

async function validateQuantity({ product_id, quantity }) {
  const inventory = await db.Inventory.findOne({
    where: {
      [Op.and]: [
        { product_id: product_id },
        { quantity: db.sequelize.literal(`quantity>=${quantity}`) },
      ],
    },
    raw: true,
  });
  // console.log(inventory);
  return inventory;
}

module.exports = {
  addToInventory,
  quantityDecrease,
  validateQuantity,
};
