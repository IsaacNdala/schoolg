const express = require('express');

const salaController = require('../controllers/sala');
const authChecker = require('../middleware/ath-checker');

const router = express.Router();

router.get('/salas', authChecker, salaController.getSalas);

router.post('/salas/add', authChecker, salaController.addSala);

router.post('/salas/delete', authChecker, salaController.deleteSala);

router.post('/salas/editar', authChecker, salaController.getEditSala);

router.post('/salas/edit', authChecker, salaController.editSala);

module.exports = router;