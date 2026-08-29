import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <p className="text-sky-800 text-2xl px-6 py-4">
        Loading...
      </p>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;