import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Stack } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import BottomBarCuidador from "./BottomBarCuidador";

const getUserURL = api_url + '/get-usuario-id'
const getRetosPersonalizadosURL = api_url + '/get-retos-personalizados'

function ListadoRetosC(props) {
    const { id } = useParams();
    const [usuario, setUsuario] = useState([]);
    const [message, setMessage] = useState('');
    const [retos,setRetos] = useState([]);


    useEffect(() => {
        getUsuario();
        getRetos();
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

    function getRetos(){
        const requestBody = {
            uuid_user: id
        }
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        axios.post(getRetosPersonalizadosURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                setRetos(response.data);
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
            <Container className="">
                <Stack direction="horizontal" >
                    <h5 className="m-3 mb-0">Retos de {usuario.nombre + ' ' + usuario.apellido}</h5>
                    <Link className='btn  ms-auto' to={'/usuario/' + id + '/nuevo-reto'} >
                        <Button className="m-3 mb-0 ms-auto">Añadir Reto</Button>
                    </Link>
                </Stack>

                <div>
                {retos.map(reto => {
                    return(
                        <Card className='my-3 align-self-center' key={reto.uuid_reto}>
                            
                            <Stack className='p-2 pb-0 pt-0 ' direction='horizontal'>
                                <p className=''>{reto.titulo}</p>
                                {//<p className='ms-auto mx-2 align-items-center'><CheckLg size={30} width={40}/></p>
                                }
                            </Stack>

                        </Card>
                    )
                })}
                </div>

            </Container>
        </div>
    )
}

export default ListadoRetosC;