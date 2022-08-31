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
import NuevoUsuario from './NuevoUsuario';
import PaginaUsuario from './PaginaUsuario';
import AnadirActividad from './AnadirActividad';
import ActividadDetalles from './ActividadDetalles';
import ActividadDetallesC from './ActividadDetallesC';
import ListadoRecompensasC from './ListadoRecompensasC';
import AnadirNuevaRecompensa from './AnadirNuevaRecompensa';
import DetallesRecompensa from './DetallesRecompensa';
import ListadoRecompensasUser from './ListadoRecompensasUser';
import ListadoRetosC from './ListadoRetosC';
import AnadirReto from './AnadirReto';

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
                    <Route path='/actividad/:id' element={<PrivateRouteU />}>
                        <Route path='/actividad/:id' element={<ActividadDetalles />} />
                    </Route>
                    <Route path='/notificaciones-usuario' element={<PrivateRouteU />}>
                        <Route path='/notificaciones-usuario' element={<NotificacionesCuidador />} />
                    </Route>
                    <Route path='/retos-usuario' element={<PrivateRouteU />}>
                        <Route path='/retos-usuario' element={<RetosUsuario />} />
                    </Route>
                    <Route path='/recompensas' element={<PrivateRouteU />}>
                        <Route path='/recompensas' element={<ListadoRecompensasUser />} />
                    </Route>
                    <Route path='/recompensa/:uuid_recompensa' element={<PrivateRouteU />}>
                        <Route path='/recompensa/:uuid_recompensa' element={<DetallesRecompensa />} />
                    </Route>
                    <Route path='/profile-usuario' element={<PrivateRouteU />}>
                        <Route path='/profile-usuario' element={<ProfileUsuario/>} />
                    </Route>
                    <Route path='/usuarios' element={<PrivateRouteC />}>
                        <Route path='/usuarios' element={<ListadoUsuarios />} />
                    </Route>
                    <Route path='/usuario/:id' element={<PrivateRouteC />}>
                        <Route path='/usuario/:id' element={<PaginaUsuario />} />
                    </Route>
                    <Route path='/usuario/:id/recompensas' element={<PrivateRouteC />}>
                        <Route path='/usuario/:id/recompensas' element={<ListadoRecompensasC />} />
                    </Route>
                    <Route path='/usuario/:id/retos' element={<PrivateRouteC />}>
                        <Route path='/usuario/:id/retos' element={<ListadoRetosC />} />
                    </Route>
                    <Route path='/usuario/:id/nuevo-reto' element={<PrivateRouteC />}>
                        <Route path='/usuario/:id/nuevo-reto' element={<AnadirReto />} />
                    </Route>
                    <Route path='/recompensac/:uuid_recompensa' element={<PrivateRouteC />}>
                        <Route path='/recompensac/:uuid_recompensa' element={<DetallesRecompensa />} />
                    </Route>
                    <Route path='/usuario/:id/nueva-recompensa' element={<PrivateRouteC />}>
                        <Route path='/usuario/:id/nueva-recompensa' element={<AnadirNuevaRecompensa />} />
                    </Route>
                    <Route path='/usuario/:id/:actid' element={<PrivateRouteC />}>
                        <Route path='/usuario/:id/:actid' element={<ActividadDetallesC />} />
                    </Route>
                    <Route path='/nueva-actividad' element={<PrivateRouteC />}>
                        <Route path='/nueva-actividad' element={<AnadirActividad/>} />
                    </Route>
                    <Route path='/nuevo-usuario' element={<PrivateRouteC />}>
                        <Route path='/nuevo-usuario' element={<NuevoUsuario />} />
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