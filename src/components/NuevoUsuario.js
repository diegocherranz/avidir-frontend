import React, { Component, useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import BottomBarCuidador from "./BottomBarCuidador";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import { PersonFill, KeyFill, CalendarDate, text, At, PersonBadge,  } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import { getUser } from "./AuthService";
import axios from "axios";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";

const NuevoUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [dni, setDNI] = useState('');
    const [fechaNacimiento, setFecha] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const addUserUrl = api_url + '/add-usuario';
    

    const navigate = useNavigate();
    const cuidador = getUser();

    const submitHandler = (event) => {
        event.preventDefault();
        if(nombre.trim() === '' || apellidos.trim() === '' || dni.trim() === '' || fechaNacimiento.trim() === '' || email.trim() === '' || password.trim() === ''){
            setMessage('Todos los campos son obligatorios');
            return;
        }
        setMessage(null);

        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        const requestBody = {
            nombre: nombre,
            apellido: apellidos,
            fecha_nacimiento: fechaNacimiento,
            email: email,
            dni: dni,
            password: password,
            cuidador: cuidador.email
        }

        console.log(requestBody);

        axios.post(addUserUrl, requestBody, requestConfig).then(response => {
            setMessage('Usuario registrado');
            navigate('/usuarios');
        }).catch(error => {
            if(error.response.status === 401){
                setMessage(error.response.data.message);
            }
            else{
                setMessage('El servidor no está disponible. Inténtelo de nuevo más tarde')
            }
        })
    }

    return (
        <div>
            <BottomBarCuidador />
        <Container className="mt-3">
            
            <h5>Nuevo usuario</h5>
            <Form className="mt-5 mr-5 ml-5" onSubmit={submitHandler} >
                <Form.Group as={Row} className="mb-3 mt-5" controlId="formNombre">
                    <Form.Label column xs={2} sm={2}><PersonFill /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={nombre} onChange={event => setNombre(event.target.value)} type="text" placeholder="Nombre" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formApellidos">
                    <Form.Label column xs={2} sm={2}><PersonFill /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={apellidos} onChange={event => setApellidos(event.target.value)} type="text" placeholder="Apellidos" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDNI">
                    <Form.Label column xs={2} sm={2}><PersonBadge /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={dni} onChange={event => setDNI(event.target.value)} type="text" placeholder="DNI" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formFechaNacimiento">
                    <Form.Label column xs={2} sm={2}><FontAwesomeIcon icon={faCakeCandles} /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={fechaNacimiento} onChange={event => setFecha(event.target.value)} type="date" placeholder='Fecha de nacimiento' />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column xs={2} sm={2}><At /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={email} type="email" onChange={event => setEmail(event.target.value)} placeholder="Introduce el email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                    <Form.Label column xs={2} sm={2}><KeyFill /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={password} type="password" onChange={event => setPassword(event.target.value)} placeholder="Contraseña" />
                    </Col>
                </Form.Group>



                <Form.Group style={{ textAlign: "center" }} as={Row} className="mt-4">
                    {message == '' && <p style={{ textAlign: "center" }}></p>}
                    {message && <p style={{ textAlign: "center" }}>{message}</p>}
                    <Col>

                        <Button variant="primary" type="submit">
                            Añadir usuario
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
        </div>
    );
}


export default NuevoUsuario;