const { Router } = require('express');
const sellController = require('../controllers/sellController');

const router = Router();

// routes defined as /sell/<route>
router.post('/asset', sellController.sell_post);

module.exports = router;