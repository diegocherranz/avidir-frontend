import React, { Component } from "react";
import {Navigate, Route} from 'react-router-dom';
import { getToken } from "../components/AuthService";

const PublicRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={props => {
            return !getToken() ? <Component {...props}/>
            : <Navigate to='/home' replace/>
        }}/>
    )
}

export default PublicRoute;

