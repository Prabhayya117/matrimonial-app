// controllers/matchController.js

import User from "../models/User.js";

// ---------------------------------------------------------
// Get potential matches for the logged-in user
// ---------------------------------------------------------
export const getMatches = async (req, res) => {
  try {
    // ✅ Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: user not found in request" });
    }

    // ✅ Fetch all other users except the logged-in user
    const allUsers = await User.find({ _id: { $ne: req.user._id } });

    if (!allUsers.length) {
      return res.status(200).json({ message: "No other users found yet", matches: [] });
    }

    // ✅ Generate simple compatibility score (50–100)
    const matches = allUsers.map(u => ({
      user: {
        id: u._id,
        name: u.name,
        profession: u.profession,
        location: u.location,
        age: u.age
      },
      compatibility: Math.floor(Math.random() * 51) + 50
    }));

    console.log(`✅ Found ${matches.length} matches for user: ${req.user._id}`);

    // ✅ Send matches list to frontend
    return res.status(200).json(matches);

  } catch (err) {
    console.error("❌ Error in getMatches:", err);
    res.status(500).json({ message: "Server error while fetching matches", error: err.message });
  }
};

// Add a user to the authenticated user's shortlist
export const addToShortlist = async (req, res) => {
  try {
    const targetId = req.body.userId;
    if (!targetId) return res.status(400).json({ message: "Missing userId" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.shortlist && user.shortlist.includes(targetId)) {
      return res.status(200).json({ message: "Already shortlisted" });
    }

    user.shortlist = user.shortlist || [];
    user.shortlist.push(targetId);
    await user.save();
    return res.status(200).json({ message: "Added to shortlist" });
  } catch (err) {
    console.error("Error addToShortlist:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getShortlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('shortlist', '-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.shortlist || []);
  } catch (err) {
    console.error('Error getShortlist:', err);
    res.status(500).json({ message: err.message });
  }
};

// Send a connection request to another user
export const requestConnect = async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

    const target = await User.findById(userId);
    if (!target) return res.status(404).json({ message: 'Target user not found' });

    target.connectionRequests = target.connectionRequests || [];
    target.connectionRequests.push({ from: req.user._id, message: message || '', date: new Date() });
    await target.save();

    return res.status(200).json({ message: 'Connection request sent' });
  } catch (err) {
    console.error('Error requestConnect:', err);
    res.status(500).json({ message: err.message });
  }
};
