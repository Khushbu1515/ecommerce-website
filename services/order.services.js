const db = require('../models/index');
const userProfileServices = require('./userprofile.services')

const getOrder = async function ({user_id}){
    const order = await db.Order.findAll({
        where:{
            user_id:user_id
        }
    });
    return order;
};

const insertOrder = async function ({ cartdata }) {
    // console.log(cartdata);

    const addOrders = await Promise.all(
      cartdata.map(async obj => {
        await db.Order.bulkCreate([
          {
            user_id: obj.user_id,
            product_id:obj.product_id,
            total: obj.price,
          },
        ]);
      })
    );

    const orders = await db.Order.findAll()
    return orders;
  };

module.exports = {
    getOrder,
    insertOrder,
}