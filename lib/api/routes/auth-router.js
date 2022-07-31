const express = require('express');
const authController = require('../controllers/auth-controller');
const paths = require('./paths/auth');
const router = express.Router();

const { register, login, logout } = authController;

router.post(paths.registration, register);
router.post(paths.login, login);
router.post(paths.logout, logout);

module.exports = router;
