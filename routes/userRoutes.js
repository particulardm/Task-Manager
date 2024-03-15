const express = require('express');
const router = express.Router();

const { registration, login } = require('../controllers/userController');

router
.post('/reg', registration)
.post('/login', login);

module.exports = router;