import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";

function UsuarioCard(props){
    return (
        <Card className='m-3 mt-0 mb-0 p-3 pt-0 pb-0' key={props.user.email} >
            <Row className='align-items-baseline'>
                <Col><img width={50} src='https://upload.wikimedia.org/wikipedia/commons/c/cd/Portrait_Placeholder_Square.png'></img></Col>
                <Col ><p className='pl-3'>{props.user.nombre} {props.user.apellido}</p></Col>
                <Col className='d-none d-sm-block'><p>{props.user.email}</p></Col>
                <Col ><Button variant='light'><ChevronRight /></Button></Col>
            </Row>
        </Card>
    )
}

export default UsuarioCard;