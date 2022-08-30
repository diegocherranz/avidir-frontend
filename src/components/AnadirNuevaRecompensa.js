import React, { Component, useEffect, useState } from "react";
import { Form, Row, Col, Button, Container, Dropdown } from "react-bootstrap";
import BottomBarCuidador from "./BottomBarCuidador";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import { PersonFill, KeyFill, CalendarDate, text, At, PersonBadge, } from 'react-bootstrap-icons';
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "./AuthService";
import axios from "axios";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import S3 from 'react-aws-s3';

const getUserURL = api_url + '/get-usuario-id';
const addRecompensaURL = api_url + '/add-recompensa';

window.Buffer = window.Buffer || require("buffer").Buffer;

function AnadirNuevaRecompensa(props) {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [message, setMessage] = useState('');
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        getUsuario();
    }, []);

    function getUsuario() {
        const requestBody = {
            uuid: id
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

    

    const uploadFile = async (file,config) => {
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        return ReactS3Client
        .uploadFile(file, file.name)
        .then(data => {console.log(data.location)
            return data.location;
        })
        .catch(err => console.error(err))


    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (titulo.trim() === '' || descripcion.trim() === '' || tipo.trim() === '' || archivoSeleccionado === null) {
            setMessage('Todos los campos son obligatorios');
            return;
        }
        setMessage(null);


        const configS3 = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESS,
            secretAccessKey: process.env.REACT_APP_SECRET,
            dirName: usuario.uuid
        }

        const location_file = await uploadFile(archivoSeleccionado,configS3).then(data => {
            console.log(data)
            return data}).catch(error => {
                console.log(error);
            })
            
            // the name of the file uploaded is used to upload it to S3
         /*   ReactS3Client
            .uploadFile(archivoSeleccionado, archivoSeleccionado.name)
            .then(data => 
                {
                    console.log(data.location);
                    location_file = data.location;
                })
            .catch(err => console.error(err))*/

        



        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        

        
        console.log(archivoSeleccionado);

        const requestBody = {
            titulo: titulo,
            descripcion: descripcion,
            tipo: tipo,
            archivo: location_file,
            uuid_user: usuario.uuid
        }

        console.log(requestBody);
        

        
        axios.post(addRecompensaURL, requestBody, requestConfig).then(response => {
            setMessage('Recompensa subida');
            navigate('/usuario/'+id+'/recompensas');
        }).catch(error => {
            if(error.response.status === 401){
                setMessage(error.response.data.message);
            }
            else{
                setMessage('El servidor no está disponible. Inténtelo de nuevo más tarde')
            }
        })
        
    }

    return (
        <div>
            <BottomBarCuidador />
            <Container className="mt-3">

                <h5>Nueva recompensa para {usuario.nombre +' '+usuario.apellido}</h5>
                <Form className="mt-5 mr-5 ml-5" onSubmit={submitHandler} >
                    <Form.Group as={Row} className="mb-3 mt-5" controlId="formTitulo">
                        <Form.Label column xs={2} sm={2}>Titulo</Form.Label>
                        <Col xs={10} sm={10}>
                            <Form.Control value={titulo} onChange={event => setTitulo(event.target.value)} type="text" placeholder="Titulo" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formDescripcion">
                        <Form.Label column xs={2} sm={2}>Descripción</Form.Label>
                        <Col xs={10} sm={10}>
                            <Form.Control value={descripcion} onChange={event => setDescripcion(event.target.value)} type="text" placeholder="Descripcion" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formTipo">
                        <Form.Label column xs={2} sm={2}>Tipo</Form.Label>
                        <Col xs={3} sm={3}>
                            <Dropdown>
                                <Dropdown.Toggle variant="light">
                                    {tipo ? tipo : "Seleccionar"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={event => setTipo(event.target.innerHTML)}>
                                        Audio
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={event => setTipo(event.target.innerHTML)}>
                                        Video
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={event => setTipo(event.target.innerHTML)}>
                                        Foto
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formDescripcion">
                        <Form.Label column xs={2} sm={2}>Archivo</Form.Label>
                        <Col xs={10} sm={10}>
                            <Form.Control onChange={event => setArchivoSeleccionado(event.target.files[0])} type="file" placeholder="Archivo" />
                        </Col>
                    </Form.Group>



                    <Form.Group style={{ textAlign: "center" }} as={Row} className="mt-4">
                        {message === '' && <p style={{ textAlign: "center" }}></p>}
                        {message && <p style={{ textAlign: "center" }}>{message}</p>}
                        <Col>

                            <Button variant="primary" type="submit">
                                Añadir recompensa
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}


export default AnadirNuevaRecompensa;