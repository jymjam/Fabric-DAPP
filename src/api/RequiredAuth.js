import { useLocation, Outlet, Navigate} from "react-router-dom";
import useAuth from "./useAuth";
import React from 'react'

const RequiredAuth = () => {
    const {auth} = useAuth()
    const location = useLocation()

    return(
        /*
        checks if the auth object contains username (if login successful) then allows access to child routes
        otherwise redirects to login page and deletes route history
        */
        auth?.username ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
    )
}

export default RequiredAuth