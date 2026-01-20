import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";
import UserNavbar from "../user/UserNavbar";

const UserLayout = () => {
  const { user, isLoading } = useAuth();

  //  wait until auth is ready
  if (isLoading) return null;

  if (!user || user.status !== "user") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
};

export default UserLayout;
