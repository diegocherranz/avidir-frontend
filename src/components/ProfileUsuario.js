import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken, resetUserSession, getUser } from './AuthService';
import BottomBarUsuario from './BottomBarUsuario';

const ProfileUsuario = () => {

    const navigate = useNavigate();
    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }

    const user = getUser();

    return (

        <div>
            <p>Perfil</p>
            <p>Hola {user.nombre}</p>
            <Button onClick={logoutHandler} >Cerrar sesión</Button>
            <BottomBarUsuario />
        </div>
    )
}

export default ProfileUsuario;