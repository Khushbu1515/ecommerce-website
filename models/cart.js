const sequelize = require('../db/database');
const {DataTypes} = require('sequelize');
const Cart = sequelize.define('Cart',
{
    cart_id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    product_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    quantity:{
        type:DataTypes.INTEGER(10),
        allowNull:false
    },
    price:{
        type: DataTypes.INTEGER(20),
        allowNull: false
    }
},{
    timestamps:false,
    id: false
});

module.exports = Cart;