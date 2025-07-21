import { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Loader from "../shared/Loader/Loader";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { role , roleLoading} = useUserRole();

  if (loading || roleLoading) return <div><Loader></Loader></div>;


  if (!user || role !== 'admin') return <Navigate to="/forbidden" state={{ from: location }} replace />;

  return children;
};

export default AdminRoute;
