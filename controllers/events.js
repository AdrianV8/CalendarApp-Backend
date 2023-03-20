const { response } = require("express");

//! Obtener eventos
const getEventos = async( req, res = response ) => {
    return res.status(200).json({
        ok: true,
        msg: 'getEvent'
    })
}

//! Crar eventos
const crearEvento = async( req, res = response ) => {
    return res.status(200).json({
        ok: true,
        msg: 'crearEvento'
    })
}

//! Actualizar eventos
const actualizarEvento = async( req, res = response ) => {
    return res.status(200).json({
        ok: true,
        params: req.params,
        msg: 'actualiarEvento'
    })
}

//! Borrar eventos
const borrarEvento = async( req, res = response ) => {
    
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