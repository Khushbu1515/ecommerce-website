const sequelize = require("../db/database");
const User = require("./user");
const Category = require("./category");
const Cart = require("./cart");
const Product = require("./product");
const Order = require("./order");
const OrderDetails = require("./order_details");
const Inventory = require('./inventory');

User.hasMany(Cart, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Cart.belongsTo(User, {
  foreignKey: "user_id",
});

Product.hasMany(Cart, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Cart.belongsTo(Product, {
  foreignKey: "product_id"
})

User.hasMany(Order, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Order.belongsTo(User, {
  foreignKey: "user_id",
});

Order.hasMany(OrderDetails, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderDetails.belongsTo(Order, {
  foreignKey: "order_id",
});

Category.hasMany(Product, {
  foreignKey: "c_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  });
Product.belongsTo(Category, {
  foreignKey: "c_id"
});

Product.hasMany(OrderDetails, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderDetails.belongsTo(Product,{
  foreignKey: "product_id"
})

Product.hasOne(Inventory,{
  foreignKey: "product_id",
  onUpdate:"CASCADE",
  onUpdate: "CASCADE"
})
Inventory.belongsTo(Product,{
  foreignKey:"product_id"
});


sequelize.sync({alter:false});
    
module.exports = {
  User,
  Category,
  Cart,
  Product,
  Order,
  OrderDetails,
  Inventory,
  sequelize
};
