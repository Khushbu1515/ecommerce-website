const sequelize = require('../db/database');
const {DataTypes, Model} = require('sequelize');

const User = sequelize.define(
      'Users', {
        user_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        firstName :{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        lastName : { 
            type: DataTypes.STRING(20),
            allowNull: false
        },
        userName: {
            type : DataTypes.STRING(40),
            allowNull: false,
        },
        EmailAddress: {
            type: DataTypes.STRING(100),
        },
        password: {
            type : DataTypes.STRING(50),
            allowNull: false
        },
        imageUrl:{
            type: DataTypes.STRING
        }
       
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
        tableName: 'Users',
        timestamps:false,
        id: false
      });

module.exports= User