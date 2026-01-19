import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BecomeRunnerButton from "../../pages/runner/BecomeRunnerButton";
import ConfirmModal from "../common/ConfirmModal";
import { useState } from "react";
import api from "../../utils/axios";
import { useAuth } from "../../context";

const UserNavbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();


  const switchToRunner = async () => {
    try {
      const res = await api.patch("/api/user/switch-role");

      const updatedUser = res.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Switched to Runner mode 🚀");
      navigate("/runner");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot switch role");
    }
  };


  const handleBecomeRunner = async () => {
    try {
      await api.post("/api/user/apply-runner");

      // switch role
      const res = await api.patch("/api/user/switch-role");

      const updatedUser = res.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("You're now a Runner 🎉");
      navigate("/runner");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to become runner");
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-[#1E2A45] bg-[#0B1220]/80 px-5 py-2.5 backdrop-blur-xl shadow-lg">
        {/* Logo */}
        <Link to="/user" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">
            T
          </div>
          <span className="text-lg font-semibold text-white tracking-wide">
            Taskora.
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <Link to="/user" className="hover:text-white">
            Dashboard
          </Link>
          <Link to="/user/create" className="hover:text-white">
            Post Task
          </Link>
          <Link to="/user/tasks" className="hover:text-white">
            My Tasks
          </Link>
        </div>

        {/* Actions */}
        {user && (
          <div className="flex items-center gap-2">
            {/* FIRST TIME ONLY */}
            {user.status === "user" && user.isRunner === false && (
              <BecomeRunnerButton
                onClick={handleBecomeRunner}
                className="rounded-full border border-blue-500/50 px-4 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10"
              />
            )}

            {/* ALREADY RUNNER */}
            {user.status === "user" && user.isRunner === true && (
              <button
                onClick={() => setShowSwitchModal(true)}
                className="rounded-full border border-green-500/50 px-4 py-1.5 text-sm text-green-400 hover:bg-green-500/10"
              >
                Switch to Runner
              </button>
            )}

            {/* Avatar */}
            <div className="relative group">
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-[#1E2A45] text-white font-semibold cursor-pointer">
                {user.name?.[0]?.toUpperCase()}
              </div>

              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0B1220] border border-[#1E2A45] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <p className="px-4 py-2 text-sm text-slate-400">
                  User: {user.name}
                </p>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
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
        title="Switch to Runner mode?"
        description="You’ll see tasks available to earn and manage your active work."
        confirmText="Yes, Switch"
        onCancel={() => setShowSwitchModal(false)}
        onConfirm={async () => {
          setShowSwitchModal(false);
          await switchToRunner();
        }}
      />
    </nav>
  );
};

export default UserNavbar;
