const Sequelize = require('sequelize');

const connection = new Sequelize('schoolgdb_db', 'schoolgdb_user', 'Za5KFgvYg9iSx@Z', {
    dialect: 'mysql',
    host: 'mysql-schoolgdb.alwaysdata.net'
});

module.exports = connection;