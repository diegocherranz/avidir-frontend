import axios from "axios";
import React, { useState } from "react";
import { Card, Col, Row, Button, Stack, Modal } from "react-bootstrap";
import { ChevronRight, Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";

const dias_semana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const eliminarActividadURL = api_url + '/eliminar-actividad';

const CheckboxSemana = (props) => {
    return (
        <Stack className="weekDays-selector-card mx-3" direction="horizontal">
            {dias_semana.map((dia) => {
                return (<div key={dia}>
                    {props.actividad.repeticionSemana.includes(dia) &&
                        <input readOnly checked type="checkbox" id={"dia-" + dia} className='weekday' />
                    }
                    {!props.actividad.repeticionSemana.includes(dia) &&
                        <input disabled type="checkbox" id={"dia-" + dia} className='weekday' />
                    }
                    <label htmlFor={"dia-" + dia}>{dia}</label>

                </div>)
            })}
        </Stack>
    )
}

const formatDate = (inputDate) => {
    let dateI = new Date(inputDate);

    return (`${dateI.getDate()}-${dateI.getMonth() + 1}-${dateI.getFullYear()}`)
}

function refreshPage() {
    window.location.reload(false);
}

function DeleteDialog(props) {

    function eliminarActividad() {

        const requestBody = {
            uuid: props.actividad.uuid,
            userUuid: props.actividad.userUuid
        }

        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(eliminarActividadURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                props.onHide();
                refreshPage();
            }

        }).catch(error => {
            if (error.response.status === 401) {
                console.error(error.response.data.message);
            }
            else {
                console.error('El servidor no está disponible. Inténtelo de nuevo más tarde');
            }
        })
    }

    return (
        <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <p>¿Está seguro de que desea eliminar la actividad "{props.actividad.titulo}"?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button color="red" variant="danger" onClick={props.onHide}>No</Button>
                <Button variant="success" onClick={() => eliminarActividad()}>Sí</Button>
            </Modal.Footer>
        </Modal>
    )
}

function ActividadCard(props) {
    const [deleteDialogShow, setDeleteDialogShow] = useState(false);


    return (
        <Card className='m-3 mt-0 mb-0 p-3 pt-0 pb-0' key={props.actividad.uuid} >
            <Row className='align-items-baseline'>
                <Col xs={8} sm={2}><p className=''>{props.actividad.titulo}</p></Col>
                <Col xs={3} sm={2} className='d-none d-sm-block'><p>{props.actividad.hora}</p></Col>
                <Col xs={3} sm={2} className='d-none d-sm-block text-center'>
                    {props.actividad.repeticionSelected === "Semanalmente" && !props.hoy &&
                        <CheckboxSemana actividad={props.actividad} />
                    }
                    {props.actividad.repeticionSelected === "Diariamente" && !props.hoy &&
                        <p>Todos los días</p>
                    }
                    {props.actividad.repeticionSelected === "Una sola vez" && !props.hoy &&
                        <p>Fecha: {formatDate(props.actividad.fechaUnaVez)}</p>
                    }
                    {props.hoy && props.completada &&
                        <p>Completada &#10004;</p>
                    }
                </Col>
                <Col xs={1} sm={{ span: 1, offset: 4 }} className="">
                    <Link to={'/usuario/' + props.actividad.userUuid + '/' + props.actividad.uuid} style={{ textDecoration: 'none' }}>
                        <Button variant='light'>
                            <ChevronRight />
                        </Button>
                    </Link>
                </Col>
                {//<Col xs={1} sm={1}><Button variant='light'><Pencil /></Button></Col>
                
                }
                <Col xs={1} sm={1}><Button onClick={() => setDeleteDialogShow(true)} variant='light'><Trash /></Button></Col>
            </Row>

            <DeleteDialog actividad={props.actividad} show={deleteDialogShow} onHide={() => setDeleteDialogShow(false)} />
        </Card>
    )
}

export default ActividadCard;