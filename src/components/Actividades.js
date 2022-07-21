import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { findDOMNode } from "react-dom";
import { Carousel, CarouselItem, CarouselCaption, Container, Row, Col, Button } from 'react-bootstrap';
import BottomBarUsuario from './BottomBarUsuario';
import tareashogar from "../img/tareashogar.png";
import api_url from '../utils/ApiUrl';
import api_key from '../utils/ApiKey';
import axios from 'axios';
import { getUser } from './AuthService';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

const getActividadesByIDURL = api_url + '/get-actividades-user'

function ActividadCarouselItem(props) {
    let displayClass = "d-none"

    if(props.actividad.render){
        displayClass = "inline"
    }
    else{ displayClass = "d-none"}
    return (
        
        <div className={'m-5 actividad ' + displayClass}>
            <Row  >
                <img
                    style={{ width: "230px" }}
                    className="rounded mx-auto d-block"
                    src={tareashogar}
                    alt="Second slide"
                />
            </Row>

            <Row>
                <h5>{props.actividad.titulo}</h5>
            </Row>
            <Row>
                <p>{props.actividad.hora}</p>
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
        console.log("HEY");
        console.log(status)
        /*if(status === 'success'){
        slides = document.getElementsByClassName("actividad");

     
            showSlides(slideIndex);
        }*/
 
    }, []);


/*
    var next = document.getElementById("btn-next");
    var prev = document.getElementById("btn-prev");
    var indicador_pagina = document.getElementById("num_pagina");*/


/*

    function showSlides(n) {
        let i;

        if (n > slides.length) { setSlideIndex(1) }
        if (n < 1) { setSlideIndex(slides.length) }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
        indicador_pagina.innerHTML = slideIndex + " de " + slides.length;
        if (slideIndex == 1) prev.style.display = "none";
        else prev.style.display = "inline-block";
        if (slideIndex == slides.length) next.style.display = "none";
        else next.style.display = "inline-block";

    }

*/
    // Next/previous controls
    
    function plusSlides(n) {
        setSlideIndex(slideIndex + n);
        if (slideIndex > actividades.length - 1) { setSlideIndex(1) }
        if (slideIndex < 1) { setSlideIndex(actividades.length - 1) }
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
            <Container style={{ textAlign: "center" }}>
                <h5 className='m-3'>Mis actividades</h5>
                {
                    actividades.map((actividad, i) => {
                        if(slideIndex == i){
                            actividad.render = true
                        }
                        else{
                            actividad.render = false
                        }
                        return <ActividadCarouselItem actividad={actividad} key={actividad.uuid} />
                    })
                }

                <Row className='align-items-baseline'>
                    <Col xs={{ span: 1, offset: 2 }} ><Button variant='primary' onClick={() => plusSlides(1)}><ChevronLeft id='btn-prev' /></Button></Col>
                    <Col xs={{ span: 2 }}><p id='num_pagina'></p></Col>
                    <Col xs={{ span: 1, offset: 3 }} ><Button variant='primary' id='btn-next'  onClick={() => plusSlides(-1)}><ChevronRight /></Button></Col>
                </Row>
            </Container>



            <BottomBarUsuario />

        </div>

            
    )
}

export default Actividades;