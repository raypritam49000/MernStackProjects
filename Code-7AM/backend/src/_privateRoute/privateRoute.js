

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../_components/layout';

export const PrivateRoute = () => {
    return localStorage.getItem("userDetails") ? <Layout><Outlet /></Layout> : <Navigate to={'/auth/login'} />;
}