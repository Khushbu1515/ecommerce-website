const sequelize = require("../db/database");
const { DataTypes } = require("sequelize");
const address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      defaultValue: "1",
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    id: false,
  }
);

module.exports = address;