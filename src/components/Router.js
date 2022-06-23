import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import LoginPage from './LoginPage.js';
import Error from './Error';
import Registrarse from './Registrarse';
import { Container } from 'react-bootstrap';
import PrivateRouteC from '../routes/PrivateRouteC';
import PrivateRouteU from '../routes/PrivateRouteU';
import Actividades from './Actividades';
import Home from './Home';
import ListadoUsuarios from './ListadoUsuarios';
import NotificacionesCuidador from './NotificacionesCuidador';
import ProfileCuidador from './ProfileCuidador';
import NotificacionesUsuario from './NotificacionesUsuario';
import RetosUsuario from './Retos';
import ProfileUsuario from './ProfileUsuario';

class Router extends Component {
    render() {
        return (

            <BrowserRouter>
                <Header></Header>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/login' element={<LoginPage />} />
                    <Route exact path='/registro' element={<Registrarse />} />
                    <Route exact path='/home' element={<Home />} />
                    <Route path='/actividades' element={<PrivateRouteU />}>
                        <Route path='/actividades' element={<Actividades />} />
                    </Route>
                    <Route path='/notificaciones-usuario' element={<PrivateRouteU />}>
                        <Route path='/notificaciones-usuario' element={<NotificacionesUsuario />} />
                    </Route>
                    <Route path='/retos-usuario' element={<PrivateRouteU />}>
                        <Route path='/retos-usuario' element={<RetosUsuario />} />
                    </Route>
                    <Route path='/profile-usuario' element={<PrivateRouteU />}>
                        <Route path='/profile-usuario' element={<ProfileUsuario/>} />
                    </Route>
                    <Route path='/usuarios' element={<PrivateRouteC />}>
                        <Route path='/usuarios' element={<ListadoUsuarios />} />
                    </Route>
                    <Route path='/notificaciones' element={<PrivateRouteC />}>
                        <Route path='/notificaciones' element={<NotificacionesCuidador />} />
                    </Route>
                    <Route path='/profile' element={<PrivateRouteC />}>
                        <Route path='/profile' element={<ProfileCuidador />} />
                    </Route>
                    {/*<Route exact path='/actividades' component={Actividades}/>*/}
                    <Route path='*' element={<Error />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router;