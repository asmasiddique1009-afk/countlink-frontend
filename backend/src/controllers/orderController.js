const Order = require("../models/Order");
const User = require("../models/User");
const Website = require("../models/Website");

const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const buyerId = req.user.id;

    // 1. User find karein
    const user = await User.findById(buyerId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const createdOrders = [];
    for (const item of items) {
      const formattedSubmissionData = {
        anchorText: item.submissionData?.links?.[0]?.anchor || "",
        targetUrl: item.submissionData?.links?.[0]?.url || "",
        linkType: item.submissionData?.links?.[0]?.type || "",
        orderInstructions: item.submissionData?.instructions || "",

        articleTitle: item.submissionData?.title || "",
        articleContent: item.submissionData?.content || "",
      };

      const newOrder = await Order.create({
        buyerId,
        websiteId: item.id,
        projectName: item.project,
        orderType: item.orderType,
        price: item.priceNormal,
        da: item.da,
        dr: item.dr,
        language: item.language,
        country: item.country,
        categories: item.categories,
        writingOption: item.writingOption,

        submissionData: formattedSubmissionData,
      });
      createdOrders.push(newOrder);
    }
    const populatedOrders = await Order.find({
      _id: { $in: createdOrders.map((o) => o._id) },
    }).populate("websiteId", "websiteUrl");

    res.status(201).json({ success: true, orders: populatedOrders });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getOrdersByUser = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    if (role === "publisher") {
      const myWebsites = await Website.find({ userId: userId }).select('_id');
      const websiteIds = myWebsites.map(w => w._id);

      const orders = await Order.find({ websiteId: { $in: websiteIds } })
        .populate({
          path: "websiteId",
          populate: {
            path: "userId", // Website schema mein agar userId field hai
            select: "fullName email" // Jo details aapko chahiye
          }
        })
        .populate("buyerId", "fullName email avatar");

      return res.status(200).json({ success: true, orders });
    } else {
      const orders = await Order.find({ buyerId: userId })
        .populate({
          path: "websiteId",
          populate: {
            path: "userId",
            select: "fullName email"
          }
        })
        .populate("buyerId", "fullName email avatar");
        
      return res.status(200).json({ success: true, orders });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  placeOrder,
  getOrdersByUser,
};
