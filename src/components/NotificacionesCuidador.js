import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { Bell, Eye } from 'react-bootstrap-icons';
import api_key from '../utils/ApiKey';
import api_url from '../utils/ApiUrl';
import { getUser } from './AuthService';
import BottomBarCuidador from './BottomBarCuidador';
import BottomBarUsuario from './BottomBarUsuario';
import NotificacionCCard from './NotificacionCCard';
import NotificacionUserCard from './NotificacionUserCard';

const getNotificacionesUserURL = api_url + '/get-notificaciones-user'

function NotificacionesCuidador(props) {

    const [notificaciones, setNotificaciones] = useState([]);
    const [message, setMessage] = useState('');
    const usuario = getUser();





    function getNotificaciones() {
        const requestBody = {
            user_uuid: usuario.uuid
        }

        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(getNotificacionesUserURL, requestBody, requestConfig).then(response => {
            if (response.data.length > 0) {
                setNotificaciones(response.data);
            }

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
        getNotificaciones();
    }, []);

    return (

        <div>

            {usuario.tipo === 'C' &&
                <BottomBarCuidador />
            }
            <Container style={{ paddingBottom: '120px' }}>
            <h5 className="m-3">Notificaciones</h5>
            {usuario.tipo === 'C' &&
                <Row className='m-3 mb-0'>
                    <Col><Bell /></Col>

                    <Col ><p className='pl-3'>Notificación</p></Col>
                    <Col className='d-none d-sm-block'><p>Título</p></Col>
                    <Col className='d-none d-sm-block'><p>Usuario</p></Col>
                    <Col className='d-none d-sm-block'></Col>
                </Row>
            }

<Stack>
            {notificaciones.map((notificacion, i) => {
                console.log(notificacion);
                if (usuario.tipo === 'C')
                    return (
                        <NotificacionCCard notificacion={notificacion} key={notificacion.uuid_notificacion} />

                    )
                else {
                    return (
                        
                        <NotificacionUserCard notificacion={notificacion} key={notificacion.uuid_notificacion} />
                        /*<Card className='m-3 mt-3 p-0' bg={"backgrund-card"}  >
                            {console.log(notificacion)}
                            <Stack direction='horizontal'>
                                <Stack>
                                    <Card.Title className='m-3 mt-1'>Comenzar actividad</Card.Title>
                                    <Card.Body className='mx-0'>
                                        <p style={{ 'font-size': '18px' }}>Tomar paracetamol</p>
                                        <p style={{ 'font-size': '16px' }}>Tiempo estimado: 5 minutos</p>

                                        {/*
                            <Row className='align-items-baseline'>
                                <Col xs={1}><Bell/></Col>
                                <Col xs={8}><p>{props.notificacion.texto}</p></Col>
                                <Col className='d-none d-sm-block'><Button><Eye/></Button></Col>
                            </Row>
                                        }
                                    </Card.Body>
                                </Stack>
                                <Button className='ms-auto mx-2'><Eye /></Button>
                            </Stack>
                        </Card>*/
                    )
                }
            })}
            </Stack>
            </Container>
            {usuario.tipo === 'U' &&
                <BottomBarUsuario />
            }

        </div>
    )

}

export default NotificacionesCuidador;