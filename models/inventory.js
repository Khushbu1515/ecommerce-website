const sequelize = require('../db/database');
const {DataTypes} = require('sequelize');
const inventory = sequelize.define('Inventory',
{
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    product_id:{ 
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER(20),
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER(20),
        allowNull: false,
        defaultValue : "1"
    }
},{
    timestamps:false,
    id: false
});

module.exports = inventory;