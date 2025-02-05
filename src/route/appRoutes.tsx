import React from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
import Home from '../pages/home/index.tsx';
import Login from '../pages/auth/login.tsx';
import Register from '../pages/auth/register.tsx';
import UserDashboard from '../pages/dashboards/userDashboard/index.tsx';
import AdminDashboard from '../pages//dashboards/adminDashboard/index.tsx';
import NotFound from '../pages/NotFound.tsx';
import UnAuthorized from './unathorized.tsx';
import ProtectedRoute from './protectedRoutes.tsx'
const appRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
        </Route>
    </Routes>
  )
}

export default appRoutes