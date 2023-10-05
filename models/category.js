const sequelize = require('../db/database');
const {DataTypes}= require('sequelize');
const Category = sequelize.define(
      'Categories', {
        cat_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Name :{
            type: DataTypes.STRING(74),
            allowNull: false
        },
        c_id: {
            type: DataTypes.INTEGER(30),
            allowNull: true
        },
       
    }, {
        timestamps:false,
        id: false
      });

module.exports= Category;