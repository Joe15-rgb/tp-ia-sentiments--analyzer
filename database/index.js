const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  storage: "H:/Projets/Tmp/Vscodeium/database.sqlite",
  dialect: "sqlite",
  //  logging: console.log
  logging: console.log,
});

const db = {};

db.MessageAnalyzed = require("./models/Messages")(sequelize);

module.exports = db;
