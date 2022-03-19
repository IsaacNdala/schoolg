const express = require('express');

const encarregadoController = require('../controllers/encarregado');
const authChecker = require('../middleware/ath-checker');

const router = express.Router();

router.get('/encarregados', authChecker, encarregadoController.getEncarregados);

router.post('/encarregados/add', authChecker, encarregadoController.addEncarregado);

router.post('/encarregados/delete', authChecker, encarregadoController.deleteEncarregado);

router.post('/encarregados/editar', authChecker, encarregadoController.getEditEncarregado);

router.post('/encarregados/edit', authChecker, encarregadoController.editEncarregado);

module.exports = router;