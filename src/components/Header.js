import React, { Component } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getToken, getUser, resetUserSession } from './AuthService';
import logo from '../img/imagotipo_avidir_negativo.png'
import logosvg from '../img/logosvg.svg'



const Header = () => {

    return (

        <div>
            <Navbar bg="primary" className='justify-content-center'>
                <Navbar.Brand  href='/'><img height={30} src={logosvg}></img></Navbar.Brand>
            </Navbar>
        </div>

    );
}

export default Header;