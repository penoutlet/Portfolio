'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       =  process.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
var config    = require('./../config/config.json');
var db        = {};

if (config.use_env_variable) {
  console.log('if')
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  console.log('else')
  var sequelize = new Sequelize(config.username, config.password,
    {host: "JAWSDB_URL",
    dialect: "mysql"
  });
};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(sambook) {
  if (db[sambook].associate) {
    db[sambook].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
