import mongoose from "mongoose"

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },

    otp: {
      type: String,
      required: true
    },

    purpose: {
      type: String,
      enum: ["SIGNUP", "LOGIN"],
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

// TTL index: MongoDB auto-deletes expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Otp = mongoose.model("Otp", otpSchema)
export default Otp
