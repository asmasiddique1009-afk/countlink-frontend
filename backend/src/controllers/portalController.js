const Website = require("../models/Website.js");

const createWebsite = async (req, res) => {
  try {
    const {
      websiteUrl,
      verificationStatus,
      verificationMethod,
      description,
      instructions,
      countries,
      language,
      categories,
      sensitiveTopics,
      maxLinks,
      imagesPerPost,
      linkType,
      sponsorshipNotification,
      publishOnHome,
      publishInCategories,
      priceNormal,
      priceSensitive,
      priceCopywriting,
      enableCopywriting,
      discount,
    } = req.body;
    console.log(
      "Received website creation request with data:",
      req.user?.id,
      req.body,
    );
    const website = await Website.create({
      userId: req.user?.id,
      websiteUrl,
      verificationStatus: verificationStatus || "pending",
      verificationMethod,
      description,
      instructions,
      countries,
      language,
      categories,
      sensitiveTopics,
      maxLinks,
      imagesPerPost,
      linkType,
      sponsorshipNotification,
      publishOnHome,
      publishInCategories,
      priceNormal,
      priceSensitive,
      priceCopywriting,
      enableCopywriting,
      discount,
    });

    res.status(201).json({
      success: true,
      message: "Website created successfully",
      website,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getWebsites = async (req, res) => {
  try {
    const websites = await Website.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: websites.length,
      websites,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // 1. Find the website and ensure it belongs to the logged-in user
    const website = await Website.findOne({ _id: id, userId });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found or unauthorized access",
      });
    }

    // 2. Prevent overriding sensitive fields (Security Best Practice)
    // Sirf wahi fields update karein jo allowed hain
    const updateData = { ...req.body };
    delete updateData.userId; // User apna userId change nahi kar sakta
    delete updateData._id;    // ID change nahi honi chahiye
    
    // 3. Mark as pending for re-review
    updateData.status = "pending";

    // 4. Update the website
    const updatedWebsite = await Website.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Website updated successfully and sent for review",
      website: updatedWebsite,
    });
  } catch (err) {
    console.error("Update Website Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during update",
      error: err.message,
    });
  }
};
const deleteWebsite = async (req, res) => {
  try {
    const website = await Website.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id, // सुरक्षा: only owner can delete
    });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Website deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findOne({
      _id: req.params.id,
      // Security: Ensure user owns this website
    });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      website,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const updateWebsiteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "pending", "rejected", "paused"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const website = await Website.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!website) {
      return res
        .status(404)
        .json({ success: false, message: "Website not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Website status updated", website });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const getWebsitesbystatus = async (req, res) => {
  const { status } = req.params;
  try {
    const websites = await Website.find({ status });

    res.status(200).json({ success: true, count: websites.length, websites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createWebsite,
  getWebsites,
  updateWebsite,
  deleteWebsite,
  getWebsiteById,
  updateWebsiteStatus,
  getWebsitesbystatus,
};
