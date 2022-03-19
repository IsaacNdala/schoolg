const Sequelize = require('sequelize');

const db = require('../database/db');

const Encarregado = db.define('encarregado', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email:  Sequelize.STRING,
    parentesco: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Encarregado;