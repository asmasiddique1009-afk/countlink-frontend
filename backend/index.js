require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const portalRoutes = require('./src/routes/portalRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// ─── Connect to MongoDB ────────────────────────────────────────────────────
connectDB();

// ─── Security Middleware ───────────────────────────────────────────────────
app.use(helmet()); // Sets secure HTTP headers

// CORS — allow the Vite frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);





// ─── General Middleware ────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));        // Parse JSON, limit body size
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── Routes ────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'ContLinks API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Apply stricter rate limiting to auth routes
app.use('/api/auth',  authRoutes);
app.use('/api/website',  portalRoutes);
app.use('/api/tickets',  ticketRoutes);
app.use('/api/user', userRoutes);
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ──────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 server  running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err.message);
  process.exit(1);
});

module.exports = app;
