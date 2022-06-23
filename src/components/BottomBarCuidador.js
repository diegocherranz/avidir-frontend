import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Bell, List, PersonFill, Cup, Trophy } from 'react-bootstrap-icons';
import { Navigate } from 'react-router-dom';
import { getUser, getToken } from './AuthService';



const BottomBarCuidador = () => {
    return (
        <Navbar bg='secondary'>
                <Nav variant='pills' activeKey={window.location.pathname} className="me-auto" >
                    <Nav.Link className='ml-3' style={{verticalAlign: 'center'}} href="/usuarios"><List/> Usuarios</Nav.Link>
                    <Nav.Link href="/notificaciones"><Bell/> Notificaciones</Nav.Link>
                    <Nav.Link href="/profile"><PersonFill/> Perfil</Nav.Link>
                </Nav>
        </Navbar>
    )

}

export default BottomBarCuidador;