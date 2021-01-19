const { Router } = require('express');
const optimizationController = require('../controllers/optimizationController');

const router = Router();

// routes defined as /optimization/<route>
router.get('/custom', optimizationController.customOptimization_get);
router.post('/custom', optimizationController.customOptimization_post);
router.get('/featured', optimizationController.featuredOptimization_get);
router.post('/featured', optimizationController.featuredOptimization_post);

module.exports = router;