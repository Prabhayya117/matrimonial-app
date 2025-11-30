import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: { type: String },
  education: { type: String },
  profession: String,
  location: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  patriotismValues: [{ type: String }],
  shortlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  media: [{ type: String }],
  mediaPhotos: [{ filename: String, url: String, uploadedAt: Date }],
  connectionRequests: [{ from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, message: String, date: Date }],
  walletBalance: { type: Number, default: 0 },
  shortlisted: { type: Boolean, default: false },
  familyBackground: {
    fatherProfession: { type: String, default: "Not specified" },
    motherProfession: { type: String, default: "Not specified" },
    siblings: { type: String, default: "Not specified" },
    familyValues: { type: String, default: "Not specified" }
  },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
