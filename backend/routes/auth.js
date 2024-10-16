const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



router.post('/signup', authController.signup);

// Login Route
router.post('/login', authController.login);

// Logout Route
router.post('/logout', authController.logout);




module.exports = router; 
