import React,{Fragment,useState} from 'react';
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {

    //creo el state:

    const[cita,actualizarCita]=useState({
        hijo:'',
        padre:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    //segundo state
    const [error,actualizarError]=useState(false);

    //funcion que se ejecuta cada vez eque el usuario escribe un input:
    const handlerChange=e=>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //extraigo los valores

    const {hijo,padre,fecha,hora,sintomas}=cita;

    //enviando formulario
    const submitCita=e=>{
        e.preventDefault();
        //validaciones:
        if(hijo.trim() === ''||padre.trim() === '' || fecha.trim()==='' || hora.trim()===''|| sintomas.trim()===''){
            actualizarError(true);
            return
        }
        //Eliminar el mensaje previo
            actualizarError(false);
        //asigno id
        cita.id=uuid();

        //creo la cita y la pongo en el state
        crearCita(cita);

        //reinicio el formulario
        actualizarCita({
        hijo:'',
        padre:'',
        fecha:'',
        hora:'',
        sintomas:''
        });
    }

    return ( 
        <Fragment>
            <h2>Crear cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>:null}
        <form
        onSubmit={submitCita}
        >
            <label>Nombre del niño</label>
            <input
            type="text"
            name="hijo"
            className="u-full-width"
            placeholder="Nombre del hijo"
            onChange={handlerChange}
            value={hijo}
            />

            <label>Nombre del Padre</label>
            <input
            type="text"
            name="padre"
            className="u-full-width"
            placeholder="Nombre del padre"
            onChange={handlerChange}
            value={padre}
            />

            <label>Fecha</label>
            <input
            type="date"
            name="fecha"
            className="u-full-width"
            onChange={handlerChange}
            value={fecha}
            />

            <label>Hora</label>
            <input
            type="time"
            name="hora"
            className="u-full-width"
            onChange={handlerChange}
            value={hora}
            />

            <label>Sintomas</label>
            <textarea
            className="u-full-width"
            name="sintomas"
            onChange={handlerChange}
            value={sintomas}
            ></textarea>

            <button
            type="submit"
            className="u-full-width button-primary"
            >Agregar Cita</button>

        </form>

        </Fragment>
     );
}

Formulario.propTypes={
    crearCita:PropTypes.func.isRequired
}
 
export default Formulario;