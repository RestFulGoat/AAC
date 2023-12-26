const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Done extends Model {}

Done.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = Done;