// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  websiteId: { type: mongoose.Schema.Types.ObjectId, ref: "Website", required: true },
  
 
  domain: String, 
  projectName: { type: String, required: true },
  orderType: { type: String, enum: ['standard', 'sensitive'], default: 'standard' },
  price: { type: Number, required: true },
  
 
  da: Number,
  dr: Number,
  language: String,
  country: String,
  categories: [String],

 
  writingOption: { type: String, enum: ['submit', 'outsource'], required: true },
  submissionData: {
   
    anchorText: String,
    targetUrl: String,
    linkType: String, // e.g., do-follow, no-follow
    orderInstructions: String,
    
    
    articleTitle: String,
    articleContent: String 
  },

  status: { 
    type: String, 
    enum: [
      'new_request',    // 'new request' ke liye
      'in_progress',    // 'in progress' ke liye
      'in_revision',    // 'in revision' ke liye
      'in_resolution',  // 'in resolution' ke liye
      'completed',      // 'completed' ke liye
      'cancelled'       // 'cancelled' ke liye
    ], 
    default: 'new_request' 
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);