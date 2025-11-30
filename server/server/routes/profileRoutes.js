import express from 'express';
import { searchProfiles, getProfile, updateFamilyBackground, getFamilyBackground, addToShortlist, getShortlist, removeFromShortlist } from '../controllers/profileController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Search/get all profiles (query params: search, profession, location)
router.get('/search', protect, searchProfiles);

// Shortlist endpoints
router.post('/shortlist', protect, addToShortlist);
router.get('/shortlist', protect, getShortlist);
router.post('/shortlist/remove', protect, removeFromShortlist);

// Get single profile by ID
router.get('/:id', protect, getProfile);

// Family endpoints
router.post('/family/update', protect, updateFamilyBackground);
router.get('/family/background', protect, getFamilyBackground);

export default router;
