import express from "express";
import { getMatches } from "../controllers/matchController.js";
import { addToShortlist, getShortlist, requestConnect } from "../controllers/matchController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getMatches);
router.post('/shortlist', protect, addToShortlist);
router.get('/shortlist', protect, getShortlist);
router.post('/request', protect, requestConnect);

export default router;
