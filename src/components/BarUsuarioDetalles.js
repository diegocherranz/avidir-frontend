import React, { useState } from "react";
import { Button, Col, FormControl, Row, Stack, Form, Modal } from "react-bootstrap";
import moment from "moment";
import { At } from "react-bootstrap-icons";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import axios from "axios";

const vincularAlexaURL = api_url + '/vincular-alexa';

const getEdad = (fecha) => {
    let years = moment().diff(fecha, 'years', false);
    return years;
}

function refreshPage() {
    window.location.reload(false);
  }

function BarUsuarioDetalles(props) {
    const [alexaDialogShow, setAlexaDialogShow] = useState(false);

    function VincularAlexaDialog(properties) {

        const [emailAlexa, setEmailAlexa] = useState('');

        function vincularAlexa(){
            const requestBody = {
                uuid: props.user.uuid,
                emailAlexa: emailAlexa
            }
    
            const requestConfig = {
                headers: {
                    'x-api-key': api_key
                }
            }


            axios.post(vincularAlexaURL, requestBody, requestConfig).then(response => {
                if (response.data) {
                    console.log(response)
                    properties.onHide();
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
            <Modal {...properties} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Vincular cuenta de Alexa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Por favor, introduzca el correo electrónico asociado a su cuenta de Alexa:</p>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                    <Form.Label column xs={2} sm={2}><At /></Form.Label>
                    <Col xs={10} sm={10}>
                        <Form.Control value={emailAlexa} type="email" onChange={event => setEmailAlexa(event.target.value)} placeholder="Introduce el email..." />
                    </Col>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="red" variant="danger" onClick={properties.onHide}>Cancelar</Button>
                    <Button variant="success" onClick={() => vincularAlexa()}>Vincular</Button>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <div>
            <Stack className="border" direction="horizontal" >
                <div><img width={150} src='https://upload.wikimedia.org/wikipedia/commons/c/cd/Portrait_Placeholder_Square.png'></img></div>
                <div className="vr" />
                <div className="m-5 mt-0 mb-0">
                    <Row><p>{props.user.nombre} {props.user.apellido}</p></Row>
                    <Row className="mt-3"><p>{props.user.email}</p></Row>
                </div>

                <div className="m-5 mt-0 mb-0">
                    <Row ><p>{getEdad(props.user.fecha_nacimiento)} años</p></Row>
                    <Row className="mt-3"><p>Fecha de nacimiento: {moment(props.user.fecha_nacimiento).format("DD-MM-YYYY")}</p></Row>
                </div>
                {/*
                <div className="m-5 mt-0 mb-0">
                <Row className="mb-4"><Button href={window.location.pathname + "/retos"}>Retos</Button></Row>
                    <Row className="mt-3 mb-3"><Button href={window.location.pathname + "/recompensas"}>Recompensas</Button></Row>
                </div>*/

}
                <div className="m-5 mt-0 mb-0">
                    <Row className="mb-4">
                        {(props.user.email_alexa === '') || (props.user.email_alexa === undefined) &&
                            <Button onClick={() => setAlexaDialogShow(true)} className='d-inline-block float-right'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alexa" viewBox="0 0 16 16">
                                <path d="M7.996 0A7.998 7.998 0 0 0 0 8a8 8 0 0 0 6.93 7.93v-1.613a1.06 1.06 0 0 0-.717-1.008A5.602 5.602 0 0 1 2.4 7.865 5.579 5.579 0 0 1 8.054 2.4a5.599 5.599 0 0 1 5.535 5.81l-.002.046a6.116 6.116 0 0 1-.012.192l-.005.061a4.85 4.85 0 0 1-.033.284l-.01.068c-.685 4.516-6.564 7.054-6.596 7.068A7.998 7.998 0 0 0 15.992 8 7.998 7.998 0 0 0 7.996.001Z"></path>
                            </svg> Vincular con Alexa </Button>
                        }
                        {(props.user.email_alexa != '') && (props.user.email_alexa != undefined) &&
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alexa" viewBox="0 0 16 16">
                            <path d="M7.996 0A7.998 7.998 0 0 0 0 8a8 8 0 0 0 6.93 7.93v-1.613a1.06 1.06 0 0 0-.717-1.008A5.602 5.602 0 0 1 2.4 7.865 5.579 5.579 0 0 1 8.054 2.4a5.599 5.599 0 0 1 5.535 5.81l-.002.046a6.116 6.116 0 0 1-.012.192l-.005.061a4.85 4.85 0 0 1-.033.284l-.01.068c-.685 4.516-6.564 7.054-6.596 7.068A7.998 7.998 0 0 0 15.992 8 7.998 7.998 0 0 0 7.996.001Z"></path>
                        </svg> Alexa skill vinculada</p>
                        }
                    </Row>
                    <Row className="mt-3 mb-4"/>
                </div>

            </Stack>
            <VincularAlexaDialog show={alexaDialogShow} onHide={() => setAlexaDialogShow(false)}/>
        </div>
    )

}

export default BarUsuarioDetalles;