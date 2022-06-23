import React, { Component } from 'react'
import { Button, Navbar, Form, FormControl } from 'react-bootstrap';
import BottomBarCuidador from './BottomBarCuidador';
import { Plus, Search } from 'react-bootstrap-icons';

class ListadoUsuarios extends Component {
    render() {
        return (

            <div>
                <BottomBarCuidador />

                    <Button href='/nuevo-usuario' className='m-3'><Plus /> Añadir usuario</Button>
                    <Form >
                        <FormControl
                            type="search"
                            className='me-2 justify-content-end'
                            placeholder="Buscar..."
                            aria-label="Buscar..."
                        />
                        <Button className='justify-content-end' variant="outline-success"><Search/></Button>
                    </Form>

                <p>Listado de usuarios</p>

            </div>
        )
    }
}

export default ListadoUsuarios;