import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import BottomBarCuidador from "./BottomBarCuidador";

const getUserURL = api_url + '/get-usuario-id';
const getActividadesByIDURL = api_url + '/get-actividades-user';
const addRetoURL = api_url + '/add-reto'

function AnadirReto(props) {
    const { id } = useParams();
    const [usuario, setUsuario] = useState([]);
    const [message, setMessage] = useState('');
    const [actividades, setActividades] = useState([]);
    const [actTitulo, setActTitulo] = useState('');
    const [actUUID, setActUUID] = useState('');
    const [aTiempo, setATiempo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUsuario();
        getActividadesByID();
    }, []);

    const requestConfig = {
        headers: {
            'x-api-key': api_key
        }
    }

    function getUsuario() {
        const requestBody = {
            uuid: id
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

    function getActividadesByID() {
        const requestBody = {
            uuid: id
        }

        axios.post(getActividadesByIDURL, requestBody, requestConfig).then(response => {
            if (response.data.length > 0) {
                setActividades(response.data);
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

    const submitHandler =  (event) => {
        event.preventDefault();
        if (actTitulo.trim() === '') {
            setMessage('Todos los campos son obligatorios');
            return;
        }
        setMessage(null);

        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        let titulo = '';

        if(aTiempo){
            titulo = `Completar la actividad "${actTitulo}" en el tiempo adecuado`
        }else{
            titulo = `Completar la actividad "${actTitulo}"`
        }

        const requestBody = {
            titulo: titulo,
            act_titulo: actTitulo,
            uuid_act: actUUID,
            tipo: 'Personalizado',
            uuid_user: id,
            a_tiempo: aTiempo
        }

        axios.post(addRetoURL, requestBody, requestConfig).then(response => {
            setMessage('Reto creado');
            navigate('/usuario/'+id+'/retos');
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

                <h5>Nuevo reto al completar actividad para {usuario.nombre + ' ' + usuario.apellido}</h5>
                <Form className="mt-5 mr-5 ml-5"  onSubmit={submitHandler}>



                    <Form.Group as={Row} className="mb-3" controlId="formAct">
                        <Form.Label column xs={4} sm={3}>Actividad asociada</Form.Label>
                        <Col xs={3} sm={3}>
                            <Dropdown className="">
                                <Dropdown.Toggle className="border" variant="light">
                                    {actTitulo ? actTitulo : "Seleccionar"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {actividades.map(actividad => {
                                        return(
                                        <Dropdown.Item key={actividad.uuid} id={actividad.uuid} onClickCapture={event => {
                                            setActTitulo(event.target.innerHTML)
                                            setActUUID(event.target.id)
                                        }}>
                                            {actividad.titulo}
                                        </Dropdown.Item>
                                        )

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formTitulo">
                        <Form.Label column xs={4} sm={3}>¿Completada en el tiempo correcto?</Form.Label>
                        <Col xs={2} sm={2}>
                            <Form.Check
                                type="switch"
                                id="completada-atiempo"
                                onClick={event => setATiempo(event.target.checked)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group style={{ textAlign: "center" }} as={Row} className="mt-4">
                        {message === '' && <p style={{ textAlign: "center" }}></p>}
                        {message && <p style={{ textAlign: "center" }}>{message}</p>}
                        <Col>

                            <Button variant="primary" type="submit">
                                Añadir reto
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Container>

        </div>
    )
}

export default AnadirReto;