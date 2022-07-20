import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Collapse, Container, Dropdown, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import BottomBarCuidador from "./BottomBarCuidador";

const addActividadURL = api_url + '/add-actividad'

function AddNotificacionesActividad({ prevStep, values, handleChange, handleChangeCheckbox }) {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        if ((values.notifUserTerminar && values.notifUserTerminarTiempo <= 0) || (values.notifCNoCompletar && values.notifCNoCompletarTiempo <= 0)) {
            setMessage("Introduce la cantidad de tiempo en los campos activados");
            console.log("EU")
            return;
        }
        setMessage('')

        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }
        const requestBody = {
            userid: values.userid,
            titulo: values.titulo,
            descripcion: values.descripcion,
            hora: values.hora,
            tiempo_completar: values.tiempo_completar,
            repeticionSelected: values.repeticionSelected,
            tipoSelected: values.tipoSelected,
            fechaUnaVez: values.fechaUnaVez,
            repeticionSemana: values.repeticionSemana,
            notifUserInicio: values.notifUserInicio,
            notifUserTerminar: values.notifUserTerminar,
            notifUserTerminarTiempo: values.notifUserTerminarTiempo,
            notifUserNoTerminar: values.notifUserNoTerminar,
            notifCCompletar: values.notifCCompletar,
            notifCNoCompletar: values.notifCNoCompletar,
            notifCNoCompletarTiempo: values.notifCNoCompletarTiempo
        }

        axios.post(addActividadURL, requestBody, requestConfig).then(response => {
            setMessage('Actividad creada');
            navigate('/usuario/'+values.userid);
        }).catch(error => {
            if(error.response.status === 401){
                setMessage(error.response.data.message);
            }
            else{
                setMessage('El servidor no está disponible. Inténtelo de nuevo más tarde')
            }
        })

    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    return (
        <div>
            <BottomBarCuidador />
            <Container className="mt-3">

                <h4>Notificaciones de Titulo Actividad</h4>

                <Form className="mt-5 mr-5 ml-5" >
                    <h5>Notificaciones al usuario</h5>
                    <Form.Group as={Row} className="mb-3" controlId="formTitulo">
                        <Form.Label column xs={2} sm={2}>¿Avisar al inicio?</Form.Label>
                        <Col xs={2} sm={2}>
                            <Form.Check
                                type="switch"
                                id="user-inicio-switch"
                                onClick={handleChangeCheckbox('notifUserInicio')}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formTitulo">
                        <Form.Label column xs={2} sm={2}>¿Avisar antes de terminar?</Form.Label>
                        <Col xs={2} sm={2}>
                            <Form.Check
                                type="switch"
                                id="user-terminar-switch"
                                onClick={handleChangeCheckbox('notifUserTerminar')}
                            />
                        </Col>
                        <Col xs={1} sm={1}>
                            <Form.Control value={values.notifUserTerminarTiempo} onChange={handleChange('notifUserTerminarTiempo')} type="number" placeholder="" />
                        </Col>
                        <Col>
                            <Form.Label column xs={2} sm={2}>minutos antes</Form.Label>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formTitulo">
                        <Form.Label column xs={2} sm={2}>¿Avisar si no se completa?</Form.Label>
                        <Col xs={2} sm={2}>
                            <Form.Check
                                type="switch"
                                id="user-no-completar-switch"
                                onClick={handleChangeCheckbox('notifUserNoTerminar')}
                            />
                        </Col>
                    </Form.Group>

                    <h5 className="mt-5">Notificaciones al cuidador</h5>
                    <Form.Group as={Row} className="mb-3" controlId="formTitulo">
                        <Form.Label column xs={2} sm={2}>¿Avisar al completar?</Form.Label>
                        <Col xs={2} sm={2}>
                            <Form.Check
                                type="switch"
                                id="c-completar-switch"
                                onClick={handleChangeCheckbox('notifCCompletar')}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formTitulo">
                        <Form.Label column xs={2} sm={2}>¿Avisar si NO se completa?</Form.Label>
                        <Col xs={2} sm={2}>
                            <Form.Check
                                type="switch"
                                id="c-nocompletar-switch"
                                onClick={handleChangeCheckbox('notifCNoCompletar')}
                            />
                        </Col>
                        <Col xs={1} sm={1}>
                            <Form.Label column>Tras</Form.Label>
                        </Col>
                        <Col xs={1} sm={1}>
                            <Form.Control value={values.notifCNoCompletarTiempo} onChange={handleChange('notifCNoCompletarTiempo')} type="number" placeholder="" />
                        </Col>
                        <Col xs={2} sm={2}>
                            <Form.Label column >minutos</Form.Label>
                        </Col>
                    </Form.Group>

                    {/*
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
                </Form.Group>*/
                    }



                    <Form.Group style={{ textAlign: "center" }} as={Row} className="mt-4">
                        {message === '' && <p style={{ textAlign: "center" }}></p>}
                        {message && <p style={{ textAlign: "center" }}>{message}</p>}
                        <Col>

                            <Button onClick={Previous} variant="primary" >
                                Volver
                            </Button>
                        </Col>
                        <Col>

                            <Button variant="primary" onClick={(event) => submitHandler(event)}>
                                Crear actividad
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}

export default AddNotificacionesActividad;