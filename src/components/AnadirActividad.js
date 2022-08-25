import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import AddDetallesActividad from "./AddDetallesActividad";
import AddNotificacionesActividad from "./AddNotificacionesActividad";
import BottomBarCuidador from "./BottomBarCuidador";

class AnadirActividad extends Component {
    /*  const [step, setStep] = useState(1);
      const [titulo, setTitulo] = useState('');
      const [descripcion, setDescripcion] = useState('');
      const [hora, setHora] = useState('');
      const [tiempo_completar, setTiempoCompletar] = useState('');
      const [repeticionSelected, setRepeticionSelected] = useState(null);
      const [tipoSelected, setTipoSelected] = useState(null);
      const [fechaUnaVez, setFechaUnaVez] = useState('');*/


    state = {
        step: 1,
        userid: '',
        titulo: '',
        descripcion: '',
        hora: '',
        tiempo_completar: 0,
        repeticionSelected: '',
        tipoSelected: '',
        fechaUnaVez: '',
        repeticionSemana: [],
        notifUserInicio: false,
        notifUserTerminar: false,
        notifUserTerminarTiempo: 0,
        notifUserNoTerminar: false,
        notifCCompletar: false,
        notifCNoCompletar: false,
        notifCNoCompletarTiempo: 0,
        cuidadores: []
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 })
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 })
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
        if(e.target.value == undefined){
            this.setState({ [input]: e.target.innerHTML });
        }
    }

    handleChangeCheckbox = input => e => {
        this.setState({ [input]: e.target.checked });
    }

    handleChangeValue = (input, value) => {
        this.setState({ [input]: value });
    }

    render() {
        const {step} = this.state;
        const { userid, titulo, descripcion, hora, tiempo_completar, repeticionSelected, tipoSelected, fechaUnaVez, repeticionSemana,
        notifUserInicio, notifUserTerminar, notifUserTerminarTiempo, notifUserNoTerminar, notifCCompletar, notifCNoCompletar, notifCNoCompletarTiempo, cuidadores} = this.state;
        const values = {userid, titulo, descripcion, hora, tiempo_completar, repeticionSelected, tipoSelected, fechaUnaVez, repeticionSemana,
            notifUserInicio, notifUserTerminar, notifUserTerminarTiempo, notifUserNoTerminar, notifCCompletar, notifCNoCompletar, notifCNoCompletarTiempo, cuidadores}
        switch (step) {
            case 1:
                return (
                    <AddDetallesActividad nextStep={this.nextStep} values={values} handleChange={this.handleChange} handleChangeValue={this.handleChangeValue}/>
                )
            case 2:
                return (
                    <AddNotificacionesActividad prevStep={this.prevStep} values={values} handleChange={this.handleChange} handleChangeCheckbox={this.handleChangeCheckbox}/>
                )
            default:
        }


    }
}

export default AnadirActividad;