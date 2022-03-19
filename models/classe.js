const Sequelize = require('sequelize');

const db = require('../database/db');

const Classe = db.define('classe', {
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

module.exports = Classe;