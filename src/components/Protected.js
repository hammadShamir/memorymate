import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const user = localStorage.getItem('accessToken');
    return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;