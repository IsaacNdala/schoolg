const Sequelize = require('sequelize');

const db = require('../database/db');

const Disciplina = db.define('disciplina', {
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

module.exports = Disciplina;