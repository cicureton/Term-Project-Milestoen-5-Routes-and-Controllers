const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.post('/', controller.addToCart);
router.delete('/:productId', controller.removeFromCart);
router.post('/checkout', controller.checkout);

module.exports = router;
