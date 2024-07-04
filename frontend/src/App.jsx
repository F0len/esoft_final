import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CoursePage from './pages/CoursePage';
import ForbiddenPage from './pages/ForbiddenPage';
import UserManagement from './pages/UserManagement';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { Outlet } from 'react-router-dom';
import MainLayout from './components/MainLayout';

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/course" : "/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route element={<MainLayout />}>
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/my-courses" element={<CoursePage />} />
        <Route path="/admin" element={<Outlet />}>
          <Route path="users" element={<UserManagement />} />
          <Route path="courses" element={<CoursePage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
    
  );
};


export default App;
