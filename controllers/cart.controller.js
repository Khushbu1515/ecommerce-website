const { Op } = require('sequelize');
const cartServices = require("../services/cart.services");
const db = require("../models/index");

async function getAll(req, res) {
  const data = req.userdata;
  const cart = await cartServices.getAll({
    user_id: data.user_id,
  });
  res.json({
    message: "All details from cart",
    data: cart,
  });
}

async function addToCart(req, res) {
  const data = req.body;
  const userdata = req.userdata;
  // console.log(userdata);
  const userId = userdata.user_id;

  const result = await cartServices.addOneMore({
    product_id: data.product_id,
    user_id: userId,
  });
  const count = result.length;


  if (count == 0 || count == null || count == undefined) {
    const price = await cartServices.findPrice({
      user_id: userId,
      product_id: data.product_id,
      quantity: data.quantity,
    });
    console.log(price);

    const cart = await cartServices.insertCart({
      product_id: data.product_id,
      quantity: data.quantity,
      user_id: userId,
      price: price,
    });
    res.status(200).json({
      message: " Added to Cart",
      data: cart,
    });
  }

  else {

    const price = await cartServices.findPrice({
      user_id: userId,
      product_id: data.product_id,
      quantity: data.quantity,
    });
    await db.Cart.update(
      {
        quantity: db.sequelize.literal(`quantity+${data.quantity}`),
        price: db.sequelize.literal(`price + ${price}`)
      },
      {
        where: {
          [Op.and]: [{ user_id: userId }, { product_id: data.product_id }],
        },
      }
    );
    const cartdata = await db.Cart.findAll({
      where :{
        [Op.and]: [
          [{ user_id: userId }, { product_id: data.product_id }]
        ]
      }
    });
    res.json({
      updatedCart: cartdata
    })
  }
}


// delete cart
async function deleteCart(req, res) {
  const userdata = req.userdata;
  console.log(userdata);
  const data = req.query;
  
  const cart = await cartServices.removeCart({
    product_id: data.product_id,
    user_id: userdata.user_id
  });
  res.json({
    message: `${data.product_id} removed from cart`,
    data: cart,
  });
}

//remove all cart
async function removeAllCart(req,res){
  const cart = await cartServices.removeAll({
    user_id: req.userdata.user_id,
    product_id: req.query.product_id
  })
  res.json({
    message: `cart with ${req.query.product_id} deleted`,
  })
}

async function deleteWholeCart(req,res){
  const cart = await cartServices.removeAllCart({
    user_id: req.userdata.user_id
  })
  res.json({
    message: `cart with ${req.userdata.user_name} deleted`,
  })
}


module.exports = {
  getAll,
  addToCart,
  deleteCart,
  removeAllCart,
  deleteWholeCart
};
