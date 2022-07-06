import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { ChevronRight, Pencil, Trash } from "react-bootstrap-icons";

function ActividadCard(props){
    return (
        <Card className='m-3 mt-0 mb-0 p-3 pt-0 pb-0' key={props.actividad.id} >
            <Row className='align-items-baseline'>
                <Col ><p className='pl-3'>{props.actividad.titulo}</p></Col>
                <Col className='d-none d-sm-block'><p>{props.actividad.hora}</p></Col>
                {/*Completada? */}
                <Col ><Button variant='light'><ChevronRight /></Button></Col>
                <Col ><Button variant='light'><Pencil /></Button></Col>
                <Col ><Button variant='light'><Trash /></Button></Col>
            </Row>
        </Card>
    )
}

export default ActividadCard;