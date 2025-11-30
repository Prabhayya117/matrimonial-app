import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import connectDB from "./congif/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";

// Load .env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("DEBUG: __dirname =", __dirname);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (!process.env.MONGO_URI) {
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Not Set");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Not Set");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve static frontend files from dist
const distPath = path.join(__dirname, '../../Matrimony/frontend-react/dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  console.log("✅ Serving frontend from:", distPath);
} else {
  console.warn("⚠️ Frontend dist folder not found at:", distPath);
}

// API Route Prefixes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/media", mediaRoutes);


// If a production build exists in the frontend, serve it regardless of NODE_ENV.
// This makes it easier to run the full app via `node server/server/server.js`.
app.get('*', (req, res) => {
  const indexPath = path.resolve(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: "Frontend dist not found" });
  }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();