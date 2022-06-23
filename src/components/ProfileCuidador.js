import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken, resetUserSession, getUser } from './AuthService';
import BottomBarCuidador from './BottomBarCuidador';

const ProfileCuidador = () => {

    const navigate = useNavigate();
    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }

    const user = getUser();

    return (

        <div>
            <BottomBarCuidador />
            <p>Perfil</p>
            <p>Hola {user.nombre}</p>
            <Button onClick={logoutHandler} >Cerrar sesión</Button>
            
        </div>
    )
}

export default ProfileCuidador;