import React, { Component } from 'react'
import { Button, Navbar, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import BottomBarCuidador from './BottomBarCuidador';
import { Plus, Search } from 'react-bootstrap-icons';

class ListadoUsuarios extends Component {
    render() {
        return (

            <div>
                <BottomBarCuidador />

                <Row className='m-3'>
                    <Col >
                        <Button  href='/nuevo-usuario' ><Plus /> Añadir usuario</Button>
                    </Col>
                    <Col>
                        <Form className='align-items-baseline'>
                            <Row>
                                <Col className='col-9'>
                                    <FormControl
                                        type="search"
                                        className='me-2'
                                        placeholder="Buscar..."
                                        aria-label="Buscar..."
                                    />
                                </Col>
                                <Col className='col-3'>
                                    <Button  variant="outline-success"><Search /></Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

                <h5 className='m-3'>Usuarios</h5>

            </div>
        )
    }
}

export default ListadoUsuarios;