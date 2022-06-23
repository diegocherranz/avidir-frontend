import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken , getUser} from '../components/AuthService';

const PrivateRouteC = () => {
  //  const auth = getToken(); // determine if authorized, from context or however you're doing it
    const user = getUser().tipo === 'C';
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/home" />;
}

export default PrivateRouteC;