const sequelize = require('../db/database');
const {DataTypes} = require('sequelize');
const Order = sequelize.define('Order',
{
    order_id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    product_id:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    total:{
        type: DataTypes.INTEGER(20),
        allowNull: false
    },
    date:{
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},{
    timestamps:false,
    id: false
});

module.exports = Order;