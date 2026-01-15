import React from "react";
import { LuTrendingUpDown } from "react-icons/lu";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] xl:px-12 p-6 pt-8 pb-12">
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
        {children}
      </div>

      <div className="hidden md:flex w-[40vw] h-screen bg-[#0B1220] relative items-center justify-center px-14">

  {/* Soft blue glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-blue-500/10" />

  <div className="relative max-w-md">
    <h2 className="text-4xl font-heading font-bold text-white leading-tight">
      Get Everyday Tasks Done —  
      <span className="text-blue-500"> Without Leaving Home</span>
    </h2>

    <p className="mt-6 text-slate-400 text-lg leading-relaxed">
      From medicines to grocery pickups and standing in queues, Taskora connects you with
      trusted runners nearby — with tracking, proof, and full transparency.
    </p>
  </div>

</div>

    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-purple-400/10 z-99 mt-10 border border-gray-200">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] gap-4 p-4 rounded-full ${color} drop-shadow-2xl text-white`}
      >
        {icon}
      </div>
      <div className="flex flex-col ">
        <span className="text-xs text-gray-900 mb-1">{label}</span>
        <span className="text-[20px]  font-semibold">{value}</span>
      </div>
    </div>
  );
};
