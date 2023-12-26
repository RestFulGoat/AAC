const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const connection = require("./db");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,32}/,
      },
    },
  },
  {
    sequelize: connection,
  }
);

User.addHook("beforeCreate", async (user) => {
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10)); // hashage password
});

User.addHook("beforeUpdate", async (user, options) => {
  if (options.fields.includes("password")) {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10)); // hashage password
  }
});

module.exports = User;