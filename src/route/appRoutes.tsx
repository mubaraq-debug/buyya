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
import VendorDashboard from '../pages/dashboards/vendorDashboard/index.tsx';
import NotFound from '../pages/NotFound.tsx';

const appRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default appRoutes