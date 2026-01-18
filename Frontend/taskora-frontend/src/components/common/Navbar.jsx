import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-[#1E2A45] bg-[#0B1220]/80 px-6 py-3 backdrop-blur-xl shadow-lg">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">
            T
          </div>
          <span className="text-lg font-semibold text-white tracking-wide">
            Taskora
          </span>
        </Link>

        {/* Public Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#HowItWorks" className="hover:text-white">How it works</a>
          <a href="#PopularTasks" className="hover:text-white">Popular Tasks</a>
          <a href="#why" className="hover:text-white">Why Taskora</a>
          <a href="#Earnings" className="hover:text-white">Earnings</a>
          <a href="#for" className="hover:text-white">Who Is It For</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
