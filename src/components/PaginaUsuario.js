import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken, resetUserSession, getUser } from './AuthService';
import BottomBarCuidador from './BottomBarCuidador';

const PaginaUsuario = () => {

    return (

        <div>
            <BottomBarCuidador />
            <p>Hola {this.props.email}</p>
        </div>
    )
}

export default PaginaUsuario;