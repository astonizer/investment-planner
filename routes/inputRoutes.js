const { Router } = require('express');
const inputController = require('../controllers/inputController');

const router = Router();

// routes defined as /input/<route>
router.get('/custom', inputController.inputCustom_get);
router.get('/featured', inputController.inputFeatured_get);

module.exports = router;