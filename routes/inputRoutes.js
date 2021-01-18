const { Router } = require('express');
const inputController = require('../controllers/inputController');

const router = Router();

// routes defined as /input/<route>
router.get('/custom', inputController.inputCustom_get);
router.post('/custom', inputController.inputCustom_post);
router.get('/featured', inputController.inputFeatured_get);
router.post('/featured', inputController.inputFeatured_post);

module.exports = router;