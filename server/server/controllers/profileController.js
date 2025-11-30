import User from "../models/User.js";

// Get all profiles or search by name, profession, location
export const searchProfiles = async (req, res) => {
  try {
    const { search, profession, location } = req.query;
    let query = { _id: { $ne: req.user._id } }; // Exclude current user

    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    if (profession) {
      query.profession = { $regex: profession, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const profiles = await User.find(query).select('-password').limit(50);
    res.json(profiles || []);
  } catch (err) {
    console.error('Error searchProfiles:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get single profile by ID
export const getProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).select('-password').populate('shortlist', '-password');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error('Error getProfile:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update family background
export const updateFamilyBackground = async (req, res) => {
  try {
    const { fatherProfession, motherProfession, siblings, familyValues } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.familyBackground = {
      fatherProfession: fatherProfession || user.familyBackground.fatherProfession,
      motherProfession: motherProfession || user.familyBackground.motherProfession,
      siblings: siblings || user.familyBackground.siblings,
      familyValues: familyValues || user.familyBackground.familyValues
    };

    await user.save();
    res.json({ message: 'Family background updated', family: user.familyBackground });
  } catch (err) {
    console.error('Error updateFamilyBackground:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get family background
export const getFamilyBackground = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('familyBackground');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.familyBackground || {});
  } catch (err) {
    console.error('Error getFamilyBackground:', err);
    res.status(500).json({ message: err.message });
  }
};

// Add to shortlist
export const addToShortlist = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if already shortlisted
    if (user.shortlist.includes(userId)) {
      return res.status(400).json({ message: 'Already in shortlist' });
    }

    user.shortlist.push(userId);
    await user.save();
    res.json({ message: 'Added to shortlist', shortlist: user.shortlist });
  } catch (err) {
    console.error('Error addToShortlist:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get shortlist
export const getShortlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('shortlist', '-password -connectionRequests');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.shortlist || []);
  } catch (err) {
    console.error('Error getShortlist:', err);
    res.status(500).json({ message: err.message });
  }
};

// Remove from shortlist
export const removeFromShortlist = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.shortlist = user.shortlist.filter(id => id.toString() !== userId);
    await user.save();
    res.json({ message: 'Removed from shortlist', shortlist: user.shortlist });
  } catch (err) {
    console.error('Error removeFromShortlist:', err);
    res.status(500).json({ message: err.message });
  }
};
