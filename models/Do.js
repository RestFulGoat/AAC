const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Do extends Model {}

Do.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = Do;