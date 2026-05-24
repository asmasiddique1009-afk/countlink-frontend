const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

/**
 * Run after validation rules — returns 422 with errors if any
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    }));
    return errorResponse(res, 422, 'Validation failed', formatted);
  }
  next();
};

// ─── Signup validation rules ──────────────────────────────────────────────────
const validateSignup = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required'),
    
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),

  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  body('role')
    .optional()
    .isIn(['advertiser', 'publisher']).withMessage('Role must be advertiser or publisher'),

  handleValidationErrors,
];

// ─── Login validation rules ───────────────────────────────────────────────────
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),

  body('role')
    .optional()
    .isIn(['advertiser', 'publisher']).withMessage('Role must be advertiser or publisher'),

  handleValidationErrors,
];

// ─── Refresh token validation ─────────────────────────────────────────────────
const validateRefreshToken = [
  body('refreshToken')
    .notEmpty().withMessage('Refresh token is required'),

  handleValidationErrors,
];

module.exports = { validateSignup, validateLogin, validateRefreshToken };
