const Sequelize = require('sequelize');

const connection = new Sequelize('schoolg', '', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = connection;