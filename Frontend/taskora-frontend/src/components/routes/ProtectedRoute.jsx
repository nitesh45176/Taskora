import { Navigate } from "react-router-dom";
import { useAuth } from "../../context";

const ProtectedRoute = ({ children, allowed }) => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Role-based protection
  if (allowed && user.status !== allowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
