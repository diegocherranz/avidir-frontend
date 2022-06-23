import React, { Component } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getToken, getUser, resetUserSession } from './AuthService';



const Header = () => {

    return (

        <div>
            <Navbar bg="primary" className='justify-content-center'>
                <Navbar.Brand href='/'>Logo</Navbar.Brand>
            </Navbar>
        </div>

    );
}

export default Header;