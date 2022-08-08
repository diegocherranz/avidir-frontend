import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { Clock } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import BottomBarCuidador from "./BottomBarCuidador";

const getActividadByIDURL = api_url + '/get-actividad-id';
const dias_semana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const formatDate = (inputDate) => {
    let dateI = new Date(inputDate);

    return ( dateI.getDate() + "-" + dateI.getMonth() + "-" + dateI.getFullYear())
}

function ActividadDetallesC(props) {
    const { id, actid } = useParams();
    const [actividad, setActividad] = useState({});
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        getActividadByID();
    }, []);

    function getActividadByID() {
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        const requestBody = {
            uuid: actid,
            userUuid: id
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
            <BottomBarCuidador/>
            <Container className="">
                <h4 className="mt-5 mx-3">Actividad</h4>
                <h5 className="mt-5 mx-3">{actividad.titulo}</h5>
                <p className="mt-3 mx-3">Descripción: {actividad.descripcion}</p>
                <p className="mt-3 mx-3"><Clock /> {actividad.hora}</p>
                <p className="mt-3 mx-3">Duración: {actividad.tiempo_completar} minutos</p>
                {actividad.repeticionSelected === "Semanalmente" &&
                    <CheckboxSemana className="mt-3" />
                }
                {actividad.repeticionSelected === "Una sola vez" &&
                    <p className="mt-3 mx-3">Fecha: {formatDate(actividad.fechaUnaVez)}</p>
                }
                {actividad.repeticionSelected === "Diariamente" &&
                    <p className="mt-3 mx-3">Actividad diaria</p>
                }



            </Container>
        </div>
    )

}

export default ActividadDetallesC;