import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Otp from "../models/Otp.model.js";
import { sendEmail } from "../utils/sendEmail.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!user) {
      user = await User.create({ name, email, password });
    }

    await Otp.deleteMany({ email, purpose: "SIGNUP" });

    const otp = generateOtp();

    await Otp.create({
      email,
      otp,
      purpose: "SIGNUP",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendEmail({
      to: email,
      subject: "Verify your Taskora account",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful. OTP sent to your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, purpose } = req.body;

    const otpRecord = await Otp.findOne({ email, otp, purpose });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Compare Date objects 
    if (new Date(otpRecord.expiresAt) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await Otp.deleteMany({ email, purpose });

    res.status(200).json({
      message: "OTP verified",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password FIRST
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check verification AFTER password match
    if (!user.isVerified) {
      // Remove old signup OTPs
      await Otp.deleteMany({ email, purpose: "SIGNUP" });

      // Generate OTP
      const otp = generateOtp();

      // Store OTP in Otp collection
      await Otp.create({
        email,
        otp,
        purpose: "SIGNUP",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      // Send email
      await sendEmail({
        to: email,
        subject: "Verify your Taskora account",
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
      });

      return res.status(403).json({
        message:
          "Your account is not verified. A new verification code has been sent to your email.",
        email,
      });
    }

    //  User is verified - directly login without OTP
    const token = jwt.sign(
      {
        id: user._id,
        status: user.status,
        isRunner: user.isRunner,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      status: user.status,
      isRunner: user.isRunner,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userData,
      token,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
