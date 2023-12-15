const router = require('express').Router();
const { signupController, loginController } = require('../controllers/auth.controller');

// SIGNUP api
router.post('/signup', signupController);

// LOGIN api
router.post('/login', loginController);

module.exports = router;