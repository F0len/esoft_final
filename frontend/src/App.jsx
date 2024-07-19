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
import MyCourses from './pages/MyCourses';
import CoursePage from './pages/CoursePage';
import CourseList from './pages/CourseList';
import AllCoursePage from './pages/AllCoursePage';

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const role = 'admin';
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to={user ? "/courses" : "/login"} />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Outlet />}>
            <Route path="users" element={<UserManagement />} />
            <Route path="courses" element={<CoursePageAdmin />} />
          </Route>
          <Route path="/courses" element={<AllCoursePage/>} />
          <Route path="/my-courses" element={<CourseList />} />
          <Route exact path="/my-courses" element={MyCourses} />
          <Route exact path="/my-courses/:id" element={<CoursePage role={role} />} />


        </Route>
      </Routes>
    </Router>

  );
};


export default App;
