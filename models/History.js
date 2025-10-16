import mongoose, { Schema } from "mongoose";

const historySchema = new Schema({
  method: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.History || mongoose.model("History", historySchema);
