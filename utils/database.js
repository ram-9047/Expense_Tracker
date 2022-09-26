const Sequelize = require("sequelize");
const dbConfig = require("../config/db-config");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    dialect: dbConfig.DIALECT,
    host: dbConfig.HOST,
  }
);

module.exports = sequelize;
