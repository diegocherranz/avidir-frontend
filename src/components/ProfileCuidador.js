import React, { Component } from 'react'
import { Button, Container, Stack } from 'react-bootstrap';
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
            <Container className='text-center'>
            <h5 className='my-5'>Perfil</h5>
            <p >{user.nombre} {user.apellido}</p>
            <div className='my-5'><img width={150} src='https://upload.wikimedia.org/wikipedia/commons/c/cd/Portrait_Placeholder_Square.png'></img></div>
            
            <Button className='my-5' onClick={logoutHandler} >Cerrar sesión</Button>
            </Container>
            
        </div>
    )
}

export default ProfileCuidador;