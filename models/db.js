const { Sequelize } = require("sequelize");

const connection = new Sequelize(
  process.env.DATABASE_URL ?? "mysql://root:toor@localhost:3306/app"
);

connection.authenticate().then(() => {
  console.log("Database connection has been established successfully.");
  connection.sync()
  .then(() => {
    console.log('Database synced successfully');
   

  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
});

module.exports = connection;