import React from 'react'


import { Navigate } from 'react-router-dom';
import { useAuth } from './Authcontext';


function ProtectedRoute({children}) {
    const {accessToken}=useAuth();
  return (
   <>
   {accessToken ?  children : <Navigate to="/" /> } 
   </>
  )
}

export default ProtectedRoute
