import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { getUser,getToken } from './AuthService';


const Home = () => {
    if(getToken() && getUser().tipo === 'C'){
        return <Navigate to='/usuarios' replace/>
    }
    else if(getToken() && getUser().tipo === 'U'){
        return <Navigate to='/actividades' replace/>
    }


    return <Navigate to='/login' replace/>

}



export default Home;