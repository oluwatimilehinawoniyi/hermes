import { useAuth } from "@context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRoute() {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth"} replace state={{ path: location.pathname }} />
  );
}
