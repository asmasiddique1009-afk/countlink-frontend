const earningSchema = new mongoose.Schema({
  websiteId: { type: mongoose.Schema.Types.ObjectId, ref: "Website" },
  orderId:   { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  amount:  { type: Number, required: true },
  status:  { type: String, enum: ["pending", "cleared"], default: "pending" },
  clearedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});