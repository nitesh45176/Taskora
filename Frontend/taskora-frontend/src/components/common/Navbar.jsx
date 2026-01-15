import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
 

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-[#1E2A45] bg-[#0B1220]/80 px-6 py-3 backdrop-blur-xl shadow-lg">

        <Link to='/'>
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
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/workflows" className="hover:text-white">Workflows</Link>
          <Link to="/automations" className="hover:text-white">Automations</Link>
          <Link to="/docs" className="hover:text-white">Docs</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">

          {!user ? (
            <>
              <Link to="/login" className="hidden sm:block text-slate-300 hover:text-white transition">
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
            <button
              onClick={handleLogout}
              className="rounded-full border border-red-500/60 px-5 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
