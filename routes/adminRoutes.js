const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.post('/products', controller.addProduct);
router.put('/products/:id', controller.editProduct);
router.post('/products/bulk', controller.bulkUpload);

module.exports = router;
