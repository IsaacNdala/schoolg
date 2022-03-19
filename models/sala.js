const Sequelize = require('sequelize');

const db = require('../database/db');

const Sala = db.define('sala', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    designacao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Sala;