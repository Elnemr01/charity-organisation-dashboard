import React, { createContext, useContext, useState } from 'react'



const UserContext=createContext();

export const useAuth=()=> useContext(UserContext);


const UserProvider = ({children}) => {
    const [zadUser,setUser]=useState(()=> 
        JSON.parse(localStorage.getItem('zadUser')) ? JSON.parse(localStorage.getItem('zadUser')) : null
    );

    const data={
        zadUser,
        setUser
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider