const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./incomexpense.sqlite",
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected Successfully");
    sequelize.sync();
  }).catch((err) => {
    console.log("Database Disconnected",err.message);
  });


module.exports = sequelize;