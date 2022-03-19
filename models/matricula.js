const Sequelize = require('sequelize');

const db = require('../database/db');

const Matricula = db.define('matricula', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numProcesso: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    turno: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anoLectivo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Matricula;