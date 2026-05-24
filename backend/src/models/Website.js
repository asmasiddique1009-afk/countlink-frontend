const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    websiteUrl: { type: String, required: true },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    verificationMethod: String,

    description: String,
    instructions: String,

    countries: [String],
    language: [String],
    categories: [String],
    sensitiveTopics: [String],

    maxLinks: Number,
    imagesPerPost: Number,
    linkType: String,

    sponsorshipNotification: String,
    publishOnHome: String,
    publishInCategories: String,

    priceNormal: Number,
    priceSensitive: Number,
    priceCopywriting: Number,
    enableCopywriting: Boolean,
    discount: Number,

    status: {
      type: String,
      enum: ["draft", "pending_review", "approved", "paused"],
      default: "pending_review",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Website", websiteSchema);