const express = require('express');

const router = express.Router();

const authRoutes = require('./auth');
const dashboardRoutes = require('./dashboard');
const funcionarioRoutes = require('./funcionario');
const perfilRoutes = require('./perfil');
const encarregadoRoutes = require('./encarregado');
const cursoRoutes = require('./curso');
const classeRoutes = require('./classe');
const salaRoutes = require('./sala');
const turmaRoutes = require('./turma');
const alunoRoutes = require('./aluno');
const disciplinaRoutes = require('./disciplina');

router.use(authRoutes);

router.use(dashboardRoutes);

router.use(funcionarioRoutes);

router.use(perfilRoutes);

router.use(encarregadoRoutes);

router.use(cursoRoutes);

router.use(classeRoutes);

router.use(salaRoutes);

router.use(turmaRoutes);

router.use(alunoRoutes);

router.use(disciplinaRoutes);

module.exports = router;