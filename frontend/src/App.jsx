import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CoursePageAdmin from './pages/CoursePageAdmin';
import ForbiddenPage from './pages/ForbiddenPage';
import UserManagement from './pages/UserManagementPage';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import { Outlet } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import CoursePage from './pages/CoursePage';
import CourseList from './pages/CourseList';
import AllCoursePage from './pages/AllCoursePage';
import UserProfile from './pages/UserProfile';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  let user = useSelector((state) => state.auth.user);
  let userRole = [];
  if(user) { userRole= user.roles;}
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/courses" : "/login"} />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        <Route element={<MainLayout roles={userRole} />}>
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<Outlet />}>
              <Route path="users" element={<UserManagement />} />
              <Route path="courses" element={<CoursePageAdmin />} />
            </Route>
          </Route>

          <Route path="/courses" element={<AllCoursePage />} />

          <Route element={<ProtectedRoute roles={['admin', 'student','teacher']} />}>
            <Route path="/my-courses" element={<CourseList />} />
            <Route path="/my-courses/:id" element={<CoursePage roles={userRole} />} />
            <Route path="/profile" element={<UserProfile user={user}/>} />
          </Route>
        </Route>
      </Routes>
    </Router>

  );
};


export default App;
