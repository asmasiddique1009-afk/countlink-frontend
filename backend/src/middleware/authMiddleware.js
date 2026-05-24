const User = require('../models/User');
const { verifyAccessToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

/**
 * Protect middleware — validates JWT and attaches user to req
 */
const protect = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 401, 'Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 401, 'Token has expired. Please log in again.');
      }
      return errorResponse(res, 401, 'Invalid token.');
    }

    // Check user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return errorResponse(res, 401, 'The user belonging to this token no longer exists.');
    }

    if (!user.isActive) {
      return errorResponse(res, 403, 'Your account has been deactivated.');
    }

    // Attach user to request
    req.user = { id: user._id, role: user.role, email: user.email };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return errorResponse(res, 500, 'Authentication error.');
  }
};

/**
 * Role-based access control middleware
 * Usage: restrictTo('advertiser') or restrictTo('publisher', 'advertiser')
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        `Access denied. This route is restricted to: ${roles.join(', ')}.`
      );
    }
    next();
  };
};

module.exports = { protect, restrictTo };
