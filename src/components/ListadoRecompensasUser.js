import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api_key from "../utils/ApiKey";
import api_url from "../utils/ApiUrl";
import { getUser } from "./AuthService";
import BottomBarUsuario from "./BottomBarUsuario";
import RecompensaCard from "./RecompensaCard";

const getRecompensasURL = api_url + '/get-recompensas-user'


function ListadoRecompensasUser(props) {
    const user = getUser();
    const [recompensas, setRecompensas] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getRecompensas();
    }, []);

    function getRecompensas() {
        const requestBody = {
            uuid_user: user.uuid
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

    return(
        <div>
        <Container className="mt-3">
            <h5>Recompensas disponibles</h5>
            <div className="mt-3">
            {recompensas.filter(recompensa => {
                if(recompensa.disponible){
                    return recompensa;
                }
            }).map(recompensa => {
                        return (
                            <RecompensaCard recompensa={recompensa} />
                        )
                    })}
            </div>
        </Container>
                    <BottomBarUsuario/>
        </div>
    )
}

export default ListadoRecompensasUser;