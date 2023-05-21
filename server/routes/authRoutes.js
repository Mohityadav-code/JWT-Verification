const express = require('express');
const router = express.Router();
const {getUser,loginUser,registerUser} = require('../controller/userController');
const verifyJWT = require("../utils/validator");

router.get('/user/:id', verifyJWT, getUser);
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
