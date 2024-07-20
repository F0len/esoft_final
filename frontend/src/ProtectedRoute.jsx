import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ roles }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/forbidden" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
