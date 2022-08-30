import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Bell, Film, List, PersonFill, Trophy } from 'react-bootstrap-icons';
import { Navigate } from 'react-router-dom';
import { getUser, getToken } from './AuthService';



const BottomBarUsuario = () => {
    return (
        <Navbar bg='light' fixed='bottom' variant='light' style={{ textAlign: "center" }}>
                <Nav activeKey={window.location.pathname} className="m-auto" >
                    <Nav.Link href="/actividades"><List/><p>Actividades</p></Nav.Link>
                    <Nav.Link href="/notificaciones-usuario"><Bell/><p>Notificaciones</p></Nav.Link>
                    <Nav.Link href="/retos-usuario"><Trophy/><br/>Retos</Nav.Link>
                    <Nav.Link href="/recompensas"><Film/><p>Recompensas</p></Nav.Link>
                </Nav>
        </Navbar>
    )

}

export default BottomBarUsuario;