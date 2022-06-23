import axios from 'axios';
import React, { Component, useState } from 'react'
import { Button, Container, Nav, Navbar, Form, Row, Col } from 'react-bootstrap'
import { PersonFill, KeyFill, CalendarDate, At } from 'react-bootstrap-icons';
import { setUserSession } from './AuthService';
import { useNavigate } from 'react-router-dom';

const loginAPIUrl = 'https://n3cc1n86ek.execute-api.eu-west-3.amazonaws.com/prod/login'


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const goToRegister = () => {
        navigate('/registro');
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(email.trim() === '' || password.trim() === ''){
            setErrorMessage('Email y Contraseña requeridos');
            return;
        }

        setErrorMessage(null);

        const requestConfig = {
            headers: {
                'x-api-key': 'yhBQuDVWEw36apdbBybFT2BRLfOWkkO8aGfwvAAO'
            }
        }

        const requestBody = {
            email: email,
            password: password
        }

        axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
            setUserSession(response.data.user, response.data.token);
            navigate('/home');
        }).catch((error) => {
            if(error.response.status === 401 || error.response.status === 403){
                setErrorMessage(error.response.data.message);
            } else{
                setErrorMessage('El servidor no está disponible. Inténtelo de nuevo más tarde.')
            }
        })

    }

    return (
        <Container style={{ textAlign: "center" }} className="mt-5">
            <h4 style={{ textAlign: "center" }}>Login</h4>

            <Form className="mt-5 mr-5 ml-5" onSubmit={submitHandler}>
                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column xs={2} sm={2}><At /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={email} type="email" onChange={event => setEmail(event.target.value)} placeholder="Introduce tu email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                    <Form.Label column xs={2} sm={2}><KeyFill /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={password} type="password" onChange={event => setPassword(event.target.value)} placeholder="Contraseña" />
                    </Col>
                </Form.Group>



                <Form.Group as={Row} className="mt-4">
                    {errorMessage == '' && <p style={{ textAlign: "center" }}></p>}
                    {errorMessage && <p style={{ textAlign: "center" }}>{errorMessage}</p>}
                    <Col >

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Col>
                </Form.Group>
            </Form>

            <Form className="mt-5 mr-5 ml-5" onSubmit={goToRegister}>
            <Button type='submit' className='mt-3' variant='primary'>Registrarse</Button>
            </Form>
        </Container>


    );
}

export default LoginPage;