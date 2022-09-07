import React, { Component, useEffect, useState } from 'react'
import { Button, Container, Stack, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getToken, resetUserSession, getUser } from './AuthService';
import BottomBarCuidador from './BottomBarCuidador';
import UsuarioCard from './UsuarioCard';
import api_key from '../utils/ApiKey';
import BarUsuarioDetalles from './BarUsuarioDetalles';
import axios from 'axios';
import api_url from '../utils/ApiUrl';
import ActividadCard from './ActividadCard';

const getUserURL = api_url + '/get-usuario-id'
const getActividadesByIDURL = api_url + '/get-actividades-user';
const getActividadesByIDHoyURL = api_url + '/get-actividades-hoy';
const getActividadesByIDHoyCompURL = api_url + '/get-actividades-hoy-c-comp';

function PaginaUsuario(props) {
    const { id } = useParams();
    const [usuario, setUsuario] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [actividadesHoy, setActividadesHoy] = useState([]);
    const [actividadesHoyCompletadas, setActividadesHoyCompletadas] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [tabKey, setTabKey] = useState('all');

    useEffect(() => {
        getUsuario();
        getActividadesByID();
        getActividadesHoy();
        getActividadesHoyCompletadas();
    }, []);

    const onLoad = async () => {
        getUsuario();
    };

    const requestConfig = {
        headers: {
            'x-api-key': api_key
        }
    }



    function getActividadesByID() {
        const requestBody = {
            uuid: id
        }

        axios.post(getActividadesByIDURL, requestBody, requestConfig).then(response => {
            if (response.data.length > 0) {
                setActividades(response.data);
            }
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


    function getActividadesHoy() {
        const requestBody = {
            uuid: id
        }

        axios.post(getActividadesByIDHoyURL, requestBody, requestConfig).then(response => {
            if (response.data.length > 0) {
                setActividadesHoy(response.data);
            }
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

    function getActividadesHoyCompletadas() {
        const requestBody = {
            uuid: id
        }

        axios.post(getActividadesByIDHoyCompURL, requestBody, requestConfig).then(response => {
            if (response.data.length > 0) {
                setActividadesHoyCompletadas(response.data);
            }
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

    function getUsuario() {
        const requestBody = {
            uuid: id
        }

        axios.post(getUserURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                setUsuario(response.data);
            }
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


    return (

        <div>
            <BottomBarCuidador />
            <BarUsuarioDetalles user={usuario} />

            <Container>
                <Stack direction="horizontal" >
                    <h5 className="m-3 mb-0">Actividades</h5>
                    <Button className='ms-auto m-3 mb-0' href={window.location.pathname + "/retos"}>Retos</Button>
                    <Button className='m-3 mb-0' href={window.location.pathname + "/recompensas"}>Recompensas</Button>
                    <Link className='btn ' to='/nueva-actividad' state={{ userid: id }} ><Button className="m-3 mb-0 ">Añadir Actividad</Button></Link>
                    {/*<Button href='/nueva-actividad' className="m-3 mb-0 ms-auto">Añadir Actividad</Button>*/}
                </Stack>

                <Tabs id="controlled-tab-example"
                    activeKey={tabKey}
                    onSelect={(k) => setTabKey(k)}
                    className="mx-3">
                    <Tab eventKey="all" title="Todas las actividades">
                        
                            {
                                actividades.map((actividad, i) => {
                                    return (
                                        <ActividadCard hoy={false} actividad={actividad} key={actividad.uuid} />
                                    )
                                })

                            }
                    </Tab>
                    <Tab eventKey="today" title="Actividades para hoy">
                            {
                                actividades.filter((val) => {
                                    if(actividadesHoyCompletadas.includes(val.uuid)){
                                        return val;
                                    }
                                }).map((actividad, i) => {
                                    return (
                                        <ActividadCard hoy={true} completada={true} actividad={actividad} key={actividad.uuid} />
                                    )
                                })

                            }
                            {
                                actividadesHoy.map((actividad, i) => {
                                    return (
                                        <ActividadCard hoy={true} completada={false} actividad={actividad} key={actividad.uuid} />
                                    )
                                })

                            }
                    </Tab>

                </Tabs>

            </Container>
        </div>
    )
}

export default PaginaUsuario;