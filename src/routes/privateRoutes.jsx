import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({ children }) => {

    const { user, loading } = useAuth();
   

    if (loading) {
        return <p>Loading.....</p>
    }

    if (!user) {
        return <Navigate to='/login'></Navigate>
       
    }

    return children;
};

export default PrivateRoutes;