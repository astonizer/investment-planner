const { Router } = require('express');
const portfolioController = require('../controllers/portfolioController');

const router = Router();

// routes defined as /portfolio/<route>
router.get('/', portfolioController.portfolio_get);
router.get('/investments', portfolioController.investment_get);
router.get('/returns', portfolioController.return_get);

module.exports = router;