const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, {
      'host': config.host,
      'dialect': config.dialect,
      'logging': false
    });
}

fs
  .readdirSync(__dirname)
  .filter(directory => {
    return (directory !== 'index.js');
  })
  .forEach(directory => {
    fs
      .readdirSync(__dirname + '/' + directory)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const model = sequelize['import'](path.join(__dirname + '/' + directory, file));
        db[model.name] = model;
      });
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
