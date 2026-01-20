import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { validEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import { useAuth } from "../../context";
import { toast } from "sonner";
import api from "../../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

try {
  setIsLoading(true);

  const res = await api.post("/api/auth/login", {
    email,
    password,
  });

  const user = res.data.user;
  const token = res.data.token;

    // Save to context + localStorage
    login(user, token);

    toast.success("Login successful!");

    // Redirect based on role
    if (user?.status === "runner") {
      navigate("/runner");
    } else {
      navigate("/user");
    }

  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 403) {
      toast.error(data.message || "Please verify your email");
      navigate("/verify-email", { state: { email } });
    } else if (status === 401) {
      toast.error("Incorrect email or password");
    } else {
      toast.error("Login failed");
    }
  } finally {
    setIsLoading(false);
  }
};
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-full flex flex-col justify-center px-8 md:px-12">
        <Link to='/' className="inline-flex items-center text-slate-400 hover:text-white mb-4">
         ← Back 
        </Link>
        <h3 className="text-3xl font-heading font-bold text-white">
          Welcome back to <span className="text-blue-500">Taskora</span>
        </h3>

        <p className="text-slate-400 mt-2 mb-10">
          Log in to continue managing and completing real-world tasks.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email Address
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg bg-[#0B1220] border border-[#1E2A45] px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg bg-[#0B1220] border border-[#1E2A45] px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-full bg-blue-500 py-3 text-white cursor-pointer font-medium hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-slate-400 text-center">
            Don’t have an account?
            <Link
              to="/register"
              className="ml-1 text-blue-500 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
