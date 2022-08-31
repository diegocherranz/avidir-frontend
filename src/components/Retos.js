import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { Card, Container, Stack } from 'react-bootstrap';
import { Check, Check2, CheckCircle, CheckLg, Twitch } from 'react-bootstrap-icons';
import api_key from '../utils/ApiKey';
import api_url from '../utils/ApiUrl';
import { getUser } from './AuthService';
import BottomBarUsuario from './BottomBarUsuario';

const retos_estaticos = [
    {
        id: 'TodasActividadesHoy',
        texto: 'Completa todas las actividades de hoy',
        tipo: 'Diario'
    },
    {
        id: 'TodasActividadesHoyATiempo',
        texto: 'Completa todas las actividades de hoy en el tiempo correcto',
        tipo: 'Diario'
    },
    {
        id: 'NumeroActividades',
        texto: 'Completa 5 actividades de hoy en el tiempo correcto',
        tipo: 'Diario'
    },
    {
        id: 'TodasActividadesSemana',
        texto: 'Completa todas las actividades de la semana',
        tipo: 'Semanal'
    },
    {
        id: 'Puntual_uuidactividad',
        texto: 'Completa la actividad Titulo Actividad',
        tipo: 'Puntual'
    }
]

const getRetosURL = api_url + '/get-retos'
const getRetosCompletadosURL = api_url + '/get-retos-completados'

function RetosUsuario(props) {
    const [message, setMessage] = useState('');
    const [retos,setRetos] = useState([]);
    const [retosCompletados, setRetosCompletados] = useState([]);
    const user = getUser();

    useEffect(() => {
        getRetos();
        getRetosCompletados();
    }, []);

    function getRetos(){
        const requestBody = {
            uuid_user: user.uuid
        }
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(getRetosURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                setRetos(response.data);
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

    function getRetosCompletados(){
        const requestBody = {
            uuid_user: user.uuid
        }
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(getRetosCompletadosURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                console.log(response.data)
                setRetosCompletados(response.data.map(reto => {
                    return reto.uuid_reto
                })
                );
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


    return (

        <div>
            <Container className='mt-3'>
                <h5>Retos</h5>
                {console.log(retosCompletados)}

                {retos.map(reto => {
                    return(
                        <Card className='my-3 align-items-baseline d-flex' key={reto.uuid_reto}>
                            
                            <Stack className='p-2 pb-0 pt-0 align-items-center d-flex' direction='horizontal'>
                                <p className='align-items-center'>{reto.titulo}</p>
                                <p className='ms-auto mx-2 align-items-center'>
                                    { retosCompletados.includes(reto.uuid_reto) &&
                                    <CheckLg size={30} width={40}/>
                                    
                    }
                                    </p>
                            </Stack>

                        </Card>
                    )
                })}

            </Container>
            <BottomBarUsuario />
        </div>
    )
}

export default RetosUsuario;