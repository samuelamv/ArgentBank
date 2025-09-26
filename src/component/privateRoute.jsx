// src/component/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function PrivateRoute({ children }) {
  const { token, user, initializing } = useAuth();

  if (initializing) {
    // tant qu'on ne sait pas, on ne redirige pas (on peut mettre un loader)
    return null;
  }

  if (!token || !user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
