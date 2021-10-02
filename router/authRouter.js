const express = require('express');
const { addUser, login, logout } = require('../controller/authController');
const { addUserValidators, addUserValidationHandler } = require('../middleware/auth/userValidator');

const router = express.Router();
router.post('/signup', addUserValidators, addUserValidationHandler, addUser);
router.post('/login', login);
router.delete('/', logout);

module.exports = router;
