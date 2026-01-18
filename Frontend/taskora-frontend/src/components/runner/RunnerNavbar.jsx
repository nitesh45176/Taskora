import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import axios from "axios";
import { toast } from "sonner";
import ConfirmModal from "../common/ConfirmModal";

const RunnerNavbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

 

  const switchToUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "http://localhost:5000/api/user/switch-role",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedUser = { ...user, status: "user" };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Switched to User mode 👤");
      navigate("/user");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot switch role");
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-[#1E2A45] bg-[#0B1220]/80 px-6 py-3 backdrop-blur-xl shadow-lg">
        {/* Logo */}
        <Link to="/runner" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">
            T
          </div>
          <span className="text-lg font-semibold text-white tracking-wide">
            Taskora
          </span>
        </Link>

        {/* Runner Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <Link to="/runner" className="hover:text-white">
            Dashboard
          </Link>
          <Link to="/runner/tasks" className="hover:text-white">
            Open Tasks
          </Link>
          <Link to="/runner/active" className="hover:text-white">
            My Active Task
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-slate-400 text-sm">
            Runner: {user?.name}
          </span>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="rounded-full border border-red-500/60 cursor-pointer hover:bg-red-500/10 px-5 py-2 text-red-400"
          >
            Logout
          </button>
          <button
            onClick={switchToUser}
            className="rounded-full border border-yellow-500/60 px-5 py-2 text-sm font-medium text-yellow-400 hover:bg-yellow-500/10 transition"
          >
            Switch to User
          </button>

          <ConfirmModal
            open={showLogoutModal}
            title="Logout?"
            description="You will be redirected to the home page."
            confirmText="Logout"
            danger
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={() => {
              logout();
              navigate("/");
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default RunnerNavbar;
