const orderSchema = new mongoose.Schema({
  websiteId: { type: mongoose.Schema.Types.ObjectId, ref: "Website" },
  buyerId:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sellerId:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  orderType: {
    type: String,
    enum: ["regular", "dedicated", "copywriting"]
  },

  status: {
    type: String,
    enum: ["pending", "in_progress", "published", "rejected", "cancelled"],
    default: "pending"
  },

  price:         { type: Number, required: true },
  articleUrl:    { type: String },        // live article link
  isLive:        { type: Boolean, default: false },
  isIndexed:     { type: Boolean, default: false },
  publishedAt:   { type: Date },
  createdAt:     { type: Date, default: Date.now },
});