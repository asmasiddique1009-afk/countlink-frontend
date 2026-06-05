// controllers/dashboardController.js
const Order = require("../models/Order.js"); // Aapka Order model

const getOrderStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Status Counts ka Aggregation
    const statusStats = await Order.aggregate([
      {
        $lookup: { from: "websites", localField: "websiteId", foreignField: "_id", as: "websiteInfo" }
      },
      { $unwind: "$websiteInfo" },
      {
        $match: {
          $or: [{ buyerId: userId }, { "websiteInfo.userId": userId }]
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Yahan define karein orderStats taake "is not defined" error na aaye
    const orderStats = { requests: 0, inProgress: 0, completed: 0, cancelled: 0 };
    statusStats.forEach(item => {
      if (item._id === "new_request") orderStats.requests = item.count;
      if (item._id === "in_progress") orderStats.inProgress = item.count;
      if (item._id === "completed") orderStats.completed = item.count;
      if (item._id === "cancelled") orderStats.cancelled = item.count;
    });

    // 2. Weekly Data ka Aggregation
    const weeklyData = await Order.aggregate([
      { $addFields: { convertedDate: { $toDate: "$createdAt" } } },
      { $lookup: { from: "websites", localField: "websiteId", foreignField: "_id", as: "websiteInfo" } },
      { $unwind: "$websiteInfo" },
      {
        $match: {
          $or: [{ buyerId: userId }, { "websiteInfo.userId": userId }],
          convertedDate: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$convertedDate" } },
          orders: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Response bhejein
    res.status(200).json({ 
      statusCounts: orderStats, 
      weekly: weeklyData 
    });

  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Error fetching stats", details: error.message });
  }
};
const getRecentOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Sirf wahi orders jo user se related hain
    const orders = await Order.find({ 
      $or: [{ buyerId: userId }, { "websiteInfo.userId": userId }] 
    })
    .sort({ createdAt: -1 }) // Latest pehle
    .limit(5) // Sirf 5 latest dikhayein
    .populate("buyerId", "fullName"); // User ka naam lane ke liye

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent orders" });
  }
};

module.exports = { getOrderStats,getRecentOrders };
