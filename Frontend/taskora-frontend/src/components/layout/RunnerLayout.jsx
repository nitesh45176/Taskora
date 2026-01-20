import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";
import RunnerNavbar from "../runner/RunnerNavbar";

const RunnerLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user || user.status !== "runner") {
    return <Navigate to="/login" replace />;
  }

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
