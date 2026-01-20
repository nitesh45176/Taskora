import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { validEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import api from "../../utils/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!form.name.trim()) {
      setLoading(false);
      return setError("Please enter your name");
    }

    if (!validEmail(form.email)) {
      setLoading(false);
      return setError("Please enter a valid email");
    }

    if (!form.password || form.password.length < 6) {
      setLoading(false);
      return setError("Password must be at least 6 characters");
    }

    try {
      await api.post("/api/auth/signup", form);

      navigate("/verify-email", {
        state: { email: form.email },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-full flex flex-col justify-center px-8 md:px-12">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-4">← Back</Link>

        <h3 className="text-3xl font-heading font-bold text-white md:pt-5 pt-28">
          Create your <span className="text-blue-500">Taskora</span> account
        </h3>

        <p className="text-slate-400 mt-2 mb-10">
          Sign up to start posting tasks or earning as a runner.
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            label="Full Name"
            placeholder="Enter your full name"
          />

          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            label="Email Address"
            placeholder="you@example.com"
            type="email"
          />

          <Input
            name="password"
            value={form.password}
            onChange={handleChange}
            label="Password"
            placeholder="Create a password"
            type="password"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            disabled={isLoading}
            type="submit"
            className="w-full rounded-full bg-blue-500 py-3 text-white font-medium hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>

          <p className="text-sm text-slate-400 text-center">
            Already have an account?
            <Link to="/login" className="ml-1 text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
