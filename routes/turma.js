const express = require('express');

const turmaController = require('../controllers/turma');
const authChecker = require('../middleware/ath-checker');

const router = express.Router();

router.get('/turmas', authChecker, turmaController.getTurmas);

router.post('/turmas/add', authChecker, turmaController.addTurma );

router.post('/turmas/delete', authChecker, turmaController.deleteTurma );

router.post('/turmas/editar', authChecker, turmaController.getEditTurma );

router.post('/turmas/edit', authChecker, turmaController.editTurma );

module.exports = router;