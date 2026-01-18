import { Navigate } from "react-router-dom";
import { useAuth } from "../../context";

const AuthGate = ( ) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user.status === "runner") {
    return <Navigate to="/runner" replace />;
  }

  return <Navigate to="/user" replace />;
};

export default AuthGate;
