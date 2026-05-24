const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return errorResponse(res, 422, 'Validation failed', errors);
  }

  // Mongoose cast error (invalid ObjectId, etc.)
  if (err.name === 'CastError') {
    return errorResponse(res, 400, `Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, 409, `${field} already exists`);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 401, 'Invalid token');
  }
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 401, 'Token has expired');
  }

  // Default 500
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message;

  return errorResponse(res, statusCode, message);
};

module.exports = errorHandler;
