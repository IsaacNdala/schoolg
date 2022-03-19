const express = require('express');

const dashboardController = require('../controllers/dashboard');
const authChecker = require('../middleware/ath-checker');

const router = express.Router();

router.get('/', authChecker, dashboardController.getDashboard);

module.exports = router;