import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Bell, List, PersonFill, Cup, Trophy } from 'react-bootstrap-icons';
import { Navigate } from 'react-router-dom';
import { getUser, getToken } from './AuthService';



const BottomBarCuidador = () => {
    return (
        <Navbar bg='secondary'>
                <Nav  variant='pills' activeKey={window.location.pathname} className="me-auto nav-fill" >
                    <Nav.Link className='ml-3 nav-justified' style={{verticalAlign: 'center', color: 'white'}} href="/usuarios"><List/> Usuarios</Nav.Link>
                    <Nav.Link style={{verticalAlign: 'center', color: 'white'}} href="/notificaciones"><Bell/> Notificaciones</Nav.Link>
                    <Nav.Link style={{verticalAlign: 'center', color: 'white'}} href="/profile"><PersonFill/> Perfil</Nav.Link>
                </Nav>
        </Navbar>
    )

}

export default BottomBarCuidador;