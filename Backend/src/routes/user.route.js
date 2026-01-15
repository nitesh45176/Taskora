
import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';
import { applyRunner, switchRole } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/apply-runner", protect, applyRunner);
router.patch("/switch-role", protect, switchRole);


export default router;