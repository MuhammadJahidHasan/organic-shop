const express = require('express');

const router = express.Router();
const { addToCart, getCart, removeCart } = require('../controller/cartController');
const { checkUserLogin } = require('../middleware/common/verifyUserLogin');

router.get('/:id', checkUserLogin, getCart);
router.post('/:id', checkUserLogin, addToCart);
router.delete('/:userId/:itemId', checkUserLogin, removeCart);

module.exports = router;
