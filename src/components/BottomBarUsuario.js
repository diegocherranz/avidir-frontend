import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Bell, Film, List, PersonFill, Trophy } from 'react-bootstrap-icons';
import { Navigate } from 'react-router-dom';
import { getUser, getToken } from './AuthService';



const BottomBarUsuario = () => {
    return (
        <Navbar bg='secondary' fixed='bottom' variant='light' style={{ textAlign: "center", }}>
                <Nav className='m-auto' activeKey={window.location.pathname}  >
                    <Nav.Link href="/actividades"><List/><p className='m-0'>Actividades</p></Nav.Link>
                    <Nav.Link href="/notificaciones-usuario"><Bell/><p className='m-0'>Avisos</p></Nav.Link>
                    <Nav.Link href="/retos-usuario"><Trophy/><br/><p className='m-0'>Retos</p></Nav.Link>
                    <Nav.Link href="/recompensas"><Film/><p className='m-0'>Recompensas</p></Nav.Link>
                </Nav>
        </Navbar>
    )

}

export default BottomBarUsuario;