const { Router } = require('express');
const capController = require('../controllers/capController');

const router = Router();

// routes defined as /cap/<route>
router.get('/small', capController.smallCap_get);
router.post('/small', capController.smallCap_post);
router.get('/mid', capController.midCap_get);
router.post('/mid', capController.midCap_post);
router.get('/large', capController.largeCap_get);
router.post('/large', capController.largeCap_post);

module.exports = router;