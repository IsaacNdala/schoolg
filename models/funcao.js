const Sequelize = require('sequelize');

const db = require('../database/db');

const Funcao = db.define('funcao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    designacao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: Sequelize.TEXT,
    nivelAcesso: {
        type: Sequelize.INTEGER,
        allowNull: false
    } 
});

module.exports = Funcao;