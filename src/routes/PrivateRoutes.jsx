import React from 'react';
import useAuth from '../hooks/useAuth';
import Loader from '../shared/Loader/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log("Location", location);

    if (loading) {
        return <Loader></Loader>
    }
    // if(!user) {
    //    <Navigate to="/login" replace={true} />
    // }
      if (!user) return <Navigate to="/join-us?type=login" />;
    //  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

    return children;
};

export default PrivateRoutes;