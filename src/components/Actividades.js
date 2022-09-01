import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { findDOMNode } from "react-dom";
import { Carousel, CarouselItem, CarouselCaption, Container, Row, Col, Button, Stack } from 'react-bootstrap';
import BottomBarUsuario from './BottomBarUsuario';

import api_url from '../utils/ApiUrl';
import api_key from '../utils/ApiKey';
import axios from 'axios';
import { getUser } from './AuthService';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import imagenActividadSelect from '../utils/ImageSelector';

const getActividadesByIDURL = api_url + '/get-actividades-hoy';
const completarActividadURL = api_url + '/completar-actividad';


function refreshPage() {
    window.location.reload(false);
  }


function ActividadCarouselItem(props) {
    const navigate = useNavigate();

    const completarActividad = (actividad) => {



        const requestBody = actividad
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(completarActividadURL, requestBody, requestConfig).then(response => {
            //navigate('/actividades')
            refreshPage();

        }).catch(error => {
            if (error.response.status === 401) {
                console.log(error.response.data.message);
            }
            else {
                console.log('El servidor no está disponible. Inténtelo de nuevo más tarde');
            }
        })
    }

    let displayClass = "d-none"

    const imagen = imagenActividadSelect(props.actividad.tipoSelected)

    if (props.actividad.render) {
        displayClass = "inline"
    }
    else { displayClass = "d-none" }
    return (

        <div className={' m-5 p-3 actividad ' + displayClass}>
            <Row  >
                <img
                    style={{ width: "230px" }}
                    className="rounded mx-auto d-block"
                    src={imagen}
                    alt="Second slide"
                />
            </Row>

            <Row>
                <h5>{props.actividad.titulo}</h5>
            </Row>
            <Row>
                <p>{props.actividad.hora}</p>
            </Row>
            <Row>
                <Stack direction="horizontal">
                    <Button href={'/actividad/'+props.actividad.uuid} >Detalles</Button>
                    <Button onClick={() => completarActividad(props.actividad)} className='ms-auto'>Completar</Button>
                </Stack>
            </Row>
        </div>
    )
    return;
}




function Actividades() {
    const [actividades, setActividades] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [slideIndex, setSlideIndex] = useState(0);

    const usuario = getUser();

    useEffect(() => {
        getActividadesByID();
    }, []);


    function plusSlides(n) {
        setSlideIndex(slideIndex + n);
        if (slideIndex + n > (actividades.length - 1)) { setSlideIndex(0) }
        if (slideIndex + n < 0) { setSlideIndex(actividades.length - 1) }

    }

    const requestConfig = {
        headers: {
            'x-api-key': api_key
        }
    }

    function getActividadesByID() {
        const requestBody = {
            uuid: usuario.uuid
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

    return (



        <div>
            <Container style={{ textAlign: "center",paddingBottom: '120px' }}>
                <h5 className='m-3'>Mis actividades</h5>
                {actividades.length > 0 &&

                    actividades.map((actividad, i) => {
                        if (slideIndex == i) {
                            actividad.render = true
                        }
                        else {
                            actividad.render = false
                        }
                        return <ActividadCarouselItem actividad={actividad} key={actividad.uuid} />
                    })

                }


                {actividades.length > 0 &&
                    <Row className='align-items-baseline'>
                        <Col xs={{ span: 1, offset: 1 }} ><Button variant='primary' onClick={() => plusSlides(-1)}><ChevronLeft id='btn-prev' /></Button></Col>
                        <Col xs={{ span: 4, offset: 2 }}><p>{slideIndex + 1} de {actividades.length}</p></Col>
                        <Col xs={{ span: 1, offset: 1 }} ><Button variant='primary' id='btn-next' onClick={() => plusSlides(1)}><ChevronRight /></Button></Col>
                    </Row>
                }

                {actividades.length === 0 &&
                    <p>No hay actividades disponibles</p>
                }

            </Container>



            <BottomBarUsuario />

        </div>


    )
}

export default Actividades;