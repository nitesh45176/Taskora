import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';
import { login, signup, verifyOtp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/login", login)
router.post("/signup", signup)
router.post("/verify-otp", verifyOtp)

router.get("/me", protect, (req, res)=> {
    res.json({
        message: "User profile",
        user: req.user
    })
})

export default router;