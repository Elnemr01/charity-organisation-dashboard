import React from 'react'
import { useLocation } from 'react-router';

const InverseProtected = ({children}) => {
    const location=useLocation();

    if(localStorage.getItem("zadToken")) {
        return <Navigate to="/" state={{from:location}} replace />
    }
    return (
        children
    )
}

export default InverseProtected