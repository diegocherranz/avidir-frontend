import React, { Component } from 'react'
import BottomBarCuidador from './BottomBarCuidador';
import BottomBarUsuario from './BottomBarUsuario';

class NotificacionesCuidador extends Component{
    render(){
        return(

            <div>
                 <BottomBarCuidador/>
            <p>Notificaciones</p>
           
            </div>
        )
    }
}

export default NotificacionesCuidador;