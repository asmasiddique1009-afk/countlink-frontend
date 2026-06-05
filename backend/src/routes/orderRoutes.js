const express = require("express");
const router = express.Router();
const { placeOrder ,getOrdersByUser} = require("../controllers/orderController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// All routes require login
router.use(protect);

router.get("/my-orders", protect, getOrdersByUser); 


router.post("/", protect, restrictTo("advertiser"), placeOrder);

module.exports = router;
