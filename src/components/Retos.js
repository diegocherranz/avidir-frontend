import React, { Component } from 'react'
import { Card, Container, Stack } from 'react-bootstrap';
import { Check, Check2, CheckCircle, CheckLg, Twitch } from 'react-bootstrap-icons';
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
        id: 'PorcentajeSemanalATiempo',
        texto: 'Completa el 70% de actividades de la semana en el tiempo correcto',
        tipo: 'Semanal'
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

function RetosUsuario(props) {


    return (

        <div>
            <Container className='mt-3'>
                <h5>Retos</h5>

                {retos_estaticos.map(reto => {
                    return(
                        <Card className='my-3 align-items-baseline d-flex' key={reto.id}>
                            
                            <Stack className='p-2 pb-0 pt-0 align-items-center d-flex' direction='horizontal'>
                                <p className='align-items-center'>{reto.texto}</p>
                                <p className='ms-auto mx-2 align-items-center'><CheckLg size={30} width={40}/></p>
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