const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/register', registerUser); // Register route
router.post('/login', loginUser);       // Login route


router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);

module.exports = router;