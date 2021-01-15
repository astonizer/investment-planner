const { Router } = require('express');
const capController = require('../controllers/capController');

const router = Router();

router.get('/small', capController.smallCap_get);
router.get('/mid', capController.midCap_get);
router.get('/large', capController.largeCap_get);

module.exports = router;