const express = require('express');

const cursoController = require('../controllers/curso');
const authChecker = require('../middleware/ath-checker');

const router = express.Router();

router.get('/cursos', authChecker, cursoController.getCursos);

router.post('/cursos/add', authChecker, cursoController.addCurso);

router.post('/cursos/delete', authChecker, cursoController.deleteCurso);

router.post('/cursos/editar', authChecker, cursoController.getEditCurso);

router.post('/cursos/edit', authChecker, cursoController.editCurso);

module.exports = router;