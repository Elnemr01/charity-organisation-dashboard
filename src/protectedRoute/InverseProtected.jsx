import { useAuth } from '@/contextAPI/UserProvider';
import React from 'react'
import { Navigate, useLocation } from 'react-router';

const InverseProtected = ({children}) => {
    const location=useLocation();
    const {zadUser}=useAuth();

    if(localStorage.getItem("zadUser") || zadUser) {
        return <Navigate to="/" state={{from:location}} replace />
    }
    return (
        children
    )
}

export default InverseProtected