const { response } = require("express");
const Evento = require('../models/evento-model')

//! Obtener eventos
const getEventos = async( req, res = response ) => {

    // Rescatar todos los eventos con sus propiedades
    const eventos = await Evento.find()
                                .populate('user','name email')

    console.log(eventos);
    return res.status(200).json({
        ok: true,
        eventos
    })
}

//! Crar eventos
const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error. Hable con el administrador.'
        })
    }
}

//! Actualizar eventos
const actualizarEvento = async( req, res = response ) => {

    //? Obtener el id del evento enviado por URL
    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {

        //? Verificar que el ID existe en la BD
        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: "El evento no existe."
            })
        };

        //? Evitar que otro usuario modifique un evento que no sea suyo
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: "No tiene permisos para editar este evento."
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        /**
         * Cuando se actualiza, por defecto devuelve el viejo documento para hacer comparaciones.
         * Para cambiar eso y retornar el último evento actualizado: {new: true}
         */
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} );

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error. Hable con el administrador."
        })
    }


}

//! Borrar eventos
const borrarEvento = async( req, res = response ) => {
    //? Obtener el id del evento enviado por URL
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        //? Verificar que el ID existe en la BD
        const evento = await Evento.findById( eventoId );

        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: "El evento no existe."
            })
        };

        //? Evitar que otro usuario modifique un evento que no sea suyo
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: "No tiene permisos para eliminar este evento."
            })
        }

        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true,
            msg: 'Evento eliminado.'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error. Hable con el administrador."
        })
    }



    return res.status(200).json({
        ok: true,
        params: req.params,
        msg: 'borrarEvento'
    })
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}