import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { toast } from "sonner";
import ConfirmModal from "../common/ConfirmModal";
import api from "../../utils/axios";

const RunnerNavbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const { user, logout , setUser} = useAuth();
  const navigate = useNavigate();

  const switchToUser = async () => {
    try {
      await api.patch("/api/user/switch-role");

      const updatedUser = {
        ...user,
        status: "user",
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Switched to User mode 👤");
      navigate("/user");
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
        <div className="flex items-center gap-2">
          {/* Switch Role */}
          <button
            onClick={() => {
              setShowSwitchModal(true);
            }}
            className="rounded-full border border-blue-500/50 px-4 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10 transition"
          >
            Switch to User
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-[#1E2A45]" />

          {/* Avatar (CLICK BASED – MOBILE SAFE) */}
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-[#1E2A45] text-white font-semibold"
            >
              {user?.name?.[0]?.toUpperCase()}
            </button>

            {/* Dropdown */}
            {openMenu && (
              <div className="absolute right-0 top-12 w-44 rounded-xl bg-[#0B1220] border border-[#1E2A45] shadow-xl z-50">
                <p className="px-4 py-2 text-sm text-slate-400">
                  User: {user?.name}
                </p>

                <button
                  onClick={() => {
                    setOpenMenu(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            )}

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

          <ConfirmModal
            open={showSwitchModal}
            title="Switch to User mode?"
            description="You’ll return to managing and posting tasks."
            confirmText="Yes, Switch"
            onCancel={() => setShowSwitchModal(false)}
            onConfirm={switchToUser}
          />
        </div>
      </div>
    </nav>
  );
};

export default RunnerNavbar;
