const db = require("../models/index");

async function getAll() {
  const user = await db.User.findAll();
  return user;
}

async function updateUser({ updateOptions, whereOptions }) {
  const userUpdate = await db.User.update(updateOptions, {
    where: whereOptions,
  });
  const user = await db.User.findOne({
    where: whereOptions,
  });
  return user;
}

async function deleteUser({ user_id }) {
  const user = await db.User.destroy({
    where: {
      user_id: user_id,
    },
  });
  const allUser = await db.User.findAll();
  return allUser;
}

async function getUserByEmail({ email }) {
  const data = await db.User.findAll({
    where: {
      EmailAddress: email,
    },
    raw: true,
  });
  const user = data[0];
  return user;
}

async function addAddress({ createObject }) {
  const address = await db.Address.create(createObject);
  return address;
}

async function updateAddress({updateOptions, whereOptions}) {
  await db.Address.update(updateOptions, {
    where: whereOptions,
  });
  const address = await db.Address.findOne({
    where: whereOptions,
    raw: true,
  });
  return address;
}

async function getUserAddress({ whereOptions }) {
  const address = await db.Address.findOne({
    where: whereOptions,
    raw: true
  });
  return address;
}

async function deleteAddress({id}){
  await db.Address.destroy({
    where :{
      id: id
    }
  })
}

module.exports = {
  getAll,
  updateUser,
  deleteUser,
  getUserByEmail,
  addAddress,
  updateAddress,
  getUserAddress,
  deleteAddress
};