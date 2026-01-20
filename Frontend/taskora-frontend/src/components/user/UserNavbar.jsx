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
  const [showBecomeRunnerModal, setShowBecomeRunnerModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const menuRef = useRef(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ========== APPLY RUNNER (FIRST TIME) ========== */
 const becomeRunner = async () => {
  try {
    // 1. Apply runner
    await api.post("/api/user/apply-runner");

    // 2. Switch role (this updates status)
    const res = await api.patch("/api/user/switch-role");

    const { user: updatedUser, token } = res.data;

    // 3. Update auth state
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("token", token);

    toast.success("Welcome to Runner mode 🚀");
    navigate("/runner");
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to become runner");
  }
};

  /* ========== SWITCH ROLE (USER ↔ RUNNER) ========== */
  const switchToRunner = async () => {
  try {
    const res = await api.patch("/api/user/switch-role");

    const { user: updatedUser, token } = res.data;

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("token", token);

    toast.success("Switched to Runner 🚀");
    navigate("/runner");
  } catch (err) {
    toast.error(err.response?.data?.message || "Cannot switch role");
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

          {/* DESKTOP ACTION BUTTON */}
          {!user?.isRunner && (
            <button
              onClick={() => setShowBecomeRunnerModal(true)}
              className="hidden md:block rounded-full border border-blue-500/50 px-4 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10"
            >
              Become a Runner
            </button>
          )}

          {user?.isRunner && user?.status === "user" && (
            <button
              onClick={() => setShowSwitchModal(true)}
              className="hidden md:block rounded-full border border-green-500/50 px-4 py-1.5 text-sm text-green-400 hover:bg-green-500/10"
            >
              Switch to Runner
            </button>
          )}

          {/* Avatar */}
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="h-9 w-9 rounded-full bg-[#1E2A45] text-white font-semibold flex items-center justify-center"
          >
            {user?.name?.[0]?.toUpperCase()}
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-12 w-48 rounded-xl bg-[#0B1220] border border-[#1E2A45] shadow-lg">

              <p className="px-4 py-2 text-sm text-slate-400">
                User: {user?.name}
              </p>

              {/* MOBILE: Become Runner */}
              {!user?.isRunner && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowBecomeRunnerModal(true);
                  }}
                  className="md:hidden w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/10"
                >
                  Become a Runner
                </button>
              )}

              {/* MOBILE: Switch Runner */}
              {user?.isRunner && user?.status === "user" && (
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

      {/* LOGOUT MODAL */}
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

      {/* BECOME RUNNER MODAL */}
      <ConfirmModal
        open={showBecomeRunnerModal}
        title="Become a Runner?"
        description="You’ll be able to accept tasks and earn money."
        confirmText="Yes, Become Runner"
        onCancel={() => setShowBecomeRunnerModal(false)}
        onConfirm={becomeRunner}
      />

      {/* SWITCH ROLE MODAL */}
      <ConfirmModal
        open={showSwitchModal}
        title="Switch to Runner?"
        description="You’ll switch to runner mode."
        confirmText="Yes, Switch"
        onCancel={() => setShowSwitchModal(false)}
        onConfirm={switchToRunner}
      />
    </nav>
  );
};

export default UserNavbar;
