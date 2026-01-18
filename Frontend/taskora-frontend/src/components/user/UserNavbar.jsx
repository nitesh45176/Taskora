import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";
import { toast } from "sonner";
import axios from "axios";
import BecomeRunnerButton from "../../pages/runner/BecomeRunnerButton";
import ConfirmModal from "../common/ConfirmModal";
import { useState } from "react";

const UserNavbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const switchToRunner = async () => {
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

      // update localStorage user
      const updatedUser = { ...user, status: "runner" };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Switched to Runner mode 🚀");
      navigate("/runner");

      window.location.reload(); // force navbar + routes to refresh
    } catch (err) {
      toast.error(err.response?.data?.message || "Cannot switch role");
    }
  };

  const handleBecomeRunner = async () => {
    try {
      const token = localStorage.getItem("token");

      // 1. Create runner account
      await axios.post(
        "http://localhost:5000/api/user/apply-runner",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // 2. Switch role
      await axios.patch(
        "http://localhost:5000/api/user/switch-role",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // 3. Update local user
      const updatedUser = { ...user, isRunner: true, status: "runner" };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("You're now a Runner 🎉");
      window.location.href = "/runner";
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to become runner");
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-[#1E2A45] bg-[#0B1220]/80 px-6 py-3 backdrop-blur-xl shadow-lg">
        <Link to="/user">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">
              T
            </div>
            <span className="text-lg font-semibold text-white tracking-wide">
              Taskora.
            </span>
          </div>
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

        {/* CTA */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-slate-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Actions */}
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-slate-400 text-sm">
                  Hi, {user?.name}
                </span>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="rounded-full border border-red-500/60 cursor-pointer hover:bg-red-500/10 px-5 py-2 text-red-400"
                >
                  Logout
                </button>

                {user?.status === "user" && user?.isRunner === false && (
                  <BecomeRunnerButton
                    onClick={handleBecomeRunner}
                    className="border cursor-pointer border-[#1E2A45] text-slate-300 hover:text-white hover:border-blue-500"
                  />
                )}

                {user?.status === "user" && user?.isRunner === true && (
                  <button
                    onClick={switchToRunner}
                    className="rounded-full border border-green-500 px-4 py-2 text-green-400 hover:bg-green-500/10"
                  >
                    Switch to Runner
                  </button>
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
                
                
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
