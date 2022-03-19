const express = require('express');

const classeController = require('../controllers/classe');
const authChecker = require('../middleware/ath-checker');

const router = express.Router();

router.get('/classes', authChecker, classeController.getClasses);

router.post('/classes/add', authChecker, classeController.addClasse);

router.post('/classes/delete', authChecker, classeController.deleteClasse);

router.post('/classes/editar', authChecker, classeController.getEditClasse);

router.post('/classes/edit', authChecker, classeController.editClasse);

module.exports = router;