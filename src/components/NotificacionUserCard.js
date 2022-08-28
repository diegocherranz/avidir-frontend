import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Bell, Eye } from "react-bootstrap-icons";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";

const marcarNotificacionLeidaURL = api_url + '/marcar-notificacion-leida';

function refreshPage() {
    window.location.reload(false);
  }

function NotificacionUserCard(props){

    const [message, setMessage] = useState('');

    function marcarNotificacionLeida(){
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        const requestBody = {
            uuid_notificacion: props.notificacion.uuid_notificacion
        }

        axios.post(marcarNotificacionLeidaURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                refreshPage();
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
            {console.log()}
        <Card className='m-3 mt-0 mb-0 p-3 pt-0 pb-0' key={props.notificacion.uuid_notificacion} >
            <Card.Body>

                <Stack direction="horizontal">
                <Bell/>
                <p>{props.notificacion.texto}</p>
                <Button onClick={() => marcarNotificacionLeida()}><Eye/></Button>
                </Stack>
                {/*
            <Row className='align-items-baseline'>
                <Col xs={1}><Bell/></Col>
                <Col xs={8}><p>{props.notificacion.texto}</p></Col>
                <Col className='d-none d-sm-block'><Button><Eye/></Button></Col>
            </Row>*/
}
            </Card.Body>
        </Card>
        </div>
    )
}

export default NotificacionUserCard;