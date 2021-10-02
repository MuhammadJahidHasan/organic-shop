const express = require('express');

const router = express.Router();

const { getProduct, addProduct, deleteProduct } = require('../controller/productController');
const {
    doProductValidator,
    doProductValidationHandler,
} = require('../middleware/product/productValidator');

router.get('/', getProduct);

router.post('/', doProductValidator, doProductValidationHandler, addProduct);

router.delete('/:id', deleteProduct);
module.exports = router;
