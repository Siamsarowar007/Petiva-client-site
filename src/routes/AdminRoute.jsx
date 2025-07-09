import { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Loader from "../shared/Loader/Loader";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) return <div><Loader></Loader></div>;

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/" />;
//   }

  if (!user || user.role !== 'admin') return <Navigate to="/" state={{ from: location }} replace />;

  return children;
};

export default AdminRoute;
