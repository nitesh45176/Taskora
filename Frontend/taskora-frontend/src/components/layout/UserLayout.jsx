import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";
import UserNavbar from "../user/UserNavbar";

const UserLayout = () => {
  const { user } = useAuth();

  if (!user || user.status !== "user") {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
};

export default UserLayout;
