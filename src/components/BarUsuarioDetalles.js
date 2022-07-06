import React from "react";
import { Row, Stack } from "react-bootstrap";

function BarUsuarioDetalles(props) {

    return (
        <div>
            <Stack className="border" direction="horizontal" >
                <div><img width={150} src='https://upload.wikimedia.org/wikipedia/commons/c/cd/Portrait_Placeholder_Square.png'></img></div>
                <div className="vr" />
                <div className="m-5 mt-0 mb-0">
                    <Row><p>Nombre Apellidos</p></Row>
                    <Row className="mt-3"><p>email@gmail.com</p></Row>
                </div>

                <div className="m-5 mt-0 mb-0">
                    <Row ><p>Edad    </p></Row>
                    <Row className="mt-3"><p>Fecha nacimiento</p></Row>
                </div>

            </Stack>
        </div>
    )

}

export default BarUsuarioDetalles;