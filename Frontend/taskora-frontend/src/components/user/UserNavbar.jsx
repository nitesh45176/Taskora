import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import api from "../../utils/axios";
import { useAuth } from "../../context";
import ConfirmModal from "../common/ConfirmModal";

const UserNavbar = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const menuRef = useRef(null);

  //  Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchToRunner = async () => {
    try {
      await api.patch("/api/user/switch-role");

      const updatedUser = { ...user, status: "runner", isRunner: true };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Switched to Runner 🚀");
      navigate("/runner");
    } catch {
      toast.error("Cannot switch role");
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
          <span className="text-lg font-semibold text-white">Taskora.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <Link to="/user">Dashboard</Link>
          <Link to="/user/create">Post Task</Link>
          <Link to="/user/tasks">My Tasks</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>

          {/* Desktop Switch Button */}
          {user?.isRunner && (
            <button
              onClick={() => setShowSwitchModal(true)}
              className="hidden md:block rounded-full border border-green-500/50 px-4 py-1.5 text-sm text-green-400 hover:bg-green-500/10"
            >
              Switch to Runner
            </button>
          )}

          {/* Profile Avatar */}
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="h-9 w-9 rounded-full bg-[#1E2A45] text-white font-semibold flex items-center justify-center"
          >
            {user?.name?.[0]?.toUpperCase()}
          </button>

          {/*  Dropdown (mobile + desktop click) */}
          {showMenu && (
            <div className="absolute right-0 top-12 w-44 rounded-xl bg-[#0B1220] border border-[#1E2A45] shadow-lg">
              <p className="px-4 py-2 text-sm text-slate-400">
               User: {user.name}
              </p>

              {/* Mobile switch */}
              {user?.isRunner && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowSwitchModal(true);
                  }}
                  className="md:hidden w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-green-500/10"
                >
                  Switch to Runner
                </button>
              )}

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
        title="Switch to Runner?"
        confirmText="Yes"
        onCancel={() => setShowSwitchModal(false)}
        onConfirm={switchToRunner}
      />
    </nav>
  );
};

export default UserNavbar;
