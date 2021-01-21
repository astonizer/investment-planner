const { Router } = require('express');
const portfolioController = require('../controllers/portfolioController');

const router = Router();

// routes defined as /portfolio/<route>
router.get('/investments', portfolioController.investment_get);

module.exports = router;