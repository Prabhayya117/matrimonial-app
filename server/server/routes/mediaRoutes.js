import express from 'express';
import { addMedia, getMedia, uploadMedia } from '../controllers/mediaController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getMedia);
router.post('/add', protect, addMedia);
router.post('/upload', protect, uploadMedia);

export default router;
