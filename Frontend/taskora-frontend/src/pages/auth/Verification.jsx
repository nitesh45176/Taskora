import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  const handleVerify = async () => {
    if (otp.length !== 6) {
      return toast.error("Please enter the 6-digit OTP");
    }
    
    try {
      setIsLoading(true);
      
      // ✅ Get email from React Router state OR URL params OR localStorage
      const email = location.state?.email || 
                    new URLSearchParams(window.location.search).get("email") ||
                    localStorage.getItem('verificationEmail');
      
      // ✅ Validate email exists
      if (!email) {
        toast.error("Email not found. Please sign up again.");
        navigate('/signup');
        return;
      }
      
      console.log('Sending request:', { email, otp, purpose: "SIGNUP" });

      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
        purpose: "SIGNUP",
      });
      
      console.log('Success:', response.data);
      toast.success("Verification Successful");
      navigate("/login");
      
    } catch (error) {
      console.error('❌ Full error:', error.response?.data);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "OTP verification failed");
      } else {
        toast.error("Something went wrong. Please try again.");
      } 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-6 ">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-blue-500/10 pointer-events-none" />

      <div className="relative w-full max-w-md bg-[#121A2B]/80 backdrop-blur-lg border border-[#1E2A45] rounded-2xl p-10 text-center shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">
            T
          </div>
          <span className="text-xl font-semibold text-white">Taskora</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-heading font-bold text-white">
          Verify Your Email
        </h2>

        <p className="mt-4 text-slate-400">
          Enter the 6-digit code sent to your email address to activate your
          account.
        </p>

        {/* OTP Input */}
        <div className="mt-8">
          <label className="block text-sm text-slate-300 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full text-center tracking-[0.3em] text-xl rounded-lg bg-[#0B1220] border border-[#1E2A45] px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full mt-8 cursor-pointer rounded-full bg-blue-500 py-3 text-white font-medium hover:bg-blue-600 transition"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>

        <Link
          to="/login"
          className="block mt-6 text-slate-400 hover:text-white transition"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
