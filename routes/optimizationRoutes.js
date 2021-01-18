const { Router } = require('express');
const optimizationController = require('../controllers/optimizationController');

const router = Router();

// routes defined as /input/<route>
router.get('/custom', optimizationController.custom_get);

module.exports = router;