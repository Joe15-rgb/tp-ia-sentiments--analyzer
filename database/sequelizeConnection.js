const Sequelize = require("sequelize");

require("dotenv").config();

class SequelizeConnection {
  instance = "";
  static getInstance() {
    if (!SequelizeConnection.instance) {
      const dbConfig = {};
      dbConfig.storage = process.env.DATABASE_DEV || process.env.DATABASE;
      dbConfig.password = process.env.DATABASE_PASSWORD || "";
      dbConfig.username = process.env.DATABASE_USER || "";
      dbConfig.logging = true;
      dbConfig.dialect = "sqlite";

      SequelizeConnection.instance = new Sequelize(dbConfig);
    }
    return SequelizeConnection.instance;
  }

  static async connect() {
    const sequelize = SequelizeConnection.getInstance();
    try {
      await sequelize.sync({
        alter: false,
        force: false,
      });
      console.log("Database connection successfully ");
      return sequelize;
    } catch (error) {
      console.log("Error while creation connection to database::" + error);
      return sequelize;
    }
  }
}

module.exports = SequelizeConnection;
