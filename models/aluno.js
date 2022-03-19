const Sequelize = require('sequelize');

const db = require('../database/db');

const Aluno = db.define('aluno', {
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
    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Date of birth
    dtNascimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: Sequelize.STRING,
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estadoCivil: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Identity card code
    codBi: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Student ID
    numProcesso: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    foto: Sequelize.TEXT,
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Aluno;