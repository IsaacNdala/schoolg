const Sequelize = require('sequelize');

const connection = new Sequelize('schoolg', 'root', '12345678', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = connection;