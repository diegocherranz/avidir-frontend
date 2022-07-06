import React, { Component, useState, useEffect } from 'react'
import { Button, Navbar, Form, FormControl, Container, Row, Col, Card } from 'react-bootstrap';
import BottomBarCuidador from './BottomBarCuidador';
import { ArrowReturnRight, ArrowRight, ChevronRight, Plus, Search } from 'react-bootstrap-icons';
import { getUser } from './AuthService';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import UsuarioCard from './UsuarioCard';
import api_key from '../utils/ApiKey';
import BarUsuarioDetalles from './BarUsuarioDetalles';

const getUsersUrl = 'https://n3cc1n86ek.execute-api.eu-west-3.amazonaws.com/prod/get-usuarios-c';



const ListadoUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const cuidador = getUser();
    const requestConfig = {
        headers: {
            'x-api-key': api_key
        }
    }
    const requestBody = {
        email: cuidador.email,
    }


    function getUsuarios() {
        axios.post(getUsersUrl, requestBody, requestConfig).then(response => {
            setUsuarios(response.data);
            console.log(usuarios);
            setStatus('success');
        }).catch(error => {
            if (error.response.status === 401) {
                setMessage(error.response.data.message);
            }
            else {
                setMessage('El servidor no está disponible. Inténtelo de nuevo más tarde');
            }
        })
    }


    useEffect(() => {
        getUsuarios();
    }, []);

    const goToUser = (email) => {
        console.log(email);
    }

    return (

        <div>
            <BottomBarCuidador />

            <Container>
                <Row className='mt-3'>
                    <Col >
                        <Button href='/nuevo-usuario' ><Plus /> Añadir usuario</Button>
                    </Col>


                    <Col>
                        <Form className='align-items-baseline'>
                            <Row>
                                <Col className='col-9'>
                                    <FormControl
                                        type="search"
                                        className='me-2'
                                        placeholder="Buscar..."
                                        aria-label="Buscar..."
                                    />
                                </Col>
                                <Col className='col-3'>
                                    <Button variant="outline-success"><Search /></Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>


            {
                <Container>
                    <h5 className='m-3'>Usuarios</h5>
                    {
                        usuarios.map((user, i) => {
                            console.log(user.nombre);
                            return (
                                <UsuarioCard user={user} key={user.email} />
                            )
                        })

                    }
                </Container>
            }


        </div>
    )

}

export default ListadoUsuarios;