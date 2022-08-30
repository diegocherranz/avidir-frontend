import React, { useEffect } from 'react';
import axios from 'axios';

import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { getUser } from './AuthService';
import BottomBarCuidador from './BottomBarCuidador';
import BottomBarUsuario from './BottomBarUsuario';
const { useState } = require("react");
const { useParams } = require("react-router-dom");
const { default: api_key } = require("../utils/ApiKey");
const { default: api_url } = require("../utils/ApiUrl");


const getRecompensaByIDURL = api_url + '/get-recompensa-id'

function DetallesRecompensa(props) {
    const { uuid_recompensa } = useParams();
    const [recompensa, setRecompensa] = useState({});
    const [message, setMessage] = useState('');
    const user = getUser();

    useEffect(() => {
        getRecompensaByID();
    }, []);

    function getRecompensaByID() {
        const requestConfig = {
            headers: {
                'x-api-key': api_key
            }
        }

        const requestBody = {
            uuid_recompensa: uuid_recompensa
        }

        axios.post(getRecompensaByIDURL, requestBody, requestConfig).then(response => {
            if (response.data) {
                setRecompensa(response.data);
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
            {user.tipo === 'C' &&
                <BottomBarCuidador />
            }
            <Container className="">
                <h4 className="mt-3 mx-3">Recompensa</h4>
                <h5 className="mt-4 mx-3">{recompensa.titulo}</h5>
                <p className="mt-3 mx-3">Descripción: {recompensa.descripcion}</p>
                {recompensa.tipo === 'Foto' &&
                    <img width={'100%'} src={recompensa.archivo}></img>
                }
                {recompensa.tipo === 'Video' &&
                    <ReactPlayer controls={true} width={'100%'} url={recompensa.archivo}></ReactPlayer>
                }
                {console.log(recompensa.archivo)}
                {recompensa.tipo === 'Audio' &&
                    //<ReactAudioPlayer controls src={recompensa.archivo}></ReactAudioPlayer>
                    <div>
                    <audio controls src={recompensa.archivo}></audio>
                    
                    </div>
                }

            </Container>
            {user.tipo === 'U' &&
                <BottomBarUsuario />
            }
        </div>
    )
}

export default DetallesRecompensa;