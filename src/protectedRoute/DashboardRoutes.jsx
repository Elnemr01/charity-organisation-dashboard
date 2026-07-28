import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import { Outlet } from 'react-router'

const DashboardRoutes = () => {
    return (
        <ProtectedRoute>
            <Outlet/>
        </ProtectedRoute>
    )
}

export default DashboardRoutes