import React from "react";
import { Row, Stack } from "react-bootstrap";
import moment from "moment";

const getEdad = (fecha) =>{
    let years = moment().diff(fecha, 'years',false);
    return years;
}

function BarUsuarioDetalles(props) {

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

            </Stack>
        </div>
    )

}

export default BarUsuarioDetalles;