import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Bell, Eye } from "react-bootstrap-icons";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";

const getActividadByIDURL = api_url + '/get-actividad-id';
const getUserURL = api_url + '/get-usuario-id';
const marcarNotificacionLeidaURL = api_url + '/marcar-notificacion-leida';

function refreshPage() {
    window.location.reload(false);
  }

function NotificacionCCard(props){
    const [usuario, setUsuario] = useState({});
    const [actividad, setActividad] = useState({});
    const [message, setMessage] = useState('');

    
    

    function getUsuarioByID(){
        console.log(props.notificacion.uuid_usuarioACargo)
        const requestBody = {
            uuid: props.notificacion.uuid_usuarioACargo
        }

        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(getUserURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                setUsuario(response.data);
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

    function getActividadByID(){
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        const requestBody = {
            uuid: props.notificacion.uuid_actividad,
            userUuid: props.notificacion.uuid_usuarioACargo
        }

        axios.post(getActividadByIDURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                setActividad(response.data);
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

    useEffect(() => {
        getUsuarioByID();
        getActividadByID();
    }, []);

    return (
        <div>
        <Card className='m-3  p-3 pt-0 pb-0' key={props.notificacion.uuid_notificacion} >
            
            <Row className=''>
                <Col><Bell/></Col>
                {props.notificacion.tipo === 'CCompletada' && 
                <Col ><p className='pl-3'>Actividad completada</p></Col>
                }
                {props.notificacion.tipo === 'CNoCompletada' && 
                <Col ><p className='pl-3'>Actividad NO completada</p></Col>
                }
                <Col className='d-none d-sm-block'><p>{actividad.titulo}</p></Col>
                <Col className='d-none d-sm-block'><p>{usuario.nombre} {usuario.apellido}</p></Col>
                <Col className='d-none d-sm-block'><Button onClick={() => marcarNotificacionLeida()}><Eye/></Button></Col>
            </Row>
        </Card>
        </div>
    )
}

export default NotificacionCCard;