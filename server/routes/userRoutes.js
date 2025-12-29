import express from "express";
import {
  getUserDashboard,
  toggleSaveEvent,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, getUserDashboard);
router.post("/save/:eventId", protect, toggleSaveEvent);

export default router;
