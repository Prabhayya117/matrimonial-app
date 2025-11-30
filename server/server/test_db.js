import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import path from "path";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/eduverse_matrimony";

console.log("Testing DB Connection to:", uri);

const testDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("✅ Connected to MongoDB");

        const email = "testscript_" + Date.now() + "@example.com";
        console.log("Attempting to create user with email:", email);

        const user = await User.create({
            name: "Test Script User",
            email: email,
            password: "password123"
        });

        console.log("✅ User created successfully:", user._id);
        console.log("User password hash:", user.password);

        await mongoose.disconnect();
        console.log("Disconnected");
    } catch (error) {
        console.error("❌ Error:", error);
    }
};

testDB();
