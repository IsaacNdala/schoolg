const Sequelize = require('sequelize');

const db = require('../database/db');

const Curso = db.define('curso', {
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

module.exports = Curso;