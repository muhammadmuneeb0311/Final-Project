import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth/store";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded in Protected 👉", decoded);

    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      console.warn("Access denied 🚫", decoded.role);
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
