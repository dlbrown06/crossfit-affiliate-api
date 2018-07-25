"use strict";

const fs = require("fs");
const def = require("../../config/definitions");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const db = {};
const logger = require("../../config/logger");
const sequelize = new Sequelize(def.DB.URL, {
  logging: def.APP.ENV === "production" ? false : log => logger.info(log),
  pool: {
    max: 25,
    min: 0,
    idle: 10000
  }
});

fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== def.CONSTANTS.ZERO &&
      file !== basename &&
      path.extname(file) === ".js"
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
