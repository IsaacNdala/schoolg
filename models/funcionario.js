const Sequelize = require('sequelize');

const db = require('../database/db');

const Funcionario = db.define('funcionario', {
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
    // Date of birth
    dtNascimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salario: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    // Banc acount number
    numConta: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    estadoCivil: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // Idententity card code
    codBi: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Funcionario;