const { Op } = require("sequelize");
const db = require("../models/index");

async function getAll (){
  const category = await db.Category.findAll({
      raw: true,
      order : [['Name','ASC']]
  });
  // console.log(category);
  return (category);
}
async function insertCategory({ Name, c_id }) {
  const category = await db.Category.create({
    Name: Name,
    c_id: c_id,
  });
  return category;
}

async function updateCategory({ id, Name }) {
  const categoryUpdate = await db.Category.update(
    { Name: Name },
    {
      where: {
        id: id,
      },
    }
  );
  const category = await db.Category.findAll({
    where: {
      id: id,
    },
  });
  return category;
}

async function findSubCategory({ cat_id }) {
  const category = await db.Category.findOne({
    where: {
      cat_id: cat_id,
    },
    raw: true,
  });
  return category;
}

async function deleteCategory({ id }) {
  const category = await db.Category.destroy({
    where: {
      [Op.or]: [
        {
          cat_id: id,
        },
        {
          c_id: id,
        },
      ],
    },
  });
  const allCategory = await db.Category.findAll();
  return allCategory;
}

async function deleteSubCategory({ Name }) {
  await db.Category.destroy({
    where: {
      Name: Name,
    },
  });
  const allCategory = await db.Category.findAll();
  return allCategory;
}

async function getCategoryByName({ Name }) {
  const category = await db.Category.findOne({
    where: {
      Name: Name,
    },
  });
  return category;
}

module.exports = {
  getAll,
  insertCategory,
  updateCategory,
  deleteCategory,
  findSubCategory,
  getCategoryByName,
  deleteSubCategory,
};
