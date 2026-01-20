import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import api from "../../utils/axios";
import { useAuth } from "../../context";
import ConfirmModal from "../common/ConfirmModal";

const RunnerNavbar = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const menuRef = useRef(null);

  //  Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const switchToUser = async () => {
    try {
      await api.patch("/api/user/switch-role");

      const updatedUser = { ...user, status: "user" };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Switched to User 👤");
      navigate("/user");
    } catch {
      toast.error("Cannot switch role");
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-[#1E2A45] bg-[#0B1220]/80 px-5 py-2.5 backdrop-blur-xl shadow-lg">

        {/* Logo */}
        <Link to="/runner" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">
            T
          </div>
          <span className="text-lg font-semibold text-white">Taskora.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <Link to="/runner">Dashboard</Link>
          <Link to="/runner/tasks">Open Tasks</Link>
          <Link to="/runner/active">My Active Tasks</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>

          {/*  Desktop switch button */}
          <button
            onClick={() => setShowSwitchModal(true)}
            className="hidden md:block rounded-full border border-blue-500/50 px-4 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10"
          >
            Switch to User
          </button>

          {/* Profile avatar */}
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="h-9 w-9 rounded-full bg-[#1E2A45] text-white font-semibold flex items-center justify-center"
          >
            {user?.name?.[0]?.toUpperCase()}
          </button>

          {/* Dropdown (mobile + click) */}
          {showMenu && (
            <div className="absolute right-0 top-12 w-44 rounded-xl bg-[#0B1220] border border-[#1E2A45] shadow-lg">
              <p className="px-4 py-2 text-sm text-slate-400">
                Runner: {user.name}
              </p>

              {/* Mobile switch */}
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowSwitchModal(true);
                }}
                className="md:hidden w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/10"
              >
                Switch to User
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowLogoutModal(true);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        open={showLogoutModal}
        title="Logout?"
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
        title="Switch to User?"
        confirmText="Yes"
        onCancel={() => setShowSwitchModal(false)}
        onConfirm={switchToUser}
      />
    </nav>
  );
};

export default RunnerNavbar;
