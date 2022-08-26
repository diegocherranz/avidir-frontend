import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Stack } from "react-bootstrap";
import { CheckCircle, CheckCircleFill, Clock, X, XCircleFill } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import imagenActividadSelect from "../utils/ImageSelector";
import { getUser } from "./AuthService";
import '../styles/custom.css'
import BottomBarUsuario from "./BottomBarUsuario";

const getActividadByIDURL = api_url + '/get-actividad-id';
const completarActividadURL = api_url + '/completar-actividad';
const dias_semana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

function ActividadDetalles(props) {
    const { id } = useParams();
    const [actividad, setActividad] = useState({});
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [imagenActividad, setImagenActividad] = useState(null);
    const usuario = getUser();

    const navigate = useNavigate();

    useEffect(() => {
        getActividadByID();
    }, []);

    const completarActividad = (actividad) => {



        const requestBody = actividad
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(completarActividadURL, requestBody, requestConfig).then(response => {
            navigate('/actividades')

        }).catch(error => {
            if (error.response.status === 401) {
                console.log(error.response.data.message);
            }
            else {
                console.log('El servidor no está disponible. Inténtelo de nuevo más tarde');
            }
        })
    }

    function getActividadByID() {
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        const requestBody = {
            uuid: id,
            userUuid: usuario.uuid
        }

        axios.post(getActividadByIDURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                setActividad(response.data);
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

    const CheckboxSemana = () => {
        return (
            <Stack className="weekDays-selector mx-3" direction="horizontal">
                {dias_semana.map((dia) => {
                    return (<div key={dia}>
                        {actividad.repeticionSemana.includes(dia) &&
                            <input readOnly checked type="checkbox" id={"dia-" + dia} className='weekday' />
                        }
                        {!actividad.repeticionSemana.includes(dia) &&
                            <input disabled type="checkbox" id={"dia-" + dia} className='weekday' />
                        }
                        <label htmlFor={"dia-" + dia}>{dia}</label>

                    </div>)
                })}
            </Stack>
        )
    }

    return (
        <div>
            <Container className="">
                <h4 className="mt-5 mx-3">Actividad</h4>
                <h5 className="mt-5 mx-3">{actividad.titulo}</h5>
                <p className="mt-3 mx-3">Descripción: {actividad.descripcion}</p>
                <p className="mt-3 mx-3"><Clock /> {actividad.hora}</p>
                <p className="mt-3 mx-3">Duración: {actividad.tiempo_completar} minutos</p>
                {actividad.repeticionSelected === "Semanalmente" &&
                    <CheckboxSemana className="mt-3" />
                }



            </Container>
            <Stack className="stack-buttons mx-5" direction="horizontal">
                <XCircleFill color="red" size={60} />
                <CheckCircleFill onClick={() => completarActividad(actividad)} className="ms-auto" color="green" size={60} />
            </Stack>
            <BottomBarUsuario />
        </div>
    )
}

export default ActividadDetalles;