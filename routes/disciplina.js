const express = require('express');

const disciplinaController = require('../controllers/disciplina');
const authChecker = require('../middleware/ath-checker');

const router = express.Router();

router.get('/disciplinas', authChecker, disciplinaController.getDisciplinas);

router.post('/disciplinas/add', authChecker, disciplinaController.addDisciplina);

router.post('/disciplinas/delete', authChecker, disciplinaController.deleteDisciplina);

router.post('/disciplinas/editar', authChecker, disciplinaController.getEditDisciplina);

router.post('/disciplinas/edit', authChecker, disciplinaController.editDisciplina);

module.exports = router;