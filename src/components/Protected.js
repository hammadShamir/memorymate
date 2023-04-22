import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    // Check if the user is authenticated by getting the access token from localStorage
    const user = localStorage.getItem('accessToken');
    
    // If the user is authenticated, render the child routes using Outlet component
    // If the user is not authenticated, redirect them to the signin page using Navigate component
    return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
