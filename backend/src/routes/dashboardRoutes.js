const express = require('express');
const router = express.Router();
const {getOrderStats, getRecentOrders } = require('../controllers/dashboardController');
const { protect } = require("../middleware/authMiddleware");

router.get('/stats', protect, getOrderStats);
router.get('/recent-orders', protect, getRecentOrders);

module.exports = router;