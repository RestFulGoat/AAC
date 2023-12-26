const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Did extends Model {}

Did.init(
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

module.exports = Did;