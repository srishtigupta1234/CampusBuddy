import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const role = user?.role?.toLowerCase();
  const isAdmin = role === "admin" || role === "role_admin";

  if (adminOnly && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;