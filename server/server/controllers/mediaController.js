import User from "../models/User.js";
import path from "path";
import fs from "fs";

// Upload media file (base64 or file)
export const uploadMedia = async (req, res) => {
  try {
    const { filename, fileData } = req.body;
    
    if (!filename || !fileData) {
      return res.status(400).json({ message: 'Missing filename or fileData' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save file from base64
    const buffer = Buffer.from(fileData.split(',')[1] || fileData, 'base64');
    const filePath = path.join(uploadsDir, `${req.user._id}_${Date.now()}_${filename}`);
    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${path.basename(filePath)}`;
    user.mediaPhotos = user.mediaPhotos || [];
    user.mediaPhotos.push({
      filename,
      url: fileUrl,
      uploadedAt: new Date()
    });

    await user.save();
    res.status(200).json({ message: 'Media uploaded', media: user.mediaPhotos });
  } catch (err) {
    console.error('Error uploadMedia:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get user media
export const getMedia = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('mediaPhotos');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.mediaPhotos || []);
  } catch (err) {
    console.error('Error getMedia:', err);
    res.status(500).json({ message: err.message });
  }
};

// Add media URL
export const addMedia = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'Missing media url' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.media = user.media || [];
    user.media.push(url);
    await user.save();

    res.status(200).json({ message: 'Media added', media: user.media });
  } catch (err) {
    console.error('Error addMedia:', err);
    res.status(500).json({ message: err.message });
  }
};

