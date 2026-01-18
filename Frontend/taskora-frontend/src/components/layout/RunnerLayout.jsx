import {  Outlet } from "react-router-dom";
import RunnerNavbar from "../runner/RunnerNavbar";

const RunnerLayout = () => {

  
  return (
    <div className="min-h-screen bg-[#0B1220]">
      <RunnerNavbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default RunnerLayout;
