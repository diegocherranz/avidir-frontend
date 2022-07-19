import React, { useState } from "react";
import { Button, Col, Collapse, Container, Dropdown, Form, Row, Stack } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import BottomBarCuidador from "./BottomBarCuidador";
import '../styles/custom.css'

const tipo_actividad = ["Tareas del hogar", "Actividad física", "Medicación", "Ocio", "Salud", "Otro"];
const dias_semana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const dias_semana_ids = ['dia-L', 'dia-M', 'dia-X', 'dia-J', 'dia-V', 'dia-S', 'dia-D'];


function AddDetallesActividad({nextStep, values, handleChange, handleChangeValue}) {
    /*const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [hora, setHora] = useState('');
    const [tiempo_completar, setTiempoCompletar] = useState('');
    const [repeticionSelected, setRepeticionSelected] = useState(null);
    const [tipoSelected, setTipoSelected] = useState(null);
    const [fechaUnaVez, setFechaUnaVez] = useState('');*/
    const [message, setMessage] = useState('');

    const submitHandler = (event) => { }

    

    const GetSemanaArray = () => {
        let array_week = [];
        dias_semana_ids.forEach(dia => {
            if(document.getElementById(dia).checked) array_week.push(dia.replace("dia-",""))
        });

        handleChangeValue('repeticionSemana', array_week);
    }
    
    const CheckboxSemana = () => {
        return (
            <Stack className="weekDays-selector" direction="horizontal">
                {dias_semana.map((dia) => {
                    return (<div key={dia}>
    
                        <input type="checkbox" id={"dia-" + dia} className='weekday' />
                        <label htmlFor={"dia-" + dia}>{dia}</label>
    
                    </div>)
                })}
            </Stack>
        )
    }

    const Continue = e => {
        
        e.preventDefault();
        if(values.repeticionSelected === 'Semanalmente') GetSemanaArray();
        nextStep();
    }

    return (
        <div>
            <BottomBarCuidador/>
            <Container className="mt-3">
                <h4>Nueva actividad para props.nombre props.apellido</h4>
                <Form className="mt-5 mr-5 ml-5" onSubmit={submitHandler} >
                    <Form.Group as={Row} className="mb-3 mt-5" controlId="formTitulo">
                        <Form.Label column xs={2} sm={2}>Titulo</Form.Label>
                        <Col xs={10} sm={10}>
                            <Form.Control value={values.titulo} onChange={handleChange('titulo')} type="text" placeholder="Titulo" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formDescripcion">
                        <Form.Label column xs={2} sm={2}>Descripción</Form.Label>
                        <Col xs={10} sm={10}>
                            <Form.Control value={values.descripcion} onChange={handleChange('descripcion')} type="text" placeholder="Descripcion" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHora">
                        <Form.Label column xs={2} sm={2}>Hora</Form.Label>
                        <Col xs={3} sm={3}>
                            <Form.Control value={values.hora} onChange={handleChange('hora')} type="time" placeholder="Hora" />
                        </Col>
                        <Col className="m-3 mt-0 mb-0" style={{ textAlign: "right" }} >
                            <Form.Label column xs={2} sm={2}>Tiempo</Form.Label>
                        </Col>
                        <Col xs={3} sm={3}>
                            <Form.Control value={values.tiempo_completar} onChange={handleChange('tiempo_completar')} type="number" placeholder="Tiempo para completar" />
                        </Col>
                        <Col>
                            <Form.Label column xs={2} sm={2}>minutos</Form.Label>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formRepeticion">
                        <Form.Label column xs={2} sm={2}>Repetición</Form.Label>
                        <Col xs={3} sm={3}>
                            <Dropdown>
                                <Dropdown.Toggle variant="light">
                                    {values.repeticionSelected ? values.repeticionSelected : "Seleccionar"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={(handleChange('repeticionSelected'))}>
                                        Una sola vez
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleChange('repeticionSelected')}>
                                        Diariamente
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleChange('repeticionSelected')}>
                                        Semanalmente
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleChange('repeticionSelected')}>
                                        Mensualmente
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        {values.repeticionSelected === 'Semanalmente' &&
                            <Col>
                                <CheckboxSemana />
                            </Col>
                        }
                        {values.repeticionSelected === 'Una sola vez' &&
                            <Col xs={3} sm={3}>
                                <Form.Control value={values.fechaUnaVez} onChange={handleChange('fechaUnaVez')} type="date" placeholder='Fecha' />
                            </Col>
                        }

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formTipo">
                        <Form.Label column xs={2} sm={2}>Tipo</Form.Label>
                        <Col xs={3} sm={3}>
                            <Dropdown>
                                <Dropdown.Toggle variant="light">
                                    {values.tipoSelected ? values.tipoSelected : "Seleccionar"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        tipo_actividad.map((item) => (
                                            <Dropdown.Item key={item} onClick={handleChange('tipoSelected')}>
                                                {item}
                                            </Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Form.Group>



                    <Form.Group style={{ textAlign: "center" }} as={Row} className="mt-4">
                        {message === '' && <p style={{ textAlign: "center" }}></p>}
                        {message && <p style={{ textAlign: "center" }}>{message}</p>}
                        <Col>

                            <Button onClick={Continue} variant="primary" >
                                Siguiente
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}

export default AddDetallesActividad;