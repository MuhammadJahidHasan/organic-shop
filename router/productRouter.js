const express = require('express');

const router = express.Router();

const { getProduct, addProduct, deleteProduct } = require('../controller/productController');
const {
    doProductValidator,
    doProductValidationHandler,
} = require('../middleware/product/productValidator');

const {checkUserLogin} = require('../middleware/common/verifyUserLogin');

router.get('/', checkUserLogin, getProduct);

router.post('/',checkUserLogin, doProductValidator, doProductValidationHandler, addProduct);

router.delete('/:id',checkUserLogin, deleteProduct);
module.exports = router;
