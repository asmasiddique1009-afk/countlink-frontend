const express = require('express');
const router = express.Router();

const { signup, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateSignup, validateLogin, validateRefreshToken } = require('../middleware/validators');

// ─── Public routes ─────────────────────────────────────────────────────────
// POST /api/auth/signup
router.post('/signup', validateSignup, signup);

// POST /api/auth/login
router.post('/login', validateLogin, login);



// GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;
