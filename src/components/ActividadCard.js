import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { ChevronRight, Pencil, Trash } from "react-bootstrap-icons";

function ActividadCard(props){
    return (
        <Card className='m-3 mt-0 mb-0 p-3 pt-0 pb-0' key={props.actividad.uuid} >
            <Row className='align-items-baseline'>
                <Col xs={3} s={3}><p className=''>{props.actividad.titulo}</p></Col>
                <Col xs={3} s={3} className='d-none d-sm-block'><p>{props.actividad.hora}</p></Col>
                {/*Completada? */}
                <Col xs={1} md={{ span: 1, offset: 3 }}><Button variant='light'><ChevronRight /></Button></Col>
                <Col xs={1} s={1}><Button variant='light'><Pencil /></Button></Col>
                <Col xs={1} s={1}><Button variant='light'><Trash /></Button></Col>
            </Row>
        </Card>
    )
}

export default ActividadCard;