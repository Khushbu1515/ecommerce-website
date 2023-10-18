const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");
const logtable = sequelize.define("Log", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  OrderDetails_id: {
    type: DataTypes.INTEGER,
  },
});
module.exports = logtable;