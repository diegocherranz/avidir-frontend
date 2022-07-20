import React, { Component, useEffect, useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getToken, resetUserSession, getUser } from './AuthService';
import BottomBarCuidador from './BottomBarCuidador';
import UsuarioCard from './UsuarioCard';
import api_key from '../utils/ApiKey';
import BarUsuarioDetalles from './BarUsuarioDetalles';
import axios from 'axios';
import api_url from '../utils/ApiUrl';

const getUserURL = api_url + '/get-usuario-id'

function PaginaUsuario(props){
    const {id} = useParams();
    const [usuario, setUsuario] = useState([]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    useEffect(() => {
        getUsuario();
      }, []);

      const onLoad = async () => {
        getUsuario();
      };

      const requestConfig = {
        headers: {
            'x-api-key': api_key
        }
    }
    const requestBody = {
        uuid: id
    }

    function getUsuario() {
        axios.post(getUserURL, requestBody, requestConfig).then(response => {
            if(response.data){
            setUsuario(response.data);
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


    return (

        <div>
            <BottomBarCuidador />
            <BarUsuarioDetalles user={usuario}/>

            <Container>
            <Stack  direction="horizontal" >
            <h5 className="m-3 mb-0">Actividades</h5>
            <Link className='btn m-3 mb-0 ms-auto' to='/nueva-actividad' state={{userid:id}} ><Button className="m-3 mb-0 ms-auto">Añadir Actividad</Button></Link>
            {/*<Button href='/nueva-actividad' className="m-3 mb-0 ms-auto">Añadir Actividad</Button>*/}
            </Stack>

            <div>
                
            </div>

            </Container>
        </div>
    )
}

export default PaginaUsuario;