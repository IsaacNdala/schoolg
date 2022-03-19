const Sequelize = require('sequelize');

const db = require('../database/db');

const Nota = db.define('notas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // Média das Avalições Contínuas
    mac: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    // Prova do Professor
    pp: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    // Prova Escolar
    pe: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = Nota;