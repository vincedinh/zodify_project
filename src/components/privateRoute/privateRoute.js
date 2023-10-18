import React, {useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";

// import { useAuth } from "../../context/AuthContext";
import * as ROUTES from '../../constants/routes';

const PrivateRoute = ({children, ...rest}) => {
  // let auth = useAuth();

  return localStorage.getItem('accessToken') && Date.now() <= localStorage.getItem('tokenExpiresAt')
    ? <Outlet/> : <Navigate to={"/"}/>
}

export default PrivateRoute;