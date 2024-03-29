import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { ChevronRight, FileMusic, Film, Image } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import BottomBarCuidador from "./BottomBarCuidador";
import RecompensaCard from "./RecompensaCard";

const getUserURL = api_url + '/get-usuario-id'
const getRecompensasURL = api_url + '/get-recompensas-user'

/*
const recompensas = [
    {
        uuid_recompensa: 'id1',
        uuid_user: 'uuid',
        tipo: 'Foto',
        titulo: 'Foto de tus nietos'
    },
    {
        uuid_recompensa: 'id2',
        uuid_user: 'uuid',
        tipo: 'Audio',
        titulo: 'Audio de tus nietos'
    },
    {
        uuid_recompensa: 'id3',
        uuid_user: 'uuid',
        tipo: 'Video',
        titulo: 'Video de tus nietos'
    }
]*/

function ListadoRecompensasC(props) {
    const { id } = useParams();
    const [usuario, setUsuario] = useState([]);
    const [message, setMessage] = useState('');
    const [recompensas, setRecompensas] = useState([]);

    useEffect(() => {
        getUsuario();
        getRecompensas();
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

    function getRecompensas() {
        const requestBody = {
            uuid_user: id
        }
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(getRecompensasURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                setRecompensas(response.data);
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
            <BottomBarCuidador />

            <Container>
                <Stack direction="horizontal" >
                    <h5 className="m-3 mb-0">Recompensas de {usuario.nombre + ' ' + usuario.apellido}</h5>
                    <Link className='btn  ms-auto' to={'/usuario/' + id + '/nueva-recompensa'} state={{ userid: id }} ><Button className="m-3 mb-0 ms-auto">Añadir Recompensa</Button></Link>
                    {/*<Button href='/nueva-actividad' className="m-3 mb-0 ms-auto">Añadir Actividad</Button>*/}
                </Stack>

                <div className="mt-4">
                    {recompensas.map(recompensa => {
                        return (
                            <RecompensaCard recompensa={recompensa} />

                            /*
                            <Link to={'/recompensa/' + recompensa.uuid_recompensa} style={{ textDecoration: 'none', color: 'black' }}><Card className='m-3 mt-0 mb-0' key={recompensa.uuid_recompensa} >
                                <Stack className='' direction="horizontal">
                                    {recompensa.tipo === 'Audio' &&
                                        <FileMusic size={40} width={50} />
                                    }
                                    {recompensa.tipo === 'Video' &&
                                        <Film size={40} width={50} />
                                    }
                                    {recompensa.tipo === 'Foto' &&
                                        <Image size={40} width={50} />
                                    }
                                    <p className='m-3 mt-0 mb-0'>{recompensa.titulo}</p>
                                    <Button className="ms-auto" variant='light'><ChevronRight /></Button>
                                </Stack>
                            </Card>
                            </Link>*/
                        )
                    })}

                </div>

            </Container>
        </div>
    )

}

export default ListadoRecompensasC;