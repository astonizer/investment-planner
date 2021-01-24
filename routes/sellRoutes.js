const { Router } = require('express');
const sellController = require('../controllers/sellController');

const router = Router();

router.post('/signup', sellController.sell_post);

module.exports = router;