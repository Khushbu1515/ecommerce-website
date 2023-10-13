const { Op } = require("sequelize");
const db = require("../models/index");

async function getAll({ whereOptions, orderOptions }) {
  const product = await db.Category.findAndCountAll({
    attributes: ["Name"],
    include: [
      {
        model: db.Product,
        include: {
          model: db.Inventory,
          attributes: ["quantity"],
        },
        where: whereOptions,
        order: orderOptions,
      },
    ],
  });
  // console.log(product);
  return product;
}

async function insertProduct({
  product_name,
  c_id,
  description,
  price,
  imageUrl,
}) {
  const product = await db.Product.create({
    product_name: product_name,
    c_id: c_id,
    description: description,
    price: price,
    imageUrl: imageUrl,
  });
  return product;
}

async function updateProduct({ id, product_name, description, price }) {
  if (product_name) {
    await db.Product.update(
      { product_name: product_name },
      {
        where: {
          id: id,
        },
      }
    );
  }
  if (description) {
    await db.Product.update(
      { description: description },
      {
        where: {
          id: id,
        },
      }
    );
  }
  if (price) {
    await db.Product.update(
      { price: price },
      {
        where: {
          id: id,
        },
      }
    );
  }
  const product = await db.Product.findAll({
    where: {
      id: id,
    },
  });
  return product;
}

async function findCategoryProduct({  orderOptions, whereOptions }) {
  const { count, rows } = await db.Product.findAndCountAll({
    include:{
      model : db.Inventory,
      attributes: ['quantity']
    } ,
    where: whereOptions,
    order: orderOptions,
  });
  return { count, rows };
}

async function findProduct({ id }) {
  const product = await db.Product.findOne({
    where: {
      product_id: id,
    },
    raw: true,
  });
  //const allProduct = product.map(product=> product.toJSON());
  return product;
}

async function deleteProduct({ id }) {
  const product = await db.Product.destroy({
    where: {
      product_id: id,
    },
  });
  const allProduct = await db.Product.findAll();
  return allProduct;
}

module.exports = {
  getAll,
  insertProduct,
  updateProduct,
  deleteProduct,
  findCategoryProduct,
  findProduct,
};
