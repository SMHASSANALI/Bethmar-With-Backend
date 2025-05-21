const express = require('express');
const {
    login,
    register,
    resetPassword,
    logout,
} = require('../controllers/Auth.controller.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

module.exports = router;