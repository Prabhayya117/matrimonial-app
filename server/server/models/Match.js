import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  compatibility: Number,
  createdAt: { type: Date, default: Date.now }
});

const Match = mongoose.model("Match", matchSchema);
export default Match;
